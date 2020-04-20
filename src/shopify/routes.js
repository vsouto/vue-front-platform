const basePath = "/shopify"
const absoluteBasePath = process.env.VUE_APP_API_HOSTNAME + basePath

export default {
  AUTHORIZE: absoluteBasePath + "/authorize",
  ACCOUNTS: `${basePath}/account`,
  ACCOUNT: (id) => `${basePath}/account/${id}`,
  PRODUCTS: (id) => `${basePath}/account/${id}/product`,
  ORDERS: (id) => `${basePath}/account/${id}/orders`
}