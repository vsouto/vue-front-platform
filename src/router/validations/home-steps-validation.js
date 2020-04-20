import store from "@/store"

export const HomeStepsValidation = (to, from, next) => {

  store.dispatch("panel/fetchPanels").then(() => {

    const activePanels = store.getters["panel/getPanels"]

    if (activePanels.length >0) {
      next("dashboard")
    }
    else {
      const activeAccounts = store.getters["getAllAccounts"]

      let activePlatforms = []
      activeAccounts.map(account => {
        const platformId = account.platform
        if (activePlatforms.toString().indexOf(platformId) === -1)
          activePlatforms.push(platformId)
      })

      if (activePlatforms.length >0 && activePanels.length >0) {
        next("dashboard")
      }
      else {
        next()
      }
    }
  })
}
