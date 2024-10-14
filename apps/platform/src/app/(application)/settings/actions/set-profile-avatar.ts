"use server";

import { ProjectUrls } from "@/const/url";
import { ImageDtoSchema } from "@/dto/image";
import { prisma } from "@/libs/prisma";
import { uploadUserAvatarToStorage } from "@/libs/supabase/handlers";
import {
  deleteFileFromStorage,
  getFilePublicPath,
} from "@/libs/supabase/storage";
import { ServerActionResponse, SuccessResponse } from "@/types/base";
import { zodValidateAndFormatErrors } from "@/utils/zod";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const setProfileAvatar = async (
  formData: FormData
): Promise<ServerActionResponse<SuccessResponse>> => {
  const { userId } = auth();
  if (!userId) return { message: "Unauthorized" };

  try {
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      include: { avatar: true },
    });

    if (!currentUser) return { message: "No user found" };

    const validationResponse = zodValidateAndFormatErrors(ImageDtoSchema, {
      image: formData.get("image"),
    });

    if (!validationResponse.success) {
      return { message: "Validation error", errors: validationResponse.errors };
    }

    const { data } = validationResponse;
    const image = data.image as File;

    const uploadResponse = await uploadUserAvatarToStorage(
      image,
      `${currentUser.id}`
    );

    if (!uploadResponse || uploadResponse.error)
      return {
        message: "Something went wrong wen try to upload a new avatar image",
      };

    try {
      await prisma?.user.update({
        where: { id: userId },
        data: {
          avatar: {
            create: {
              ...uploadResponse.data,
              publicPath: getFilePublicPath(uploadResponse.data.path),
            },
          },
        },
      });

      if (currentUser.avatar) {
        await cleanUpAfterUpdateAvatar(currentUser.avatar.id);
      }
    } catch (error) {
      console.log(error);

      try {
        const response = await deleteFileFromStorage(uploadResponse.data.path);
        if (response.error)
          console.log({
            message:
              "Something whent wrong when try to delete new avatar after error",
            error: response.error,
          });
      } catch (error) {
        console.log({
          message:
            "Something when't wrong when try to delete new avatar after error",
          error,
        });
      }

      return { message: "Fail to update used avatar" };
    }

    revalidatePath(ProjectUrls.userSettings);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { message: "There were error when try to change user avatar" };
  }
};

const cleanUpAfterUpdateAvatar = async (fileId: string) => {
  try {
    const neededFile = await prisma.file.findUnique({
      where: { id: fileId },
    });

    if (!neededFile) return { message: "No file found" };

    const response = await deleteFileFromStorage(neededFile.path);

    if (response.error)
      return { message: "Something went wrong when try to cleanup old avatar" };

    await prisma.file.delete({
      where: { id: fileId },
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    return {
      message: "Something went wrong when try to delete old avatar",
    };
  }
};
