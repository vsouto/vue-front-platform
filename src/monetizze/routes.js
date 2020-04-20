const apiPath = process.env.VUE_APP_API_HOSTNAME + (process.env.VUE_APP_MONETIZZE_API_BASE_PATH || "")
const basePath = apiPath + "/monetizze"

export default {
  ACCOUNTS: basePath + "/account",
  ACCOUNT: (id) => basePath + `/account/${id}`,
  ACCOUNT_PRODUCTS: (id) => basePath + `/account/${id}/product`,
  ACCOUNT_OWNER_PRODUCTS: (id) => basePath + `/account/${id}/product?only_owner=1`,
  PANEL_OPTION_CHILDREN: (accId) => `${basePath}/panel-options?account_id=${accId}`,
  PANEL_OPTIONS: basePath + "/panel-options",
  PAY: (key, ref) => basePath + `/process-payment/${key}/${ref}`
}