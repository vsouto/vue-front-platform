import store from "@/store"

export const fetchNavs = (to, from, next) => {
  store.dispatch("panel/fetchPanels")
  next()
}
