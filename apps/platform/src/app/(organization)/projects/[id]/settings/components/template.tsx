"use client";

import { useCurrentUserQuery } from "@/app/hooks/current-user";
import { ImageForm } from "@/components/form/image";
import { ProjectForm } from "@/components/form/project";
import { AlertModal } from "@/components/ui/alert-modal";
import {
  EditionDifferenceModal,
  editionDifferenceModalStringDifferenceRenderFunction,
} from "@/components/ui/edition-difference-modal";
import { Typography } from "@/components/ui/typography";
import { ProfileDto } from "@/dto/profile";
import { getChangedFields } from "@/utils/get-changed-fields";
import { useCallback, useState } from "react";

export const ProjectSettingsTemplate = () => {
  const [isDeleteInitialAvatarModalOpen, setIsDeleteInitialAvatarModalOpen] =
    useState(false);
  const [changedProfileData, setChangedProfileData] =
    useState<Partial<ProfileDto> | null>(null);

  const { data: currentUserData } = useCurrentUserQuery();

  const deleteCurrentImageHandler = useCallback(async () => {
    try {
      // await deleteProfileAvatar(undefined);

      setIsDeleteInitialAvatarModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

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
      // await updateProfileData(changedProfileData);
      setChangedProfileData(null);
    } catch (error) {
      console.log(error);
    }
  }, [changedProfileData]);

  if (!currentUserData) return null;

  return (
    <>
      <section className="grid gap-5">
        <Typography level="h1" styling="h3" weight="medium" className="sr-only">
          Change project data
        </Typography>
        <ImageForm
          key={currentUserData.avatarUrl || ""}
          imagePlaceholderType="folder"
          initialImageUrl={currentUserData?.avatarUrl || undefined}
          onTryToDeleteImage={() => setIsDeleteInitialAvatarModalOpen(true)}
          onFormSubmit={async () => undefined}
        />
        <ProjectForm
          key={`${currentUserData.firstName}-${currentUserData.lastName}-${currentUserData.position}`}
          initialValues={{}}
          className="max-w-2xl"
          onFormSubmit={() => undefined}
        />
      </section>

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
