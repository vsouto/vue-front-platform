<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  mounted() {
    this.initializeLayout()
    this.initializeDataLayer()
    window.$notify = this.$notify
    window.$t = this.$t
  },
  methods: {
    initializeLayout() {
      if (!this.$rtl.isRTL) {
        // Just make sure rtl css is off when we are not on rtl
        this.$rtl.disableRTL()
      }
    },
    initializeDataLayer() {
      this.$store.dispatch("account/setUserDataLayer")
    }
  }
}
</script>
