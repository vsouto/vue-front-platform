import http from "@/api"
import MONETIZZE from "@/monetizze/routes"

export default {
  getAccounts() {
    return http.get(MONETIZZE.ACCOUNTS)
  },
  postAccount(key) {
    return http.post(MONETIZZE.ACCOUNTS, {
      consumer_key: key
    })
  },
  patchAccount(id, account) {
    return http.patch(MONETIZZE.ACCOUNT(id), account)
  },
  deleteAccount(id) {
    return http.delete(MONETIZZE.ACCOUNT(id))
  },
  getAccountProducts(apiKey, id, owner) {
    if (owner) {
      return http.get(MONETIZZE.ACCOUNT_OWNER_PRODUCTS(id, apiKey))
    } else {
      return http.get(MONETIZZE.ACCOUNT_PRODUCTS(id, apiKey))
    }
  },
  getPanelOptions(accountId=null) {
    if (accountId)
      return http.get(MONETIZZE.PANEL_OPTION_CHILDREN(accountId))
    return http.get(MONETIZZE.PANEL_OPTIONS)
  },
  postPayment(key, ref, data) {
    return http.post(MONETIZZE.PAY(key, ref), data)
  }
}
