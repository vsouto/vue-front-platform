const apiPath = process.env.VUE_APP_API_HOSTNAME
const basePath = apiPath + (process.env.VUE_APP_API_BASE_PATH || "")

// Account
const userBasePath = apiPath + (process.env.VUE_APP_USER_API_BASE_PATH || "") + "/user"
const user = userBasePath
const assets = user + "/asset"
export const ACCOUNT = {
  USER: user,
  ASSETS: assets
}

// Limited User
const limitedUser = basePath + "/limited-user"
export const LIMITED_USER = {
  USERS: limitedUser,
  USER: (id) => `${limitedUser}/${id}`
}

// Panel
const panelBasePath = apiPath + (process.env.VUE_APP_PANEL_API_BASE_PATH || "") + "/panel"
export const PANEL = {
  PANELS: panelBasePath,
  PANEL: (id) => `${panelBasePath}/${id}`,
  STATS: (id, queryString) => `${panelBasePath}/${id}/stats?${queryString}`,
  WIDGET_STATS: (id, widgetId, queryString) => `${panelBasePath}/${id}/widget/${widgetId}/stats?${queryString}`
}
