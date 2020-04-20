import Vue from "vue"
import { all_platforms } from "@/platforms"


/* Fetch control (fetching, fetched, error) */

export const SET_FETCHING = (state, attr) => {
  Vue.set(state.fetch_control, attr, "fetching")
  if (state.errored_control[attr])
    Vue.delete(state.errored_control, attr)
}

export const SET_FETCHING_MODULES_ASSETS = (state, moduleNames) => {
  moduleNames.map(module => {
    // Credentials
    Vue.set(state.fetch_control, `${module}/profiles`, "fetching")
    if (state.errored_control[`${module}/profiles`])
      Vue.delete(state.errored_control, `${module}/profiles`)

    // Accounts
    Vue.set(state.fetch_control, `${module}/accounts`, "fetching")
    if (state.errored_control[`${module}/accounts`])
      Vue.delete(state.errored_control, `${module}/accounts`)
  })
}

export const SET_FETCHED = (state, attr) => {
  Vue.set(state.fetch_control, attr, "fetched")
  if (state.errored_control[attr])
    Vue.delete(state.errored_control, attr)
}

export const SET_FETCHED_ASSETS = (state, moduleNames) => {
  // Panels
  Vue.set(state.fetch_control, "panel/fetchPanels", "fetched")

  moduleNames.map(module => {
    // Credentials
    Vue.set(state.fetch_control, `${module}/profiles`, "fetched")
    if (state.errored_control[`${module}/profiles`])
      Vue.delete(state.errored_control, `${module}/profiles`)

    // Accounts
    Vue.set(state.fetch_control, `${module}/accounts`, "fetched")
    if (state.errored_control[`${module}/accounts`])
      Vue.delete(state.errored_control, `${module}/accounts`)
  })
}

export const SET_ASSETS = (state, { panels, credentials, accounts }) => {
  // Panels
  state.panel.panels = panels

  all_platforms.map(platform => {
    let platform_accounts = accounts.filter(a => a.platform == platform.id),
      platform_credentials = credentials.filter(c => c.platform == platform.id)

    // Credentials (Profiles)
    state[platform.module].profiles = platform_credentials

    // Accounts
    state[platform.module].accounts = platform_accounts
  })
}

export const SET_FETCH_ERROR = (state, { fetchAttr, errorCode }) => {
  Vue.delete(state.fetch_control, fetchAttr)
  Vue.set(state.errored_control, fetchAttr, errorCode)
}

// TODO: set a error info on user on network error
export const SET_NETWORK_ERROR = (state, isNetworkError) => {
  state.networkError = isNetworkError
}

/* Payment */

export const SET_PAYMENT_SUCCESS = (state) => {
  state.payment = true
}

export const SET_PAYMENT_FAIL = (state, msg) => {
  state.payment = msg || "Falha ao verificar transação"
}

export const SET_NEW_PAYMENT = (state) => {
  state.payment = null
}