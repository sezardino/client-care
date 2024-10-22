import { prisma } from "@/libs/prisma";
import { FeedbackWidgetDtoSchema } from "@/schemas/dto/feedback";
import { zodValidateAndFormatErrors } from "@/utils/zod";
import { NextRequest, NextResponse } from "next/server";
import { verifyAuthToken } from "../../helpers/auth-token";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const authTokenWithBearer = req.headers.get("Authorization") || "";

  const validationResponse = zodValidateAndFormatErrors(
    FeedbackWidgetDtoSchema,
    body
  );

  if (!validationResponse.success)
    return NextResponse.json(validationResponse, { status: 400 });

  const { email, message, fullName, rating } = validationResponse.data;

  try {
    const { organizationId, projectId, widgetId } =
      verifyAuthToken(authTokenWithBearer);

    const neededWidget = await prisma.widget.findUnique({
      where: {
        id: widgetId,
        organizationId: organizationId,
        projectId: projectId,
      },
    });

    if (!neededWidget)
      return NextResponse.json(
        { message: "Widget not found" },
        { status: 404 }
      );

    await prisma.submission.create({
      data: {
        fullName,
        email,
        widget: { connect: { id: widgetId } },
        organization: { connect: { id: organizationId } },
        project: { connect: { id: projectId } },
        feedback: { create: { message, rating } },
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    if (typeof error === "string")
      return NextResponse.json({ error }, { status: 403 });
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong when try to send feedback" },
      { status: 403 }
    );
  }
}

export const OPTIONS = async () => {
  return new NextResponse("", {
    status: 200,
  });
};
