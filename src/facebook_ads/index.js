import PlatformModel from "@/models/platform"
import Service from "@/facebook_ads/service"
import StatsModel from "@/facebook_ads/models/stats"

// Views
const Home = () => import(/* webpackChunkName: "facebook-ads" */ "@/facebook_ads/views/home")
/*const Campaigns = () => import(/!* webpackChunkName: "facebook-ads" *!/ "@/facebook_ads/views/campaigns")
const Adsets = () => import(/!* webpackChunkName: "facebook-ads" *!/ "@/facebook_ads/views/adsets")
const Ads = () => import(/!* webpackChunkName: "facebook-ads" *!/ "@/facebook_ads/views/ads")
const Creatives = () => import(/!* webpackChunkName: "facebook-ads" *!/ "@/facebook_ads/views/ads")
const Accounts = () => import(/* webpackChunkName: "facebook-ads" *!/ "@/facebook_ads/views/accounts")*/

// Account Table Columns
const AccountStatusColumn = () => import(/* webpackChunkName: "facebook-ads" */ "@/facebook_ads/components/columns/AccountStatusColumn")
const NameColumn = () => import(/* webpackChunkName: "facebook-ads" */ "@/facebook_ads/components/columns/NameColumn")
const BusinessNameColumn = () => import(/* webpackChunkName: "facebook-ads" */ "@/facebook_ads/components/columns/BusinessNameColumn")
const TimezoneNameColumn = () => import(/* webpackChunkName: "facebook-ads" */ "@/facebook_ads/components/columns/TimezoneNameColumn")
const AmountSpentColumn = () => import(/* webpackChunkName: "facebook-ads" */ "@/facebook_ads/components/columns/AmountSpentColumn")
const CurrencyColumn = () => import(/* webpackChunkName: "facebook-ads" */ "@/facebook_ads/components/columns/CurrencyColumn")
const BalanceColumn = () => import(/* webpackChunkName: "facebook-ads" */ "@/facebook_ads/components/columns/BalanceColumn")
const FundingSourceDetailsColumn = () => import(/* webpackChunkName: "facebook-ads" */ "@/facebook_ads/components/columns/FundingSourceDetailsColumn")

// Insight Table Columns
const InsightReachColumn = () => import("@/facebook_ads/components/columns/InsightReachColumn")
const InsightFrequencyColumn = () => import("@/facebook_ads/components/columns/InsightFrequencyColumn")
const InsightCostPerOutboundClickColumn = () => import("@/facebook_ads/components/columns/InsightCostPerOutboundClickColumn")
const InsightOutboundClicksCtrColumn = () => import("@/facebook_ads/components/columns/InsightOutboundClicksCtrColumn")
const InsightCostPerInitiateCheckoutColumn = () => import("@/facebook_ads/components/columns/InsightCostPerInitiateCheckoutColumn")
const InsightCostPerPurchaseColumn = () => import("@/facebook_ads/components/columns/InsightCostPerPurchaseColumn")
const InsightSpendColumn = () => import("@/facebook_ads/components/columns/InsightSpendColumn")
const InsightConversionFunnelColumn = () => import("@/facebook_ads/components/columns/InsightConversionFunnelColumn")


export default new PlatformModel(
  {
    service: Service,
    view: Home,
    home: "/facebook-ads",
    statsModel: StatsModel,
    module: "facebookAds",
    id: "facebook_ads",
    color: "#3b5998",
    spend_attr: "facebook_ads_spend",
    name: "Facebook Ads",
    icon: "/img/platforms/facebook-ads-50x50.png",
    views: [
      /*
      {
        id: "accounts",
        name: "Contas de anúncio",
        prefix: "CT",
        component: Accounts,
        path: "/facebook-ads/accounts"
      },
      {
        id: "campaigns",
        name: "Campanhas",
        prefix: "CP",
        component: Campaigns,
        path: "/facebook-ads/campaigns",
        // filters: [
        //   "spend",
        //   "objectives",
        //   "impressions",
        //   "date",
        //   "frequency",
        //   "status",
        //   "bid_strategy",
        //   "issues",
        //   "pacing"
        // ]
      },
      {
        id: "adsets",
        name: "Conjuntos de anúncio",
        prefix: "CA",
        component: Adsets,
        path: "/facebook-ads/adsets",
        // filters: [
        //   "spend",
        //   "impressions",
        //   "frequency",
        //   "bid_strategy",
        //   "target",
        //   "status",
        //   "pacing"
        // ]
      },
      {
        id: "ads",
        name: "Anúncios",
        prefix: "AD",
        component: Ads,
        path: "/facebook-ads/ads",
        // filters: [
        //   "spend",
        //   "impressions",
        //   "date",
        //   "frequency",
        //   "segment",
        //   "quality",
        //   "pixel",
        //   "issues"
        // ]
      },
      {
        id: "creatives",
        name: "Criativos",
        prefix: "CR",
        component: Creatives,
        path: "/facebook-ads/creatives",
        // filters: [
        //   "impressions",
        //   "date",
        //   "frequency",
        //   "target"
        // ]
      }*/
    ],
    tableColumns: {
      accounts: [
        AccountStatusColumn,
        NameColumn,
        BusinessNameColumn,
        TimezoneNameColumn,
        AmountSpentColumn,
        CurrencyColumn,
        BalanceColumn,
        FundingSourceDetailsColumn
      ],
      insights: [
        InsightReachColumn,
        InsightFrequencyColumn,
        InsightCostPerOutboundClickColumn,
        InsightOutboundClicksCtrColumn,
        InsightCostPerInitiateCheckoutColumn,
        InsightCostPerPurchaseColumn,
        InsightSpendColumn,
        InsightConversionFunnelColumn
      ]
    }
  }
)
