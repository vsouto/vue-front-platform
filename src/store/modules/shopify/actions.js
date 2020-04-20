import ShopifyService from "@/shopify/service"

export const fetchAccounts = ({
  commit,
  state,
  dispatch
}, isUpdate) => {
  if (isUpdate || !state.accounts_fetched) {

    return ShopifyService.getAccounts()
      .then((res) => {
        commit("SET_ACCOUNTS", res.data.response)
      })
      .catch(error => {
        dispatch("error", error, {
          root: true
        })
      })

  }
}

export const authorizeAccount = (_, {
  scope,
  shop
}) => {
  return ShopifyService.authorizeAccount(scope, shop)
}

export const addAccount = ({
  commit,
  dispatch
}, account) => {
  return ShopifyService.postAccount(account)
    .then(() => {
      commit("addAccount", account)
    })
    .catch(error => {
      dispatch("error", error, {
        root: true
      })
      throw error
    })
}

export const updateAccount = ({
  commit,
  dispatch
}, account) => {
  return ShopifyService.updateAccount(account)
    .then(() => {
      commit("updateAccount", account)
    })
    .catch(error => {
      dispatch("error", error, {
        root: true
      })
      throw error
    })
}

export const deleteAccount = ({
  commit,
  dispatch
}, id) => {
  return ShopifyService.deleteAccount(id)
    .then(() => {
      commit("deleteAccount", id)
    })
    .catch(error => {
      dispatch("error", error, {
        root: true
      })
      throw error
    })
}

export const fetchProducts = ({
  commit,
  state,
  dispatch
}, id) => {
  if (!state.products_fetched) {

    return ShopifyService.getProducts(id)
      .then((res) => {
        commit("setProducts", res.data.response)
      })
      .catch(error => {
        dispatch("error", error, {
          root: true
        })
      })

  }
}

export const fetchOrders = ({
  commit,
  state,
  dispatch
}, id) => {
  if (!state.orders_fetched) {

    return ShopifyService.getOrders(id)
      .then((res) => {
        commit("setOrders", res.data.response)
      })
      .catch(error => {
        dispatch("error", error, {
          root: true
        })
      })

  }
}
