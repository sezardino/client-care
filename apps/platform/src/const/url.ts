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
  projectSubmissions: (id: string) =>
    `/organization/projects/${id}/submissions`,
  projectTasks: (id: string) => `/organization/projects/${id}/tasks`,
  projectWidgets: (id: string) => `/organization/projects/${id}/widgets`,
  projectSettings: (id: string) => `/organization/projects/${id}/settings`,

  userSettings: "/settings",
};

export const ProjectRoutesUrls = {
  auth: "/api/auth",
};
