import PlatformModel from "@/models/platform"
import Service from "@/hotmart/service"
import StatsModel from "@/hotmart/models/stats"

// Views
const Home = () => import("@/hotmart/views/home")

// Table Columns
const NameColumn = () => import("@/hotmart/components/columns/NameColumn")
const EarnColumn = () => import("@/hotmart/components/columns/EarnColumn")
const PendingColumn = () => import("@/hotmart/components/columns/PendingColumn")

export default new PlatformModel(
  {
    service: Service,
    view: Home,
    home: "/hotmart",
    statsModel: StatsModel,
    module: "hotmart",
    id: "hotmart",
    color: "#f04f23",
    spend_attr: "hotmart_earn",
    name: "Hotmart",
    icon: "/img/platforms/hotmart-50x50.png",
    views: [],
    tableColumns: [
      NameColumn,
      PendingColumn,
      EarnColumn
    ]
  }
)