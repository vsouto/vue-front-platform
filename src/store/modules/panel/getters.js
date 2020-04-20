import PanelStatsModel from "@/models/panelStats"

/* Panel */

export const getPanelById = (state) => (id) => {
  return state.panels.find((panel) => panel.id === id)
}

export const getPanels = (state) => {
  return state.panels
}

export const getCurrentPanel = (state) => {
  return state.currentPanel
}

/* Panel - User defined settings */

export const selectedDate = (state) => {
  return state.selectedDate
}

/* Panel Creating */

export const canShowRandomDataDisclaimer = (state) => {
  return state.user_settings.random_data_disclaimer
}

export const canShowExamplePanelDisclaimer = (state) => {
  return state.user_settings.example_create_panel
}

/* Panel Statses */

export const getPanelStatsById = (state) => (id) => {
  return state.panel_stats.find((s) => s.id === id)
}

export const getCurrentPanelStats = (state) => {
  let panelStats = state.currentPanelStats
  if (!panelStats) return {}
  if (!(panelStats instanceof PanelStatsModel))
    panelStats = new PanelStatsModel(panelStats)
  return panelStats
}

/* Panel Statses - Widget Statses */

export const getWidgetStatsByIds = (state) => (panelId, widgetId) => {
  const stats = state.widget_stats.find((s) => s.panel_id === panelId && s.id === widgetId)
  return stats || {}
}

