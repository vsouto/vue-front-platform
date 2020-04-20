import TestStats from "@/models/testStats"
import StatsModel from "@/models/stats"
import DATES from "@/constants/dates"
import { deepCopy } from "@/utils"

export default class PanelStatsModel {

  constructor(panelStats={}) {
    this.id = panelStats.id
    this.creating = panelStats.creating
    this.error = panelStats.error
    if (this.creating)
      this.generateTestStats()
    else
      this.setStats(panelStats)
  }

  clone() {
    return deepCopy(this)
  }

  /**
   * Setups panel stats
   * @param  {Object} o
   * Panel Stats JSON
   *
   */
  setStats(o) {
    this.stats_list = o.stats_list ? o.stats_list.map(s => s instanceof StatsModel && s || new StatsModel(s)) : []
    this.stats_list = this.stats_list.sort((a, b) => a.date.localeCompare(b.date))
    this.stats_aggregated = new StatsModel(o.stats_aggregated)
    this.percent_ready = o.percent_ready || 0
  }

  /**
   * Is panel stats ready?
   * (All stats requested were returned and are fresh)
   *
   */
  isReady() {
    return this.percent_ready >= 1
  }

  /**
   * Is panel stats currently in synchronization?
   * (Stats are being generated in backend)
   *
   */
  isInSync() {
    return this.percent_ready < 1
  }

  /**
   * Generate random data
   *
   */
  generateTestStats(makeTestStats=true) {
    let dateList = DATES.makeList(DATES.last_30days_first_day, DATES.today)
    this.stats_list = dateList.map(date => {
      return new StatsModel({
        date: date,
        percent_ready: 1
      }, makeTestStats)
    })
    this.stats_aggregated = TestStats.randomPick(this.stats_list)
    this.percent_ready = 1
  }
}
