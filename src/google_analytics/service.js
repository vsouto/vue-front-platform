import http from "@/api"
import GOOGLE_ANALYTICS from "@/google_analytics/routes"
import { openOAuthDialog } from "@/utils/o-auth"

export default {
  authorizeAccount(scope) {
    const url = GOOGLE_ANALYTICS.AUTHORIZE(scope)
    openOAuthDialog(url)
  },

  getProfiles() {
    return http.get(GOOGLE_ANALYTICS.PROFILES)
  },
  deleteProfile(id) {
    return http.delete(GOOGLE_ANALYTICS.PROFILE(id))
  },
  getAccounts(token, refresh_token) {
    return http.get(GOOGLE_ANALYTICS.ACCOUNTS(token, refresh_token))
  },
  getWebProperties(id, token, refresh_token) {
    return http.get(GOOGLE_ANALYTICS.WEB_PROPERTIES(id, token, refresh_token))
  },
  getViews(id, property_id, token, refresh_token) {
    return http.get(GOOGLE_ANALYTICS.VIEWS(id, property_id, token, refresh_token))
  },
  getReport(view_id) {
    return http.get(GOOGLE_ANALYTICS.REPORT(view_id))
  },
  getActiveViews() {
    return http.get(GOOGLE_ANALYTICS.ACTIVE_VIEWS)
  },
  postActiveViews(views) {
    return http.post(GOOGLE_ANALYTICS.ACTIVE_VIEWS, views)
  },

  getActiveView(view_id) {
    return http.get(GOOGLE_ANALYTICS.ACTIVE_VIEW(view_id))
  },
  updateActiveView(view) {
    return http.patch(GOOGLE_ANALYTICS.ACTIVE_VIEW(view.view_id), view)
  },
  deleteActiveView(view_id) {
    return http.delete(GOOGLE_ANALYTICS.ACTIVE_VIEW(view_id))
  }
}
