export const getAccountById = state => id => {
  return state.accounts.find(account => account.id === id)
}
export const getAccounts = (state) => {
  return state.accounts
}
export const getAffiliationById = state => id => {
  if (state.affiliations_fetched_id) return state.affiliations.find(affiliation => affiliation.affiliation_id === id)
  return null
}
export const affiliations = state => state.affiliations
export const affiliations_fetched_id = state => state.affiliations_fetched_id

export const getSubscriptionById = state => id => {
  if (state.subscriptions_fetched_id) return state.subscriptions.find(subscription => subscription.subscription_id === id)
  return null
}
export const subscriptions = state => state.subscriptions
export const subscriptions_fetched_id = state => state.subscriptions_fetched_id
