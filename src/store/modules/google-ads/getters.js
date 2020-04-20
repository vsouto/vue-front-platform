export const getProfileById = (state) => (id) => {
  return state.profiles[id]
}
export const getProfiles = (state) => {
  return state.profiles
}
export const getAccountById = (state) => (id) => {
  return state.accounts[id]
}
export const getAccounts = (state) => {
  return state.accounts
}
