import http from "@/api"
import GOOGLE_ADSENSE from "@/google_adsense/routes"

export default {
  getAccounts() {
    return http.get(GOOGLE_ADSENSE.ACCOUNTS)
  },
  authorizeAccount(scope) {
    return http.get(GOOGLE_ADSENSE.AUTHORIZE(scope))
  },
  postAccount(account) {
    return http.post(GOOGLE_ADSENSE.ACCOUNTS, account)
  },
  deleteAccount(id) {
    return http.delete(GOOGLE_ADSENSE.ACCOUNT(id))
  },
  getPanelOptions(accountId=null) {
    if (accountId)
      return http.get(GOOGLE_ADSENSE.PANEL_OPTION_CHILDREN(accountId))
    return http.get(GOOGLE_ADSENSE.PANEL_OPTIONS)
  }
}
