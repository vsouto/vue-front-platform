<script>
import { CancelToken } from "@/api"
import { CANCELLED_BY_USER } from "@/constants/api_status"
import FORMATS from "@/constants/formats"
import WidgetModel from "@/models/widget"
import FormattersMixin from "@/components/shared/mixins/FormattersMixin"

export default {
  mixins: [FormattersMixin],
  props: {
    panelId: {
      type: String,
      default: null
    },
    widget: {
      type: WidgetModel,
      required: true
    },
    isCreating: {
      type: Boolean,
      default: false
    },
    isFetchingPanelStats: {
      type: Boolean,
      default: false
    },
    isInSyncPanelStats: {
      type: Boolean,
      default: false
    },
    rowHeight: {
      type: Number,
      required: true
    }
  },
  data() {
    this.fetchAttr = `panel/fetchSingleWidgetStats/${this.panelId}/${this.widget.id}`
    this.cancelSource = CancelToken.source()
    this.timeout = null
    this.fetchStatsInterval = 5000
    return {}
  },
  computed: {
    isReady() {
      if (!this.panelStatsReady)
        return false
      if (!(this.widget instanceof WidgetModel))
        return false
      if (!this.widgetStatsReady)
        return false
      return  (typeof this.stats === "object")
    },
    isCompareReady() {
      return this.isReady && (typeof this.compareStats === "object")
    },
    haveComparison() {
      return this.isReady && this.isCompareReady
    },
    isFetching() {
      if (this.isFetchingPanelStats)
        return true
      return this.$store.getters["isFetching"](this.fetchAttr)
    },
    isInSync() {
      if (!this.isReady)
        return false
      return this.panelStats.isInSync()
    },
    isErrored() {
      if (!this.isFetching)
        return this.$store.getters["isErrored"](this.fetchAttr)
      return false
    },

    dateStart() {
      const selectedDate = this.$store.getters["panel/selectedDate"]
      return this.$moment(selectedDate[0]).format(FORMATS.date)
    },
    dateEnd() {
      const selectedDate = this.$store.getters["panel/selectedDate"]
      return this.$moment(selectedDate[1]).format(FORMATS.date)
    },
    percentReady() {
      if (this.widget.customDate)
        return this.panelStatsPercentReady
      return this.widgetStatsPercentReady
    },

    /* Panel Stats */
    panelStats() {
      return this.$store.getters["panel/getCurrentPanelStats"]
    },
    panelStatsReady() {
      return this.panelStats && this.panelStats.percent_ready >= 1
    },
    panelStatsPercentReady() {
      if (!this.panelStats || !this.panelStats.percent_ready)
        return 0
      return parseInt(this.panelStats.percent_ready * 100)
    },

    /* Widget Stats */
    widgetStats() {
      return this.$store.getters["panel/getWidgetStatsByIds"](this.panelId, this.widget.id)
    },
    widgetStatsReady() {
      if (this.widget.customDate)
        return this.panelStatsReady
      let percent_ready = (this.stats && this.stats.percent_ready) || (this.widgetStats && this.widgetStats.percent_ready) || 0
      return percent_ready >= 1
    },
    widgetStatsPercentReady() {
      if (!this.widgetStats || !this.widgetStats.percent_ready)
        return 0
      return parseInt(this.widgetStats.percent_ready * 100)
    },

    /* Widget */
    customDate() {
      return this.widget.customDate
    },

    /* Stats to be used by component */
    stats() {
      if (this.widget.customDate)
        return this.panelStats.stats_aggregated
      return this.widgetStats.stats_aggregated
    },
    statsList() {
      if (this.widget.customDate)
        return this.panelStats.stats_list
      return this.widgetStats.stats_list
    },
    compareStats() {
      return this.widgetStats.compare_stats_aggregated
    },
    compareStatsList() {
      return this.widgetStats.compare_stats_list
    },

    /* Default Metrics */
    earn() {
      return this.isReady ? this.formatCurrency(this.stats.earn, this.stats.currency_symbol) : 0
    },
    spend() {
      return this.isReady ? this.formatCurrency(this.stats.spend, this.stats.currency_symbol) : 0
    },
    revenue() {
      return this.isReady ? this.formatCurrency(this.stats.revenue, this.stats.currency_symbol) : 0
    },
    roi() {
      return this.isReady ? this.formatPercentage(this.stats.roi, true, 0, "%") : 0
    },

    /* Default Metrics (Comparison) */
    earn2() {
      return this.isCompareReady ? this.formatCurrency(this.compareStats.earn, this.compareStats.currency_symbol) : 0
    },
    spend2() {
      return this.isCompareReady ? this.formatCurrency(this.compareStats.spend, this.compareStats.currency_symbol) : 0
    },
    revenue2() {
      return this.isCompareReady ? this.formatCurrency(this.compareStats.revenue, this.compareStats.currency_symbol) : 0
    },
    roi2() {
      return this.isCompareReady ? this.formatPercentage(this.compareStats.roi, true, 0, "%") : 0
    }
  },
  watch: {
    panelStatsPercentReady(newVal, oldVal) {
      // eslint-disable-next-line no-console
      console.debug("panelStatsPercentReady", newVal, oldVal, this.widget.id)
      if (newVal >= 95 && !this.widgetStatsReady && !this.isCreating)
        this.fetchSingleWidgetStats()
    }
  },
  beforeDestroy() {
    if (this.timeout !== null)
      clearTimeout(this.timeout)
    this.timeout = null
    if (this.cancelSource)
      this.cancelSource.cancel(CANCELLED_BY_USER)
  },
  methods: {
    async fetchSingleWidgetStats() {
      // eslint-disable-next-line no-console
      console.debug("fetchSingleWidgetStats!", this.widget.id)

      this.cancelSource = CancelToken.source()
      const panelId = this.panelId,
        widgetId = this.widget.id,
        cancelToken = this.cancelSource.token,
        data = {
          date_start: this.dateStart,
          date_end: this.dateEnd
        }
      await this.$store.dispatch("panel/fetchSingleWidgetStats", {
        panelId, widgetId, data, cancelToken
      })
        .then((widgetStats) => {

          this.$store.commit("panel/SET_PANEL_WIDGET_STATS", {
            panelId, widgetId, widgetStats
          })
          if (widgetStats.percent_ready < 1) {
            this.timeout = setTimeout(this.fetchSingleWidgetStats, this.fetchStatsInterval)
            this.fetchStatsInterval += 3000
          }
        })
    }
  }
}
</script>