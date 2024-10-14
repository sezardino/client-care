export const ProjectUrls = {
  home: "/",
  roadMap: "/road-map",

  // auth
  login: "/auth/login",
  registration: "/auth/registration",
  forgotPassword: "/auth/forgot-password",
  newOrganization: "/auth/new-organization",

  // organization
  dashboard: "/organization",
  users: "/organization/users",
  projects: "/organization/projects",
  settings: "/organization/settings",

  project: (id: string) => `/organization/projects/${id}`,

  userSettings: "/settings",
};

export const ProjectRoutesUrls = {
  auth: "/api/auth",
};
