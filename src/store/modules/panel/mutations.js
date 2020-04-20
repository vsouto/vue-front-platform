import Vue from "vue"

/* Panel */

export const ADD_PANEL = (state, panel) => {
  state.panels.push(panel)
}

export const SET_PANELS = (state, panels) => {
  panels.map(panel => {
    const index = state.panels.findIndex((o) => o.id === panel.id)
    if (index === -1)
      state.panels.push(panel)
    else
      state.panels[index] = panel
  })
}

export const SET_CURRENT_PANEL = (state, panel) => {
  state.currentPanel = panel
}

export const PATCH_PANEL = (state, panel) => {
  const index = state.panels.findIndex((o) => o.id === panel.id)
  if (index !== -1)
    state.panels[index] = panel
}

export const DEL_PANEL = (state, id) => {
  const index = state.panels.findIndex((o) => o.id === id)
  if (index !== -1) {
    state.panels.splice(index, 1)
  }
}

/* User Settings on Panel */

export const SET_USER_SETTINGS = (state, {name, value}) => {
  state.user_settings[name] = value
}


/* Panel Statses */

export const SET_PANEL_STATS = (state, panelStats) => {
  const index = state.panel_stats.findIndex((o) => o.id === panelStats.id)
  if (index === -1)
    state.panel_stats.push(panelStats)
  else
    Vue.set(state.panel_stats, index, panelStats)
}

export const SET_CURRENT_PANEL_STATS = (state, panelStats) => {
  Vue.set(state, "currentPanelStats", panelStats)
}

export const SET_PANEL_WIDGET_STATS = (state, { panelId, widgetId, widgetStats }) => {
  if (!widgetStats.panel_id) widgetStats.panel_id = panelId
  const index = state.widget_stats.findIndex((o) => o.panel_id === panelId && o.id == widgetId)
  if (index === -1)
    state.widget_stats.push(widgetStats)
  else
    Vue.set(state.widget_stats, index, widgetStats)
}


export const SET_SELECTED_DATE = (state, selectedDate) => {
  state.selectedDate = selectedDate
}
