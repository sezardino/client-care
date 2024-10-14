"use server";

import { ProjectUrls } from "@/const/url";
import { prisma } from "@/libs/prisma";
import { deleteFileFromStorage } from "@/libs/supabase/storage";
import { ServerActionResponse, SuccessResponse } from "@/types/base";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const deleteProfileUserAvatar = async (): Promise<
  ServerActionResponse<SuccessResponse>
> => {
  const { userId } = auth();
  if (!userId) return { message: "Unauthorized" };

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { avatar: true },
    });

    if (!user) return { message: "User not found" };
    if (!user.avatar)
      return { message: "This user does't have avatar to delete" };

    const response = await deleteFileFromStorage(user.avatar.path);

    if (response.error)
      return {
        message: "Something went wrong when try to delete image from supabase",
      };

    await prisma.file.delete({ where: { id: user.avatar.id } });
    revalidatePath(ProjectUrls.userSettings);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong when try to delete avatar" };
  }
};
