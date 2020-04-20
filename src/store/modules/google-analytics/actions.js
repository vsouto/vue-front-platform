import GoogleAnalyticsService from "@/google_analytics/service"

export const fetchAccounts = ({
  commit,
  rootState,
  dispatch
}, {
  token,
  refresh_token
}) => {
  const fetchAttr = "googleAnalytics/accounts"
  if (!rootState.fetch_control[fetchAttr]) {
    commit("SET_FETCHING", fetchAttr, { root: true })
    return GoogleAnalyticsService.getAccounts(token, refresh_token)
      .then((res) => {
        commit("SET_ACCOUNTS", res.data.response)
        commit("SET_FETCHED", fetchAttr, { root: true })
      })
      .catch(error => {
        dispatch("error", { fetchAttr, error }, {
          root: true
        })
      })
  }
}

export const authorizeAccount = (_, {
  scope
}) => {
  return GoogleAnalyticsService.authorizeAccount(scope)
}

export const fetchProfiles = ({
  commit,
  rootState,
  dispatch
}, isUpdate) => {
  const fetchAttr = "googleAnalytics/profiles"
  if (isUpdate || !rootState.fetch_control[fetchAttr]) {
    commit("SET_FETCHING", fetchAttr, { root: true })
    return GoogleAnalyticsService.getProfiles()
      .then((res) => {
        commit("setProfiles", res.data.response)
        commit("SET_FETCHED", fetchAttr, { root: true })
      })
      .catch(error => {
        dispatch("error", { fetchAttr, error }, {
          root: true
        })
      })
  }
}

export const deleteProfile = ({
  commit,
  dispatch
}, id) => {
  return GoogleAnalyticsService.deleteProfile(id)
    .then(() => {
      commit("deleteProfile", id)
    })
    .catch(error => {
      dispatch("error", error, {
        root: true
      })
    })
}

export const fetchWebProperties = ({
  commit,
  rootState,
  dispatch
}, {
  id,
  token,
  refresh_token
}) => {
  const fetchAttr = "googleAnalytics/web_properties"
  if (!rootState.fetch_control[fetchAttr]) {
    commit("SET_FETCHING", fetchAttr, { root: true })
    return GoogleAnalyticsService.getWebProperties(id, token, refresh_token)
      .then((res) => {
        commit("setWebProperties", res.data.response)
        commit("SET_FETCHED", fetchAttr, { root: true })
      })
      .catch(error => {
        dispatch("error", { fetchAttr, error }, {
          root: true
        })
      })
  }
}

export const fetchViews = ({
  commit,
  rootState,
  dispatch
}, {
  id,
  property_id,
  token,
  refresh_token
}) => {
  const fetchAttr = "googleAnalytics/views"
  if (!rootState.fetch_control[fetchAttr]) {
    commit("SET_FETCHING", fetchAttr, { root: true })
    return GoogleAnalyticsService.getViews(id, property_id, token, refresh_token)
      .then((res) => {
        commit("setViews", res.data.response)
        commit("SET_FETCHED", fetchAttr, { root: true })
      })
      .catch(error => {
        dispatch("error", { fetchAttr, error }, {
          root: true
        })
      })
  }
}

export const fetchReport = ({
  commit,
  rootState,
  dispatch
}, {
  view_id
}) => {
  const fetchAttr = "googleAnalytics/report"
  if (!rootState.fetch_control[fetchAttr]) {
    commit("SET_FETCHING", fetchAttr, { root: true })
    return GoogleAnalyticsService.getReport(view_id)
      .then((res) => {
        commit("setReport", res.data.response)
        commit("SET_FETCHED", fetchAttr, { root: true })
      })
      .catch(error => {
        dispatch("error", { fetchAttr, error }, {
          root: true
        })
      })
  }
}

export const fetchActiveViews = ({
  commit,
  rootState,
  dispatch
}, isUpdate) => {
  const fetchAttr = "googleAnalytics/active_views"
  if (isUpdate || !rootState.fetch_control[fetchAttr]) {
    commit("SET_FETCHING", fetchAttr, { root: true })
    return GoogleAnalyticsService.getActiveViews()
      .then((res) => {
        commit("setActiveViews", res.data.response)
        commit("SET_FETCHED", fetchAttr, { root: true })
      })
      .catch(error => {
        dispatch("error", { fetchAttr, error }, {
          root: true
        })
      })
  }
}

export const addActiveViews = ({
  commit,
  dispatch
}, views) => {
  return GoogleAnalyticsService.postActiveViews(views)
    .then((res) => {
      commit("addActiveViews", res.data.response)
    })
    .catch(error => {
      dispatch("error", error, {
        root: true
      })
    })
}

export const updateActiveView = ({
  commit,
  dispatch
}, view) => {
  return GoogleAnalyticsService.updateActiveView(view)
    .then((res) => {
      commit("updateActiveView", res.data.response)
    })
    .catch(error => {
      dispatch("error", error, {
        root: true
      })
    })
}

export const deleteActiveView = ({
  commit,
  dispatch
}, id) => {
  return GoogleAnalyticsService.deleteActiveView(id)
    .then(() => {
      commit("deleteActiveView", id)
    })
    .catch(error => {
      dispatch("error", error, {
        root: true
      })
    })
}

export const selectViewToAdd = ({
  commit,
  getters
}, payload) => {
  const { view, toggle } = payload
  let isViewNotAdded = getters["getActiveViewById"](view.id) === undefined
  let isViewSelected = getters["selected_views"].findIndex((o) => o.id === view.id) != -1
  if (toggle && isViewNotAdded && !isViewSelected) {
    commit("addSelectedView", view)
  }
  else if (!toggle && isViewNotAdded) {
    commit("deleteSelectedView", view)
  }
}
