import PlatformModel from "@/models/platform"
import Service from "@/google_ads/service"
import StatsModel from "@/google_ads/models/stats"

// Views
const Home = () => import("@/google_ads/views/home")

// Account Table Columns
const NameColumn = () => import(/* webpackChunkName: "google-ads" */ "@/google_ads/components/tables/NameColumn")

// Report Table Columns
const SpendColumn = () => import(/* webpackChunkName: "google-ads" */ "@/google_ads/components/tables/SpendColumn")

export default new PlatformModel(
  {
    service: Service,
    view: Home,
    home: "/google-ads",
    statsModel: StatsModel,
    module: "googleAds",
    id: "google_adwords",
    color: "#026466",
    earn_attr: "google_ads_spend",
    name: "Google Ads",
    icon: "/img/platforms/google-ads-50x50.png",
    views: [],
    tableColumns: {
      accounts: [
        NameColumn,
        SpendColumn
      ]
    }
  }
)
