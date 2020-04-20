export const getAccountById = state => id => {
  return state.accounts.find(account => account.id === id)
}
export const getAccounts = (state) => {
  return state.accounts
}
