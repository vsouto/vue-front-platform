export const getAccountById = state => id => {
  if (state.accounts_fetched) return state.accounts.find(account => account.id === id)
  return null
}

export const accounts = state => state.accounts
export const accounts_fetched = state => state.accounts_fetched

export const profiles = state => state.profiles
export const profiles_fetched = state => state.profiles_fetched
