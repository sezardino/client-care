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
  // users: "/users",
  projects: "/projects",
  settings: "/organization/settings",

  project: (id: string) => `/projects/${id}`,
  projectSubmissions: (id: string) => `/projects/${id}/submissions`,
  projectTasks: (id: string) => `/projects/${id}/tasks`,
  projectWidgets: (id: string) => `/projects/${id}/widgets`,
  projectSettings: (id: string) => `/projects/${id}/settings`,
  projectSettingsSecurity: (id: string) => `/projects/${id}/settings/security`,

  userSettings: "/settings",
};

export const ProjectRoutesUrls = {};
