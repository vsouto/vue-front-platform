
<template>
  <div class="animated fadeIn">
    <div id="GoogleAnalyticsAccounts">
      <b-card no-body>
        <accounts-table
          :accounts="accounts"
          @load-properties="loadProperties($event)"
        />
      </b-card>
    </div>
  </div>
</template>

<script>
import AccountsTable from "@/google_analytics/components/AccountsTable"
import { error } from "@/constants/notifications"

export default {
  name: "GoogleAnalyticsAccounts",
  components: {
    AccountsTable
  },
  computed: {
    accounts() {
      return this.$store.getters["googleAnalytics/getAccounts"]
    },
  },
  watch: {
    $route: {
      handler(route) {
        if (!this.$store.state.googleAnalytics.profile) {
          return this.$router.push({ name: "GoogleAnalytics" })
        }
        const { profile_id } = route.params
        if (profile_id !== this.$store.state.googleAnalytics.profileId) {
          const {
            token,
            refresh_token
          } = this.$store.state.googleAnalytics.profile
          this.$store.commit("googleAnalytics/setProfileId", profile_id)
          this.$store.commit("SET_UNFETCHED", "googleAnalytics/accounts", { root: true })
          this.$store
            .dispatch("googleAnalytics/fetchAccounts", { token, refresh_token })
            .catch(() => {
              this.$notify(error.fetchAccounts)
            })
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    loadProperties(account) {
      this.$router.push({
        name: "GoogleAnalyticsProperties",
        params: { account_id: account.id }
      })
      this.$store.commit("googleAnalytics/setAccount", account)
    }
  }
}
</script>
