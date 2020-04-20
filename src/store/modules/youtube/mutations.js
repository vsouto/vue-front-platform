export const SET_ACCOUNTS = (state, accounts) => {
  state.accounts = accounts
  state.accounts_fetched = true
}

export const setProfiles= (state, profiles) => {
  state.profiles = profiles
  state.profiles_fetched = true
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

export const deleteProfile = (state, id) => {
  const index = state.profiles.findIndex(o => o.id === id)
  if (index !== -1) {
    state.profiles.splice(index, 1)
  }
}
