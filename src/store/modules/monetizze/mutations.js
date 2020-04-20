export const ADD_ACCOUNT = (state, account) => {
  state.accounts.push(account)
}

export const SET_ACCOUNTS = (state, accounts) => {
  state.accounts = accounts
  state.accounts_fetched = true
}
export const SET_TOKEN = (state, token) => {
  state.token = token
}
export const NEW_ACCOUNTS = (state, new_account) => {
  const index = state.accounts.findIndex(o => o.id === new_account.id)
  state.accounts[index] = new_account
}
export const DEL_ACCOUNT = (state, id) => {
  const index = state.accounts.findIndex(o => o.id === id)
  if (index !== -1) {
    state.accounts.splice(index, 1)
  }
}

export const SET_ACCOUNT_PRODUCTS = (state, account_products) => {
  state.account_products = account_products
  const index = state.accounts.findIndex(o => o.id === account_products.id)
  state.accounts[index].products = account_products.products
}

export const SET_PANEL_OPTIONS = (state, options) => {
  state.options = options
}

export const SET_PROFILES = () => {
  return
}