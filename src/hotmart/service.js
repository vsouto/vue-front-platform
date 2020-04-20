import http from "@/api"
import HOTMART from "@/hotmart/routes"

export default {
  getAccounts() {
    return http.get(HOTMART.ACCOUNTS)
  },
  authorizeAccount() {
    return http.get(HOTMART.AUTHORIZE)
  },
  postAccount(account) {
    return http.post(HOTMART.ACCOUNTS, account)
  },
  getAccount(id) {
    return http.get(HOTMART.ACCOUNT(id))
  },
  updateAccount(account) {
    return http.patch(HOTMART.ACCOUNT(account.id), account)
  },
  deleteAccount(id) {
    return http.delete(HOTMART.ACCOUNT(id))
  },
  getAffiliations(id) {
    return http.get(HOTMART.AFFILIATIONS(id))
  },
  getAffiliation(id, affiliation_id) {
    return http.get(HOTMART.AFFILIATION(id, affiliation_id))
  },
  getProducts(id) {
    return http.get(HOTMART.PRODUCTS(id))
  },
  getSubscriptions(id) {
    return http.get(HOTMART.SUBSCRIPTIONS(id))
  },
  getSubscription(id, subscription_id) {
    return http.get(HOTMART.SUBSCRIPTION(id, subscription_id))
  },
  getPanelOptions(accountId=null) {
    if (accountId)
      return http.get(HOTMART.PANEL_OPTION_CHILDREN(accountId))
    return http.get(HOTMART.PANEL_OPTIONS)
  },
}
