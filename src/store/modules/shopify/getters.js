export const getAccountById = state => id => {
  if (state.accounts_fetched) return state.accounts.find(account => account.id === id)
  return null
}

export const getProductsByShopId = state => id => {
  if (state.orders_fetched && state.products_fetched) {
    let ids = state.orders.find(order => order.id === id).line_items
    // console.log(ids, "ids")
    return state.products.filter(product => {
      // console.log(ids.indexOf(product.id))
      if (ids.indexOf(product.id) !== -1) {
        return product
      }
    })
  } else {
    return []
  }
}

export const accounts = state => state.accounts
export const accounts_fetched = state => state.accounts_fetched
export const accountId = state => state.account_id

export const products = state => state.products
export const products_fetched = state => state.products_fetched

export const orders = state => state.orders
export const orders_fetched = state => state.orders_fetched
