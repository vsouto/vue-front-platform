
<template>
  <div class="animated fadeIn">
    <div id="GoogleAnalyticsProperties">
      <b-card no-body>
        <properties-table
          :properties="properties"
          @load-views="loadViews($event)"
        />
      </b-card>
    </div>
  </div>
</template>

<script>
import PropertiesTable from "@/google_analytics/components/PropertiesTable"
import { error } from "@/constants/notifications"

export default {
  name: "GoogleAnalyticsProperties",
  components: {
    PropertiesTable
  },
  computed: {
    properties() {
      return this.$store.getters["googleAnalytics/web_properties"]
    }
  },
  watch: {
    $route: {
      handler(route) {
        if (!this.$store.state.googleAnalytics.profile) {
          return this.$router.push({ name: "GoogleAnalytics" })
        }
        const { account_id } = route.params
        if (account_id !== this.$store.state.googleAnalytics.accountId) {
          const {
            token,
            refresh_token
          } = this.$store.state.googleAnalytics.profile
          this.$store.commit("googleAnalytics/setAccountId", account_id)
          this.$store.commit("SET_UNFETCHED", "googleAnalytics/web_properties", { root: true })
          this.$store
            .dispatch("googleAnalytics/fetchWebProperties", {
              id: this.$store.state.googleAnalytics.account.id,
              token,
              refresh_token
            })
            .catch(() => {
              this.$notify(error.fetchProperties)
            })
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    loadViews(property) {
      this.$router.push({
        name: "GoogleAnalyticsViews",
        params: { property_id: property.id }
      })
      this.$store.commit("googleAnalytics/setWebProperty", property)
    }
  }
}
</script>
