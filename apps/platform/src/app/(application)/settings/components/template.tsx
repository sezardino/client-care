"use client";

import { useCurrentUserQuery } from "@/app/hooks/current-user";
import { ImageForm } from "@/components/form/image";
import { ProfileForm } from "@/components/form/profile";
import { AlertModal } from "@/components/ui/alert-modal";
import {
  EditionDifferenceModal,
  editionDifferenceModalStringDifferenceRenderFunction,
} from "@/components/ui/edition-difference-modal";
import { Typography } from "@/components/ui/typography";
import { ProfileDto } from "@/dto/profile";
import { getChangedFields } from "@/utils/get-changed-fields";
import { useCallback, useState } from "react";
import { useDeleteProfileAvatarMutation } from "../hooks/delete-profile-avatar";
import { useSetProfileAvatarMutation } from "../hooks/set-profile-avatar";
import { useUpdateProfileDataMutation } from "../hooks/update-profile-data";

export const UserProfileSettingsTemplate = () => {
  const [isDeleteInitialAvatarModalOpen, setIsDeleteInitialAvatarModalOpen] =
    useState(false);
  const [changedProfileData, setChangedProfileData] =
    useState<Partial<ProfileDto> | null>(null);

  const { data: currentUserData } = useCurrentUserQuery();

  const { mutateAsync: setProfileAvatar } = useSetProfileAvatarMutation();
  const { mutateAsync: deleteProfileAvatar } = useDeleteProfileAvatarMutation();
  const { mutateAsync: updateProfileData } = useUpdateProfileDataMutation();

  const deleteCurrentImageHandler = useCallback(async () => {
    try {
      await deleteProfileAvatar(undefined);

      setIsDeleteInitialAvatarModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  }, [deleteProfileAvatar]);

  const submitProfileData = useCallback(
    (values: ProfileDto) => {
      if (!currentUserData) return;

      const { firstName, lastName, position } = currentUserData;

      const changedFields = getChangedFields(
        { firstName, lastName, position },
        values
      );

      if (Object.keys(changedFields).length === 0) return;

      setChangedProfileData(changedFields);
    },
    [currentUserData]
  );

  const updateProfileDataHandler = useCallback(async () => {
    if (!changedProfileData) return;

    try {
      await updateProfileData(changedProfileData);
      setChangedProfileData(null);
    } catch (error) {
      console.log(error);
    }
  }, [changedProfileData, updateProfileData]);

  if (!currentUserData) return null;

  return (
    <>
      <div className="p-2 md:p-4">
        <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
          <Typography level="h2" styling="h3" weight="medium">
            User Profile
          </Typography>

          <div className="grid max-w-2xl gap-5 mx-auto mt-4">
            <ImageForm
              key={currentUserData.avatarUrl || ""}
              initialImageUrl={currentUserData?.avatarUrl || undefined}
              onTryToDeleteImage={() => setIsDeleteInitialAvatarModalOpen(true)}
              onFormSubmit={setProfileAvatar}
            />
            <ProfileForm
              key={`${currentUserData.firstName}-${currentUserData.lastName}-${currentUserData.position}`}
              initialValues={{
                firstName: currentUserData.firstName,
                lastName: currentUserData.lastName,
                position: currentUserData.position,
              }}
              onFormSubmit={submitProfileData}
            />
          </div>
        </div>
      </div>

      <AlertModal
        isOpen={isDeleteInitialAvatarModalOpen}
        title="Are you sure?"
        description="This operation can be restored"
        cancel="Cancel"
        confirm="Delete avatar"
        onClose={() => setIsDeleteInitialAvatarModalOpen(false)}
        onConfirm={deleteCurrentImageHandler}
      />

      {changedProfileData && (
        <EditionDifferenceModal
          isOpen={!!changedProfileData}
          onClose={() => setChangedProfileData(null)}
          onConfirm={updateProfileDataHandler}
          title="Edition difference"
          description="confirm changes"
          cancel="Cancel"
          confirm="Confirm changes"
          original={{
            firstName: currentUserData.firstName,
            lastName: currentUserData.lastName,
            position: currentUserData.position,
          }}
          updated={changedProfileData!}
          copy={{
            firstName: "First name",
            lastName: "Last name",
            position: "Position",
          }}
          render={{
            firstName: (o, u) =>
              editionDifferenceModalStringDifferenceRenderFunction(
                o.firstName,
                u.firstName
              ),
            lastName: (o, u) =>
              editionDifferenceModalStringDifferenceRenderFunction(
                o.lastName,
                u.lastName
              ),
            position: (o, u) =>
              editionDifferenceModalStringDifferenceRenderFunction(
                o.position,
                u.position
              ),
          }}
        />
      )}
    </>
  );
};
