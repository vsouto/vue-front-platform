import TestStats from "@/models/testStats"

export default class googleAnalyticsStatsModel {
  constructor(stats={}, generateTestStats=false) {
    this.updateFromObject(stats)
    if (stats.earn === undefined && generateTestStats)
      this.generateTestStats()
  }
  clone() {
    return new googleAnalyticsStatsModel({
      ...this
    })
  }
  updateFromObject(o) {
    this.id = o.id
    this.name = o.name

    this.earn = o.earn || 0
    this.earn_currency = o.earn_currency || "USD"
    this.clicks = o.clicks
    this.cost_per_click = o.cost_per_click
    this.page_views = o.page_views
    this.page_views_ctr = o.page_views_ctr
    this.page_views_rpm = o.page_views_rpm
  }
  generateTestStats() {
    this.id = TestStats.randomNumber()
    this.name = TestStats.randomName()
    this.earn = TestStats.financeAmount()

    this.clicks = TestStats.randomNumber()
    this.cost_per_click = TestStats.financeAmount()
    this.page_views = TestStats.randomNumber()
    this.page_views_ctr = TestStats.percentage()
    this.page_views_rpm = TestStats.financeAmount()
  }
}
