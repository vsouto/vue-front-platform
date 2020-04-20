import Vue from "vue"

/* Profiles */

export const SET_PROFILES = () => {
  // Not using, but need to be here since it's called dynamically by fetchAssets
  return
}

/* Accounts */

export const addAccount = (state, account) => {
  state.accounts.push(account)
}
export const SET_ACCOUNTS = (state, accounts) => {
  state.accounts = accounts
  state.accounts_fetched = true
}
export const setAccount = (state, account) => {
  state.account = account
}
export const newAccounts = (state, newAccount) => {
  const index = state.accounts.findIndex(o => o.id === newAccount.id)
  Vue.set(state.accounts, index, newAccount)
}
export const deleteAccount = (state, id) => {
  const index = state.accounts.findIndex(o => o.id === id)
  if (index !== -1) {
    state.accounts.splice(index, 1)
  }
}

export const SET_PANEL_OPTIONS = (state, options) => {
  state.options = options
}
