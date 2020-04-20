export const setProfiles = (state, profiles) => {
  state.profiles = profiles
  state.profiles_fetched = true
}

export const setProfile = (state, profile) => {
  state.profile = profile
}

export const deleteProfile = (state, id) => {
  state.profiles = state.profiles.filter(profile => profile.id !== id)
}

export const SET_ACCOUNTS = (state, accounts) => {
  state.accounts = accounts
  state.accounts_fetched = true
}

export const setAccount = (state, account) => {
  state.account = account
}

export const setWebProperties = (state, web_properties) => {
  state.web_properties = web_properties
  state.web_properties_fetched = true
}

export const setWebProperty = (state, web_property) => {
  state.web_property = web_property
}

export const setViews = (state, views) => {
  state.views = views
  state.views_fetched = true
}

export const setReport = (state, report) => {
  state.report = report
  state.report_fetched = true
}

export const setActiveViews = (state, active_views) => {
  state.active_views = active_views
  state.active_views_fetched = true
}

export const addActiveViews = (state, active_views) => {
  state.active_views = [...state.active_views, ...active_views]
}

export const updateActiveView = (state, active_view) => {
  let views = state.active_views.map(view => {
    return view.id == active_view.id ? active_view : view
  })
  state.active_views = views
}

export const deleteActiveView = (state, id) => {
  state.active_views = state.active_views.filter(activeView => activeView.id !== id)
}

export const addSelectedView = (state, view) => {
  state.selected_views.push(view)
}

export const deleteSelectedView = (state, view) => {
  state.selected_views = state.selected_views.filter(selectedView => selectedView.id !== view.id)
}

export const clearSelectedViews = (state) => {
  state.selected_views = []
}

export const setProfileId = (state, id) => {
  state.profileId = id
  state.accounts = []
  state.accounts_fetched = false
}

export const setAccountId = (state, id) => {
  state.accountId = id
  state.web_properties = []
  state.web_properties_fetched = false
}

export const setPropertyId = (state, id) => {
  state.propertyId = id
  state.views = []
  state.views_fetched = false
}

export const setViewId = (state, id) => {
  state.viewId = id
  state.report = {}
  state.report_fetched = false
}
