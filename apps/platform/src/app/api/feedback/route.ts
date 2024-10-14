import { FeedbackWidgetDtoSchema } from "@/dto/feedback";
import { jwtVerify } from "@/libs/jwt";
import { prisma } from "@/libs/prisma";
import { JWTWidgetPayload } from "@/types/jwt";
import { zodValidateAndFormatErrors } from "@/utils/zod";
import { JsonWebTokenError } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const handleToken = (token: string) => {
  if (!token || !token.includes("Bearer")) throw new Error("No token provided");

  const tokenWithoutBearer = token.split(" ")[1];

  try {
    const verifiedToken = jwtVerify(tokenWithoutBearer);

    if (!verifiedToken) throw new Error("Verification failed");

    return verifiedToken as JWTWidgetPayload;
  } catch (error) {
    if (error instanceof JsonWebTokenError) throw new Error(error.message);

    if (typeof error === "string") throw new Error(error);

    throw new Error("Something went wrong when try to extract token");
  }
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const authTokenWithBearer = req.headers.get("Authorization") || "";

  const validationResponse = zodValidateAndFormatErrors(
    FeedbackWidgetDtoSchema,
    body
  );

  if (!validationResponse.success)
    return NextResponse.json(validationResponse, { status: 400 });

  try {
    const { organizationId, projectId } = handleToken(authTokenWithBearer);

    const project = await prisma.project.findUnique({
      where: { id: projectId, organizationId: organizationId },
    });

    if (!project)
      return NextResponse.json({ error: "Project not found" }, { status: 404 });

    // save data

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    if (typeof error === "string")
      return NextResponse.json({ error }, { status: 403 });

    return NextResponse.json(
      { error: "Something went wrong when try to send feedback" },
      { status: 403 }
    );
  }

  console.log(body);

  return NextResponse.json({ success: true, body }, { status: 201 });
}
