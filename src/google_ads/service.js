import http from "@/api"
import GOOGLE_ADS from "@/google_ads/routes"

export default {
  // Profiles
  getProfiles() {
    return http.get(GOOGLE_ADS.PROFILES)
  },
  authorizeProfile(scope) {
    return http.get(GOOGLE_ADS.AUTHORIZE(scope))
  },
  deleteProfile(id) {
    return http.delete(GOOGLE_ADS.PROFILE(id))
  },

  fetchProfileCustomers(id) {
    return http.get(GOOGLE_ADS.REMOTE_PROFILE_CUSTOMERS(id))
  },
  fetchProfileCustomerAccounts(id, customerId) {
    return http.get(GOOGLE_ADS.REMOTE_PROFILE_CUSTOMER_ACCOUNTS(id, customerId))
  },

  // Accounts
  getAccounts() {
    return http.get(GOOGLE_ADS.ACCOUNTS)
  },
  postAccounts(profileId, customerId, account) {
    return http.post(GOOGLE_ADS.ADD_ACCOUNTS(profileId, customerId), account)
  },
  deleteAccount(id) {
    return http.delete(GOOGLE_ADS.ACCOUNT(id))
  },

  // Panel Options
  getPanelOptions(accountId=null) {
    if (accountId)
      return http.get(GOOGLE_ADS.PANEL_OPTION_CHILDREN(accountId))
    return http.get(GOOGLE_ADS.PANEL_OPTIONS)
  },
}
