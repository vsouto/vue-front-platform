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

export const setProducts = (state, products) => {
  state.products = products
  state.products_fetched = true
}

export const setOrders = (state, orders) => {
  state.orders = orders
  state.orders_fetched = true
}

export const setAccountId = (state, id) => {
  state.account_id = id
  state.products_fetched = false
  state.orders_fetched = false
}
