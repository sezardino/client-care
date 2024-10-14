import { checkUserInvite } from "@/app/auth/actions/check-invition";
import { USER_INVITE_SEARCH_PARAMETER } from "@/const/search-params";
import { ProjectUrls } from "@/const/url";
import { prisma } from "@/libs/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { userId } = auth();
  const inviteId = req.nextUrl.searchParams.get(USER_INVITE_SEARCH_PARAMETER);

  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const clerkUser = await currentUser();
  if (!clerkUser) return redirect(ProjectUrls.registration);

  if (!inviteId) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: clerkUser.id },
        select: { id: true, organizationId: true },
      });

      if (!user) {
        await prisma.user.create({
          data: {
            id: clerkUser.id,
            email: clerkUser.emailAddresses[0].emailAddress,
          },
        });

        return NextResponse.redirect(
          new URL(ProjectUrls.newOrganization, req.url)
        );
      }

      if (!user.organizationId)
        return NextResponse.redirect(
          new URL(ProjectUrls.newOrganization, req.url)
        );
    } catch (error) {
      console.log(error);
      return NextResponse.redirect(new URL(ProjectUrls.registration, req.url));
    }
  }

  if (inviteId) {
    const checkInvitingResponse = await checkUserInvite(inviteId);

    if ("message" in checkInvitingResponse)
      return NextResponse.json(checkInvitingResponse, { status: 400 });

    const user = await prisma.user.findFirst({
      where: { inviteId },
      select: { id: true },
    });

    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    await prisma.user.update({
      where: { id: user.id },
      data: { id: clerkUser.id },
    });
  }

  return redirect(ProjectUrls.home);
}
