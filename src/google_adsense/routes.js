const apiPath = process.env.VUE_APP_API_HOSTNAME + (process.env.VUE_APP_GOOGLE_ADSENSE_API_BASE_PATH || "")
const basePath = apiPath + "/google-adsense"

export default {
  AUTHORIZE: (scope) => basePath + `/authorize/${scope}`,

  ACCOUNTS: basePath + "/account",
  ACCOUNT: (id) => basePath + `/account/${id}`,

  PANEL_OPTION_CHILDREN: (accId) => `${basePath}/panel-options?account_id=${accId}`,
  PANEL_OPTIONS: basePath + "/panel-options"
}