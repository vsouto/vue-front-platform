const apiPath = process.env.VUE_APP_API_HOSTNAME + (process.env.VUE_APP_HOTMART_API_BASE_PATH || "")
const basePath = apiPath + "/hotmart"

export default {
  AUTHORIZE: basePath + "/authorize",

  ACCOUNTS: basePath + "/account",
  ACCOUNT: (id) => basePath + `/account/${id}`,

  AFFILIATIONS: (id) => basePath + `/affiliations/${id}`,
  AFFILIATION: (id, affiliation_id) => basePath + `/affiliations/${id}/${affiliation_id}`,

  SUBSCRIPTIONS: (id) => basePath + `/subscriber/${id}`,
  SUBSCRIPTION: (id, subscription_id) => basePath + `/subscriber/${id}/${subscription_id}`,
  PANEL_OPTION_CHILDREN: (accId) => `${basePath}/panel-options?account_id=${accId}`,
  PANEL_OPTIONS: basePath + "/panel-options",
}
