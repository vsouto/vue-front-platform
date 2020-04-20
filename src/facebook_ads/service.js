import http from "@/api"
import FACEBOOK from "@/facebook_ads/routes"

export default {
  getProfiles() {
    return http.get(FACEBOOK.PROFILES)
  },
  authorizeProfile(scope) {
    return http.get(FACEBOOK.AUTHORIZE(scope))
  },
  postProfile(profile) {
    return http.post(FACEBOOK.PROFILES, profile)
  },
  deleteProfile(id) {
    return http.delete(FACEBOOK.PROFILE(id))
  },
  getProfileBusinesses(id) {
    return http.get(FACEBOOK.PROFILE_BUSINESSES(id))
  },
  getProfileBusinessAccounts(id, businessId) {
    return http.get(FACEBOOK.PROFILE_BUSINESS_ACCOUNTS(id, businessId))
  },

  // Account
  getAccounts(filters, params) {
    filters = encodeURIComponent(filters || "{}")
    params = encodeURIComponent(params || "{}")
    return http.get(FACEBOOK.ACCOUNTS(filters, params))
  },
  postAccounts(profileId, accounts) {
    return http.post(FACEBOOK.ADD_ACCOUNTS(profileId),  accounts)
  },
  deleteAccount(profileId, id) {
    return http.delete(FACEBOOK.ACCOUNT(id))
  },
  getAccountInsights(filters, params) {
    filters = encodeURIComponent(filters || "{}")
    params = encodeURIComponent(params || "{}")
    return http.get(FACEBOOK.ACCOUNT_INSIGHTS(filters, params))
  },
  getAccountCampaigns(accountId, filters="{}") {
    filters = encodeURIComponent(filters)
    return http.get(FACEBOOK.ACCOUNT_CAMPAIGNS(accountId, filters))
  },

  // Panel Options
  getPanelOptions(accountId=null) {
    if (accountId)
      return http.get(FACEBOOK.PANEL_OPTION_CHILDREN(accountId))
    return http.get(FACEBOOK.PANEL_OPTIONS)
  },

  // Campaigns
  getCampaigns(filters="{}", params="{}") {
    filters = encodeURIComponent(filters)
    params = encodeURIComponent(params)
    return http.get(FACEBOOK.CAMPAIGNS(filters, params))
  },
  getCampaignInsights(filters, params) {
    filters = encodeURIComponent(filters || "{}")
    params = encodeURIComponent(params || "{}")
    return http.get(FACEBOOK.CAMPAIGN_INSIGHTS(filters, params))
  },

  // Adsets
  getAdsets(filters="{}", params="{}") {
    filters = encodeURIComponent(filters)
    params = encodeURIComponent(params)
    return http.get(FACEBOOK.ADSETS(filters, params))
  },
  getAdsetInsights(filters, params) {
    filters = encodeURIComponent(filters || "{}")
    params = encodeURIComponent(params || "{}")
    return http.get(FACEBOOK.ADSET_INSIGHTS(filters, params))
  },

  // Ads
  getAds(filters="{}", params="{}") {
    filters = encodeURIComponent(filters)
    params = encodeURIComponent(params || "{}")
    return http.get(FACEBOOK.ADS(filters, params))
  },
  getAdInsights(filters, params) {
    filters = encodeURIComponent(filters || "{}")
    params = encodeURIComponent(params || "{}")
    return http.get(FACEBOOK.AD_INSIGHTS(filters, params))
  },

  // Creatives
  getCreatives(filters="{}") {
    filters = encodeURIComponent(filters)
    return http.get(FACEBOOK.CREATIVES(filters))
  },

  // Remote API
  postUpdateCampaign(profileId, accountId, campaignId, campaign) {
    return http.post(FACEBOOK.UPDATE_CAMPAIGN(profileId, accountId, campaignId), campaign)
  },
  postUpdateAdset(profileId, accountId, adsetId, adset) {
    return http.post(FACEBOOK.UPDATE_ADSET(profileId, accountId, adsetId), adset)
  },
  postUpdateAd(profileId, accountId, adId, ad) {
    return http.post(FACEBOOK.UPDATE_AD(profileId, accountId, adId), ad)
  }
}
