import PlatformModel from "@/models/platform"
import Service from "@/google_analytics/service"
import Home from "@/google_analytics/views/home"
// import StatsModel from "@/google_analytics/models/stats"

export default new PlatformModel(
  {
    service: Service,
    view: Home,
    // statsModel: StatsModel,
    module: "googleAnalytics",
    id: "google_analytics",
    color: "#ED750A",
    colors: ["ED750A", "F57E02", "FFC517"],
    name: "Google Analytics",
    icon: "/img/platforms/google-analytics-50x50.png",
    views: [
      { name: "TODO", component: Home }
    ]
  }
)