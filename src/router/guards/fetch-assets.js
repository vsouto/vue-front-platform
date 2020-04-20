import store from "@/store"

export const fetchAssets = (to, from, next) => {
  store.dispatch("fetchAssets")
    .then(() => {
      next()
    })
}
