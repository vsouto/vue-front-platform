import { deepCopy } from "@/utils"
import TestStats from "@/models/testStats"
import { isEmptyObject } from "@/utils/index"

export default class WidgetStatsModel {
  constructor(widget, { widgetStats, panelStats }) {
    this.id = widget.id
    this.compare_id = widget.compare_id

    if (panelStats)
      this.setupFromPanelStats(widget, panelStats)
    else if (widgetStats)
      this.setup(widgetStats)
  }

  clone() {
    return deepCopy(this)
  }

  /**
   * Setup widget stats from panelStats
   * @param  {WidgetModel} widget
   * @param  {PanelStatsModel} panelStats
   *
   */
  setupFromPanelStats(widget, panelStats) {
    this.setup()
    this.panel_id = panelStats.id

    if (!panelStats || !panelStats.stats_list || !panelStats.stats_aggregated)
      return

    if (widget.customDate) {
      // If customDate, stats will be loaded from panelStats
      this.percent_ready = panelStats.percent_ready
    } else {
      // Else, get panel stats by widget dates
      if (widget.dates)
        this.stats_list = panelStats.stats_list.filter(s => widget.dates.includes(s.date))
      if (this.stats_list.length == 1)
        this.stats_aggregated = this.stats_list[0]

      if (widget.compareDates)
        this.compare_stats_list = panelStats.stats_list.filter(s => widget.compareDates.includes(s.date))
      if (this.compare_stats_list.length == 1)
        this.compare_stats_aggregated = this.compare_stats_list[0]

      if (panelStats.creating) {
        if (isEmptyObject(this.stats_aggregated))
          this.stats_aggregated = TestStats.randomPick(panelStats.stats_list)
        if (isEmptyObject(this.compare_stats_aggregated))
          this.compare_stats_aggregated = TestStats.randomPick(panelStats.stats_list)
      }

      this.updatePercentReady()
    }
  }

  /**
   * Setup widget stats
   * @param  {Object} stats
   *
   */
  setup(stats={}) {
    this.stats_list = stats.stats_list || []
    this.stats_aggregated = stats.stats_aggregated || {}
    this.compare_stats_list = stats.compare_stats_list || []
    this.compare_stats_aggregated = stats.compare_stats_aggregated || {}
    this.percent_ready = stats.percent_ready || 0
    this.compare_percent_ready = stats.compare_percent_ready || 0
  }

  /**
   * Sets percent readiness
   * 1. Sets from aggregated
   * 2. Else: sets based on stats_list
   *
   */
  updatePercentReady() {
    let stats_ready = 0,
      stats_count = this.stats_list.length

    this.percent_ready = this.stats_aggregated.percent_ready || 0
    this.compare_percent_ready = this.compare_stats_aggregated.percent_ready || 0

    if (stats_count == 0)
      return

    if (this.percent_ready === 0) {
      this.stats_list.map(s => {
        if (s.percent_ready === 1)
          stats_ready +=1
      })
      this.percent_ready = parseFloat(stats_ready / stats_count)
    }

    if (this.compare_percent_ready === 0) {
      this.stats_list.map(s => {
        if (s.percent_ready === 1)
          stats_ready +=1
      })
      this.percent_ready = parseFloat(stats_ready / stats_count)
    }
  }

}
