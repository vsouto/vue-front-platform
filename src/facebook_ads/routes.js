const apiPath = process.env.VUE_APP_API_HOSTNAME + (process.env.VUE_APP_FACEBOOK_ADS_API_BASE_PATH || "")
const basePath = apiPath + "/facebook-ads"

export default {
  // Authentication
  AUTHORIZE: (scope) => basePath + `/authorize/${scope}`,

  // Profiles
  PROFILES: `${basePath}/profile`,
  PROFILE: (id) => `${basePath}/profile/${id}`,
  PROFILE_BUSINESSES: (id) => `${basePath}/remote/profile/${id}/business`,
  PROFILE_BUSINESS_ACCOUNTS: (id, businessId) => `${basePath}/remote/profile/${id}/business/${businessId}/account`,

  // Accounts
  ACCOUNTS: (filters, params) => `${basePath}/account?filters=${filters}&params=${params}`,
  ADD_ACCOUNTS: (id) => `${basePath}/account/?profile_id=${id}`,
  ACCOUNT: (id) => `${basePath}/account/${id}`,
  ACCOUNT_CAMPAIGNS: (id, filters, params) => `${basePath}/account/${id}/campaign?filters=${filters}&params=${params}`,
  ACCOUNT_INSIGHTS: (filters, params) => `${basePath}/insight/account?filters=${filters}&params=${params}`,

  // Panel options
  PANEL_OPTIONS: `${basePath}/panel-options`,
  PANEL_OPTION_CHILDREN: (accId) => `${basePath}/panel-options?account_id=${accId}`,

  // CAMPAIGNS
  CAMPAIGNS: (filters, params) => `${basePath}/campaign?filters=${filters}&params=${params}`,
  CAMPAIGN: (id) => `${basePath}/campaign/${id}`,
  CAMPAIGN_INSIGHTS: (filters, params) => `${basePath}/insight/campaign?filters=${filters}&params=${params}`,

  // ADSETS
  ADSETS: (filters, params) => `${basePath}/adset?filters=${filters}&params=${params}`,
  ADSET: (id) => `${basePath}/adset/${id}`,
  ADSET_INSIGHTS: (filters, params) => `${basePath}/insight/adset?filters=${filters}&params=${params}`,

  // ADS
  ADS: (filters, params) => `${basePath}/ad?filters=${filters}&params=${params}`,
  AD: (id) => `${basePath}/ad/${id}`,
  AD_INSIGHTS: (filters, params) => `${basePath}/insight/ad?filters=${filters}&params=${params}`,

  // CREATIVES
  CREATIVES: (filters) => `${basePath}/creative?filters=${filters}`,
  CREATIVE: (id) => `${basePath}/creative/${id}`,

  // Remote API
  UPDATE_AD: (profileId, accountId, adId) => `${basePath}/remote-ad/${profileId}/${accountId}/${adId}`,
  UPDATE_ADSET: (profileId, accountId, adsetId) => `${basePath}/remote-adset/${profileId}/${accountId}/${adsetId}`,
  UPDATE_CAMPAIGN: (profileId, accountId, campaignId) =>
    `${basePath}/remote-campaign/${profileId}/${accountId}/${campaignId}`
}
