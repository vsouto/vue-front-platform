import PlatformModel from "@/models/platform"
import Service from "@/shopify/service"
import Home from "@/shopify/views/home"
// import StatsModel from "@/shopify/models/stats"

export default new PlatformModel(
  {
    service: Service,
    view: Home,
    // statsModel: StatsModel,
    module: "shopify",
    id: "shopify",
    color: "#96bf48",
    colors: ["#96bf48", "#FFFFFF"],
    earn_attr: "shopify_earn",
    name: "Shopify",
    icon: "/img/platforms/shopify-50x50.png",
    views: [
      { name: "TODO", component: Home }
    ]
  }
)
