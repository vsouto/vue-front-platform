import PlatformModel from "@/models/platform"
import Service from "@/youtube/service"
import Home from "@/youtube/views/home"
// import StatsModel from "@/youtube/models/stats"

export default new PlatformModel(
  {
    service: Service,
    view: Home,
    // statsModel: StatsModel,
    module: "youtube",
    id: "youtube",
    color: "#FF0000",
    colors: ["FF0000", "#FFFFFF", "#282828"],
    earn_attr: "youtube_earn",
    name: "Youtube",
    icon: "/img/platforms/youtube-50x50.png",
    views: [
      { name: "TODO", component: Home }
    ]
  }
)
