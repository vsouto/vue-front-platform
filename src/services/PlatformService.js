import http from "@/api"

import { PLATFORM } from "@/api/routes"

export default {
  getAvailablePlatforms() {
    return http.get(PLATFORM.AVAILABLE)
  },
  getInDevelopmentPlatforms() {
    return http.get(PLATFORM.DEVELOPMENT)
  },
  getOptions(platforms) {
    platforms = JSON.stringify(platforms)
    return http.get(PLATFORM.OPTIONS(platforms))
  }
}
