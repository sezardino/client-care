import { prisma } from "@/libs/prisma";
import { SubmissionStatus } from "@prisma/client";
import dayjs from "dayjs";
import type { NextRequest } from "next/server";

const handleSubmissions = async () => {
  const { count: deletedCount } = await prisma.submission.deleteMany({
    where: {
      status: SubmissionStatus.DECLINED,
      OR: [
        { declinedAt: { lt: dayjs().subtract(7, "days").toDate() } },
        { declinedAt: null },
      ],
    },
  });

  if (deletedCount > 0) console.log(`${deletedCount} submission(s) deleted.`);
  else console.log("No submissions deleted today.");
};

export const GET = async (request: NextRequest) => {
  const today = dayjs().startOf("day").toDate();

  console.log(`Client-care cron job handle: ${today}`);

  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  try {
    await handleSubmissions();
  } catch (error) {
    console.error("Error when try to delete declined submissions:", error);
  }

  console.log({ success: true });
  console.log(`Client-care cron finished`);
  return Response.json({ success: true });
};
