import PlatformModel from "@/models/platform"
import Service from "@/google_adsense/service"
import StatsModel from "@/google_adsense/models/stats"

// Views
const Home = () => import(/* webpackChunkName: "google-adsense" */ "@/google_adsense/views/home")

// Table Columns
const NameColumn = () => import(/* webpackChunkName: "google-adsense" */ "@/google_adsense/components/columns/NameColumn")
const CtrColumn = () => import(/* webpackChunkName: "google-adsense" */ "@/google_adsense/components/columns/CtrColumn")
const CpcColumn = () => import(/* webpackChunkName: "google-adsense" */ "@/google_adsense/components/columns/CpcColumn")
const RpmColumn = () => import(/* webpackChunkName: "google-adsense" */ "@/google_adsense/components/columns/RpmColumn")
const EarnColumn = () => import(/* webpackChunkName: "google-adsense" */ "@/google_adsense/components/columns/EarnColumn")

export default new PlatformModel(
  {
    service: Service,
    view: Home,
    home: "/google-adsense",
    statsModel: StatsModel,
    module: "googleAdsense",
    id: "google_adsense",
    color: "#f78c40",
    earn_attr: "google_adsense_earn",
    name: "Google Adsense",
    icon: "/img/platforms/google-adsense-50x50.png",
    views: [],
    tableColumns: [
      NameColumn,
      CtrColumn,
      CpcColumn,
      RpmColumn,
      EarnColumn
    ]
  }
)
