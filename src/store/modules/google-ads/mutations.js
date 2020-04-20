import Vue from "vue"

export const SET_PROFILES = (state, profiles) => {
  for (const profile of profiles) Vue.set(state.profiles, profile.id, profile)
}
export const DEL_PROFILE = (state, id) => {
  const index = state.profiles.findIndex(o => o.id === id)
  if (index !== -1) {
    state.profiles.splice(index, 1)
  }
}
/*export const DEL_PROFILE = (state, id) => {
  console.log('deleting profile', id); // eslint-disable-line
  console.log('profiles are', state.profiles); // eslint-disable-line
  Vue.delete(state.profiles, id)
}*/
export const SET_ACCOUNTS = (state, accounts) => {
  for (const account of accounts) Vue.set(state.accounts, account.id, account)
}
export const DEL_ACCOUNT = (state, id) => {
  Vue.delete(state.accounts, id)
}
export const SET_PANEL_OPTIONS = (state, options) => {
  state.options = options
}
