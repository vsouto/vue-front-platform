import * as mutations from "./mutations"
import * as actions from "./actions"
import * as getters from "./getters"

import DATES from "@/constants/dates"

const state = {
  storeModuleDirectory: "panel",
  panels: [],
  currentPanel: null,
  panel_stats: [],
  widget_stats: [],
  currentPanelStats: null,
  selectedDate: DATES.defaultDatePickerDate(),
  user_settings: {
    random_data_disclaimer: true,
    example_create_panel: true
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
