import { apiStatus } from "@/constants/api_status"
import { CANCELLED_BY_USER } from "@/constants/api_status"
import MonetizzeService from "@/monetizze/service"
import * as AccountService from "@/services/AccountService"
import * as getters from "./getters"

/**
 * Fetch user assets (panels, credentials, accounts)
 *
 * @returns {Object}
 */
export const fetchAssets = ({ commit, dispatch } ) => {
  const fetchAttr = "fetchAssets",
    platforms = getters["getAllPlatforms"]()
  const moduleNames = platforms.map(platform => platform.module)
  commit("SET_FETCHING", fetchAttr)
  commit("SET_FETCHING_MODULES_ASSETS", moduleNames)
  return AccountService.getAssets()
    .then(res => {
      commit("SET_FETCHED", fetchAttr)
      if (res.data && res.data.response) {

        let panels = res.data.response.panel || [],
          accounts = res.data.response.account || [],
          credentials = res.data.response.credential || []

        commit("SET_ASSETS", { panels, credentials, accounts })
        commit("SET_FETCHED_ASSETS", moduleNames)
      }
    })
    .catch((error) => {
      dispatch("error", { fetchAttr, error }, {
        root: true
      })
    })
}

/* Error */

export const error = ({ commit, dispatch }, { fetchAttr, error }) => {

  // User canceled. (Cancel Source Token -- Axios)
  if (error.message && error.message == CANCELLED_BY_USER)
    return

  // eslint-disable-next-line
  console.error(error)

  if (!error.response) {
    commit("SET_NETWORK_ERROR", true)
    let errorCode = "network"
    commit("SET_FETCH_ERROR", { fetchAttr, errorCode })
  } else {
    let errorCode = (error.response.data && (error.response.data.error || error.response.data.message)) || "unkown"
    commit("SET_FETCH_ERROR", { fetchAttr, errorCode })
    if (error.response.status == 409)
      window.$notify({
        type: "warning",
        message: "Item já existe."
      })
    else if (error.response.status == 404)
      window.$notify({
        type: "warning",
        message: "Item não existe."
      })
    else {
      window.$notify({
        type: "danger",
        message: window.$t("error_codes."+errorCode)
      })
    }
  }

  dispatch("errorTracking", error)
}

export const errorTracking = (_, error) => {
  error
  // Sentry.captureException(error)
}

/**
 * Payment is processed by Monetizze, transparent checkout
 */
export const processPayment = ({ commit, dispatch }, payload) => {
  const fetchAttr = "payment"
  commit("SET_FETCHING", fetchAttr)
  commit("SET_NEW_PAYMENT")
  return MonetizzeService.postPayment(payload.key, payload.ref, payload.data, payload.fingerprint)
    .then((res) => {
      let resp = res.data
      if (resp.status == apiStatus.success) {
        // TODO: fire reaper endpoint to handle tags for new customer
      } else {
        // TODO: fire reaper endpoint to handle payment failed
      }
      commit("SET_FETCHED", fetchAttr)
    })
    .catch((error) => {
      commit("SET_PAYMENT_FAIL", "Falha ao verificar transação")
      dispatch("error", { fetchAttr, error })
    })
}
