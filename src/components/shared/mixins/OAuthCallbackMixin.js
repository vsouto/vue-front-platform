import { openOAuthDialog, setOAuthListener } from "@/utils/o-auth"
import { success } from "@/constants/notifications"
import i18n from "@/i18n"

export default {
  mounted() {
    if (this.platform)
      this.setCallbackListener(this.platform.id, this.platform.home)
  },
  methods: {
    openOAuth(url) {
      openOAuthDialog(url)
    },
    //setCallbackListener(name, path) {
    setCallbackListener(name) {
      setOAuthListener(name, (data) => {
        if (data.error && data.error.length >0) {
          this.$notify({ type: "danger", message: i18n.tc("errors." + data.error) })
        }
        else {
          this.$router.go()
          /*
          this.$router.push({
            query: data,
            path: path
          })
          */
        }
      })
    }
  },
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler(route) {
        if (!route.query.provider) return
        if (route.query.error_title) {
          this.$notify({ type: "danger", message: route.query.error_message })
        } else if (route.query.success_title) {
          this.$notify(success.addProfile)
        }
        let currentPath = this.$route.path
        if (currentPath && currentPath != "/") currentPath = currentPath.replace(/\/$/, "")
        this.$router.replace(currentPath)
      }
    }
  },
}
