import store from "@/store"

export const isAuthorized = (to, from, next) => {
  const expiredToken = store.getters["account/expiredToken"],
    isAuthenticated = store.getters["account/isAuthenticated"]
  if (isAuthenticated) {
    if (expiredToken)
      store.dispatch("account/refreshExpiredToken")
        .then(() => {
          next()
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error)
          next({ name: "Login", query: { redirect: from.path } })
        })
    else
      next()
  } else {
    next({ name: "Login", query: { redirect: from.path } })
  }
}
