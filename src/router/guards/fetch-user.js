import store from "@/store"

export const fetchUser = (to, from, next) => {
  const isRegularUser = store.getters["account/isRegularUser"]
  if (isRegularUser) {
    store.dispatch("account/fetchUser")
    next()
  } else {
    next({ name: "Logout" })
  }
}
