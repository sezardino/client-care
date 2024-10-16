import { jwtVerify } from "@/libs/jwt";
import { prisma } from "@/libs/prisma";
import { JWTWidgetPayload } from "@/types/jwt";
import { body } from "framer-motion/client";
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

export const GET = async (req: NextRequest) => {
  const authTokenWithBearer = req.headers.get("Authorization") || "";

  try {
    const { organizationId, projectId, widgetId } =
      handleToken(authTokenWithBearer);

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

  console.log(body);

  return NextResponse.json({ success: true, body }, { status: 201 });
};
