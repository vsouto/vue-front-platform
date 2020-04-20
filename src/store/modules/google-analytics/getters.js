export const getActiveViewById = state => id => {
  if (state.active_views_fetched) return state.active_views.find(view => view.id === id)
  return null
}

export const profiles = state => state.profiles
export const profiles_fetched = state => state.profiles_fetched

export const getAccounts = state => state.accounts
export const accounts_fetched = state => state.accounts_fetched

export const web_properties = state => state.web_properties
export const web_properties_fetched = state => state.web_properties_fetched

export const views = state => state.views
export const views_fetched = state => state.views_fetched

export const report = state => state.report
export const report_fetched = state => state.report_fetched

export const active_views = state => state.active_views
export const selected_views = state => state.selected_views
export const active_views_fetched = state => state.active_views_fetched
