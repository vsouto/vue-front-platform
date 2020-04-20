import http from "@/api"
import { PANEL } from "@/api/routes"
import { jsonToQueryString } from "@/utils"

export default {
  getPanels() {
    return http.get(PANEL.PANELS)
  },
  getPanel(id) {
    return http.get(PANEL.PANEL(id))
  },
  createPanel(panel) {
    return http.post(PANEL.PANELS, panel.dump())
  },
  updatePanel(id, panel) {
    return http.patch(PANEL.PANEL(id), panel.dump())
  },
  deletePanel(id) {
    return http.delete(PANEL.PANEL(id))
  },
  getPanelStats(id, data, cancelToken) {
    let queryString = data && jsonToQueryString(data)
    return http.get(PANEL.STATS(id, queryString), {
      cache: false,
      cancelToken: cancelToken
    })
  },
  getPanelSingleWidgetStats(panelId, widgetId, data, cancelToken) {
    let queryString = data && jsonToQueryString(data)
    return http.get(PANEL.WIDGET_STATS(panelId, widgetId, queryString), {
      cache: false,
      cancelToken: cancelToken
    })
  }
}
