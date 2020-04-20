<template>
  <div id="Callback">
    <loading
      size="64px"
      color-class="bg-primary"
    />
  </div>
</template>

<script>
function busToParent(args) {
  opener.dispatchEvent(
    new CustomEvent(args.provider + "-oauth", {
      detail: args
    })
  )
}
export default {
  name: "Callback",
  mounted() {
    if (this.$route.query.provider) {
      busToParent(this.$route.query)
      window.close()
    } else {
      this.$store.dispatch("account/handleAuthentication").then(() => {
        this.$nextTick(() => {
          const isRegularUser = this.$store.getters["account/isRegularUser"]
          const redirectPath = this.$store.getters["account/redirectPath"]
          let nextRoute = { name: "Subscriptions" }
          if (isRegularUser)
            nextRoute = redirectPath
          this.$nextTick(() => {
            this.$router.push(nextRoute)
          })
        })
      })
    }
  }
}
</script>
