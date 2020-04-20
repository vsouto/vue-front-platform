import PlatformModel from "@/models/platform"
import Service from "@/monetizze/service"
import StatsModel from "@/monetizze/models/stats"

// Views
const Home = () => import("@/monetizze/views/home")

// Table Columns
const PostbackTypeColumn = () => import("@/monetizze/components/columns/PostbackTypeColumn")
const NameColumn = () => import("@/monetizze/components/columns/NameColumn")
const EarnColumn = () => import("@/monetizze/components/columns/EarnColumn")
const PendingColumn = () => import("@/monetizze/components/columns/PendingColumn")

export default new PlatformModel(
  {
    service: Service,
    view: Home,
    home: "/monetizze",
    statsModel: StatsModel,
    module: "monetizze",
    id: "monetizze",
    color: "#4183c4",
    earn_attr: "monetizze_earn",
    name: "Monetizze",
    icon: "/img/platforms/monetizze-50x50.png",
    checkoutUrlJs: "https://homolog.monetizze.com.br/checkout/transparente/js?ctk=N7nx66kvE4eTUFi7emvZTepeoP46yRzB&referencia=",
    //checkoutUrlJs: process.env.VUE_APP_MONETIZZE_CHECKOUT_JS_URL,
    views: [],
    tableColumns: [
      PostbackTypeColumn,
      NameColumn,
      PendingColumn,
      EarnColumn
    ]
  }
)
