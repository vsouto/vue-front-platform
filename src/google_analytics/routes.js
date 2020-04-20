const basePath = "/google-analytics"
const absoluteBasePath = process.env.VUE_APP_API_HOSTNAME + basePath

// TODO: remove token / refresh_token
export default {
  AUTHORIZE: absoluteBasePath + "/authorize",
  PROFILES: `${basePath}/load_credentials`,
  PROFILE: (id) => `${basePath}/delete_credential/${id}`,
  ACCOUNTS: (token, refresh_token) => `${basePath}/load_accounts?token=${token}&refresh_token=${refresh_token}`,
  WEB_PROPERTIES: (id, token, refresh_token) => `${basePath}/load_webproperties/${id}?token=${token}&refresh_token=${refresh_token}`,
  VIEWS: (id, property_id, token, refresh_token) => `${basePath}/load_views/${id}/${property_id}?token=${token}&refresh_token=${refresh_token}`,
  REPORT: (view_id) => `${basePath}/report/${view_id}`,
  ACTIVE_VIEWS: `${basePath}/view`,
  ACTIVE_VIEW: (view_id) => `${basePath}/view/${view_id}`,
}