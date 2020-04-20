import Vue from "vue"
import PanelService from "@/services/PanelService"
import PanelModel from "@/models/panel"
import * as ReaperService from "@/services/ReaperService"


/**
  * Creates a new panel
  * @param  {PanelModel} panel
  * @returns {Object} -- created panel
  *
  */
export const createPanel = ({ commit, dispatch, rootGetters }, panel) => {
  const fetchAttr = "panel/createPanel"
  if (rootGetters["isFetching"](fetchAttr))
    return
  if (!(panel instanceof PanelModel))
    throw Error("Invalid PanelModel.")
  panel.removeDisabledWidgets()
  commit("SET_FETCHING", fetchAttr, {root: true})
  return PanelService.createPanel(panel)
    .then((res) => {
      commit("ADD_PANEL", res.data.response)
      commit("SET_FETCHED", fetchAttr, {root: true})
      dispatch("eventPanelCreated")
      return res.data.response
    })
    .catch((error) => {
      dispatch("error", { fetchAttr, error }, {
        root: true
      })
    })
}

/**
  * Patches a existing panel
  * @param  {PanelModel} panel
  * @returns {Object} -- patched panel
  *
  */
export const updatePanel = ({ commit, dispatch, rootGetters }, panel) => {
  const fetchAttr = "panel/updatePanel/"+panel.id
  if (rootGetters["isFetching"](fetchAttr))
    return
  if (!(panel instanceof PanelModel))
    throw Error("Invalid PanelModel.")
  panel.removeDisabledWidgets()
  commit("SET_FETCHING", fetchAttr, {root: true})
  return PanelService.updatePanel(panel.id, panel)
    .then(() => {
      commit("PATCH_PANEL", panel)
      return panel
    })
    .catch((error) => {
      dispatch("error", { fetchAttr, error }, {
        root: true
      })
    })
}

/**
  * Deletes a existing panel
  * @param  {PanelModel} panel
  * @returns {Boolean}
  *
  */
export const deletePanel = ({ commit, dispatch, rootGetters }, id) => {
  const fetchAttr = "panel/deletePanel/"+id
  if (rootGetters["isFetching"](fetchAttr))
    return
  commit("SET_FETCHING", fetchAttr, {root: true})
  return PanelService.deletePanel(id)
    .then(() => {
      commit("DEL_PANEL", id)
      return true
    })
    .catch((error) => {
      dispatch("error", { fetchAttr, error }, {
        root: true
      })
    })
}

/**
  * Fetch all user panels and sets on state
  * @param  {Boolean} payload.force -- Flag to bypass isFetched
  *
  */
export const fetchPanels = async ({ state, commit, dispatch, rootGetters }, payload={}) => {

  const fetchAttr = "panel/fetchPanels"
  let { force } = payload
  if (rootGetters["isFetching"](fetchAttr))
    return
  if (!force && rootGetters["isFetched"](fetchAttr))
    return
  commit("SET_FETCHING", fetchAttr, {root: true})

  if (Vue.mocksActive) {
    let panels = Vue.getMock(state.storeModuleDirectory, "panels")
    if (panels) {
      commit("SET_PANELS", panels)
      commit("SET_FETCHED", fetchAttr, {root: true})
      return
    }
  }

  return PanelService.getPanels()
    .then((res) => {
      let panels = res.data.response
      commit("SET_PANELS", panels)
      commit("SET_FETCHED", fetchAttr, {root: true})
    })
    .catch((error) => {
      dispatch("error", { fetchAttr, error }, {
        root: true
      })
    })
}

/**
  * Fetch single panel by id and set on state
  * @param  {String} id -- ID of the panel to fetch
  *
  */
export const fetchPanel = async ({ state, commit, dispatch, rootGetters }, id) => {
  const fetchAttr = "panel/fetchPanel/"+id
  if (rootGetters["isFetching"](fetchAttr))
    return

  if (Vue.mocksActive) {
    let panel = Vue.getMock(state.storeModuleDirectory, "panel")
    if (panel) {
      commit("SET_PANELS", [panel])
      return panel
    }
  }

  return PanelService.getPanel(id)
    .then((res) => {
      let panel = res.data.response
      commit("SET_PANELS", [panel])
      return panel
    })
    .catch((error) => {
      dispatch("error", { fetchAttr, error }, {
        root: true
      })
    })
}


/**
  * Fetch panel stats in a date range.
  * A panel stats contains a stats_list and also stats_aggregated.
  * Check PanelStatsModel
  * @param  {String} id -- ID of the panel
  * @param  {Object} data
  *   date_start {String} -- Date range start to fetch stats from
  *   date_end {String} -- Date range end to fetch stats from
  * @param  {*} cancelToken -- Axios cancel source token to cancel requests
  *
  */
export const fetchPanelStats = async ({ state, commit, dispatch, rootGetters }, { id, data, cancelToken }) => {
  const fetchAttr = `panel/fetchPanelStats/${id}`
  if (rootGetters["isFetching"](fetchAttr))
    return

  if (Vue.mocksActive) {
    let mock = Vue.getMock(state.storeModuleDirectory, "panelStats")
    if (mock) {
      let panelStats = mock
      commit("SET_PANEL_STATS", panelStats)
      return panelStats
    }
  }

  commit("SET_FETCHING", fetchAttr, {root: true})
  return PanelService.getPanelStats(id, data, cancelToken)
    .then((res) => {
      let panelStats = res.data.response
      commit("SET_PANEL_STATS", panelStats)
      commit("SET_FETCHED", fetchAttr, {root: true})
      return panelStats
    })
    .catch((error) => {
      dispatch("error", { fetchAttr, error }, {
        root: true
      })
      return {
        error: true
      }
    })
}

/**
  * Fetch widget stats of a panel in a date range.
  * A widget stats also contains a stats_list and also stats_aggregated.
  * Check WidgetStatsModel
  * @param  {String} panelId -- ID of the panel
  * @param  {String} widgetId -- ID of the widget
  * @param  {Object} data
  *   date_start {String} -- Date range start to fetch stats from
  *   date_end {String} -- Date range end to fetch stats from
  * @param  {*} cancelToken -- Axios cancel source token to cancel requests
  *
  */
export const fetchSingleWidgetStats = async ({ commit, dispatch, rootGetters }, { panelId, widgetId, data, cancelToken }) => {
  const fetchAttr = `panel/fetchSingleWidgetStats/${panelId}/${widgetId}`
  if (rootGetters["isFetching"](fetchAttr))
    return
  commit("SET_FETCHING", fetchAttr, {root: true})
  // TODO: implement date_start, date_end (on backend too)
  return PanelService.getPanelSingleWidgetStats(panelId, widgetId, data, cancelToken)
    .then((res) => {
      let widgetStats = res.data.response
      commit("SET_PANEL_WIDGET_STATS", {
        panelId,
        widgetId,
        widgetStats
      })
      commit("SET_FETCHED", fetchAttr, {root: true})
      return widgetStats
    })
    .catch((error) => {
      dispatch("error", { fetchAttr, error }, {
        root: true
      })
    })
}

/**
 * User just created a panel
 *
 * @returns {*}
 */
export const eventPanelCreated = ({ rootGetters }) => {

  // Dispatch this info to Reaper
  // Reaper should update CRM, fire email etc
  let email = rootGetters["account/userEmail"]
  ReaperService.configuredPanel(email) // TODO: verify it
  return
}
