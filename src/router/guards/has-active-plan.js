import store from "@/store"

export const HasActivePlan = (to, from, next) => {
  const isRegularUser = store.getters["account/isRegularUser"]
  if (isRegularUser) {
    next()
  }
  else {
    next({ name: "Subscriptions" })
  }
}
