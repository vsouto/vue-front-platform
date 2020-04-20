export default {
  computed: {
    activeAccounts() {
      return this.$store.getters["getAllAccounts"]
    },
    activePlatforms() {
      let list = []
      this.activeAccounts.map(account => {
        const platformId = account.platform
        if (list.toString().indexOf(platformId) === -1)
          list.push(platformId)
      })
      return list
    }
  },
  methods: {
    isPlatformInactive(platform) {
      return this.activePlatforms.toString().indexOf(platform.id) === -1
    }
  }
}
