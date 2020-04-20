const apiPath = process.env.VUE_APP_API_HOSTNAME + (process.env.VUE_APP_GOOGLE_ADS_API_BASE_PATH || "")
const basePath = apiPath + "/google-ads"
const remotePath = basePath + "/remote"

export default {
  AUTHORIZE: (scope) => basePath + `/authorize/${scope}`,

  PROFILES: `${basePath}/profile`,
  PROFILE: (id) => `${basePath}/profile/${id}`,

  ACCOUNTS: basePath + "/account",
  ACCOUNT: (id) => basePath + `/account/${id}`,
  ADD_ACCOUNTS: (profileId, customerId) => `${basePath}/account/?credential_id=${profileId}&customer_id=${customerId}`,

  PANEL_OPTION_CHILDREN: (accId) => `${basePath}/panel-options?account_id=${accId}`,
  PANEL_OPTIONS: basePath + "/panel-options",

  // Remote
  REMOTE_PROFILE_CUSTOMERS: (id) => remotePath + `/profile/${id}/customer`,
  REMOTE_PROFILE_CUSTOMER_ACCOUNTS: (id, customerId) => remotePath + `/profile/${id}/customer/${customerId}`,
}