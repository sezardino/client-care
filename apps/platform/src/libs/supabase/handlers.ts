import { uploadFileToStorage } from "./storage";

export const uploadUserAvatarToStorage = async (avatar: File, userId: string) =>
  uploadFileToStorage(avatar, `users/${userId}/avatar`);

export const uploadOrganizationLogoToStorage = async (
  logo: File,
  organizationId: string
) => uploadFileToStorage(logo, `organization/${organizationId}/logo`);

export const uploadProjectLogoToStorage = async (
  logo: File,
  organizationId: string,
  projectId: string
) =>
  uploadFileToStorage(
    logo,
    `organization/${organizationId}/projects/${projectId}`
  );
