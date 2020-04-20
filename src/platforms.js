import FACEBOOK_ADS from "@/facebook_ads"
import GOOGLE_ADS from "@/google_ads"
import GOOGLE_ADSENSE from "@/google_adsense"
import HOTMART from "@/hotmart"
import MONETIZZE from "@/monetizze"

// import SHOPIFY from "@/shopify"
// import YOUTUBE from "@/youtube"
// import GOOGLE_ANALYTICS from "@/google-analytics"

export const spend_platforms = [
  FACEBOOK_ADS,
  GOOGLE_ADS
]
export const earn_platforms = [
  GOOGLE_ADSENSE,
  HOTMART,
  MONETIZZE,
]
export const all_platforms = [ ...spend_platforms, ...earn_platforms ]