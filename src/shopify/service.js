import http from "@/api"
import SHOPIFY from "@/shopify/routes"
import { openOAuthDialog } from "@/utils/o-auth"


export default {
  getAccounts() {
    return http.get(SHOPIFY.ACCOUNTS)
  },
  getProfiles() {
    return http.get(SHOPIFY.PROFILES)
  },
  authorizeAccount(scope) {
    const url = SHOPIFY.AUTHORIZE(scope)
    openOAuthDialog(url)
  },
  postAccount(account) {
    return http.post(SHOPIFY.ACCOUNTS, account)
  },
  getAccount(id) {
    return http.get(SHOPIFY.ACCOUNT(id))
  },
  updateAccount(account) {
    return http.patch(SHOPIFY.ACCOUNT(account.id), account)
  },
  deleteAccount(id) {
    return http.delete(SHOPIFY.ACCOUNT(id))
  },
  deleteProfile(id) {
    return http.delete(SHOPIFY.PROFILE(id))
  }
}
