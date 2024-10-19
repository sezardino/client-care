import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
import { verifyAuthToken } from "../../helpers/auth-token";

export const GET = async (req: NextRequest) => {
  const authTokenWithBearer = req.headers.get("Authorization") || "";

  try {
    const { organizationId, projectId, widgetId } =
      verifyAuthToken(authTokenWithBearer);

    const widget = await prisma.widget.findUnique({
      where: { id: widgetId, organizationId, projectId, deletedAt: null },
      select: { id: true, isActive: true },
    });

    if (!widget)
      return NextResponse.json({ error: "Widget not found" }, { status: 404 });

    return NextResponse.json({ enabled: widget.isActive }, { status: 200 });
  } catch (error) {
    if (typeof error === "string")
      return NextResponse.json({ error }, { status: 403 });

    return NextResponse.json(
      { error: "Something went wrong when try to check widget status" },
      { status: 403 }
    );
  }
};

export const OPTIONS = async () => {
  return new NextResponse("", {
    status: 200,
  });
};
