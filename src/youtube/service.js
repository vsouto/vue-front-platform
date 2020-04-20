import http from "@/api"
import YOUTUBE from "@/youtube/routes"
import { openOAuthDialog } from "@/utils/o-auth"


export default {
  getAccounts() {
    return http.get(YOUTUBE.ACCOUNTS)
  },
  getProfiles() {
    return http.get(YOUTUBE.PROFILES)
  },
  authorizeAccount(scope) {
    const url = YOUTUBE.AUTHORIZE(scope)
    openOAuthDialog(url)
  },
  postAccount(account) {
    return http.post(YOUTUBE.ACCOUNTS, account)
  },
  getAccount(id) {
    return http.get(YOUTUBE.ACCOUNT(id))
  },
  updateAccount(account) {
    return http.patch(YOUTUBE.ACCOUNT(account.id), account)
  },
  deleteAccount(id) {
    return http.delete(YOUTUBE.ACCOUNT(id))
  },
  deleteProfile(id) {
    return http.delete(YOUTUBE.PROFILE(id))
  }
}
