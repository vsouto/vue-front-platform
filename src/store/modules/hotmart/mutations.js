export const SET_ACCOUNTS = (state, accounts) => {
  state.accounts = accounts
  state.accounts_fetched = true
}

export const addAccount = (state, account) => {
  state.accounts.push(account)
}

export const updateAccount = (state, account) => {
  let accounts = state.accounts.map(acc => {
    return acc.id == account.id ? account : acc
  })
  state.accounts = accounts
}

export const deleteAccount = (state, id) => {
  const index = state.accounts.findIndex(o => o.id === id)
  if (index !== -1) {
    state.accounts.splice(index, 1)
  }
}

export const setAffiliations = (state, { affiliations, id }) => {
  state.affiliations = affiliations
  state.affiliations_fetched_id = id
}

export const setSubscriptions = (state, { subscriptions, id }) => {
  state.subscriptions = subscriptions
  state.subscriptions_fetched_id = id
}

export const SET_PANEL_OPTIONS = (state, options) => {
  state.options = options
}

export const SET_PROFILES = () => {
  return
}