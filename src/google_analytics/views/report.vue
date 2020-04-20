
<template>
  <div class="animated fadeIn">
    <div id="GoogleAnalyticsProperties">
      <b-card no-body>
        <report-table
          :report="report"
          @load-details="loadDetails($event)"
        />
      </b-card>
    </div>
    <google-analytics-report-modal
      id="reportModal"
      ref="reportModal"
      :domain="domainName"
      :report="report"
      class="bg-table-dark"
    />
  </div>
</template>

<script>
import ReportTable from "@/google_analytics/components/ReportTable"
import GoogleAnalyticsReportModal from "@/google_analytics/components/reportModal"
import { error } from "@/constants/notifications"

export default {
  name: "GoogleAnalyticsReport",
  components: {
    ReportTable,
    GoogleAnalyticsReportModal
  },
  data() {
    return {
      domainName: ""
    }
  },
  computed: {
    report() {
      return this.$store.getters["googleAnalytics/report"]
    }
  },
  watch: {
    $route: {
      handler(route) {
        const { view_id } = route.params
        if (view_id !== this.$store.state.googleAnalytics.viewId) {
          this.$store.commit("googleAnalytics/setViewId", view_id)
          this.$store.commit("SET_UNFETCHED", "googleAnalytics/report", { root: true })
          this.$store.dispatch("googleAnalytics/fetchReport", {
            view_id
          })
            .catch(() => {
              this.$notify(error.fetchReport)
            })
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    loadDetails(domain) {
      this.domainName = domain
      this.$refs.reportModal.show()
    }
  }
}
</script>
