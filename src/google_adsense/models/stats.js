import PlatformStatsModel from "@/models/platformStats"
import Platform from "@/google_adsense"

export default class GoogleAdsenseStatsModel extends PlatformStatsModel {
  constructor(stats={}, generateTestStats=false) {
    super(Platform.id, stats, generateTestStats)
  }

  updateFromObject(o) {
    super.updateFromObject(o)

    this.currency = o.currency || "USD"
    this.currency_symbol = o.currency_symbol || "$"

    this.clicks = o.clicks
    this.cost_per_click = o.cost_per_click
    this.page_views = o.page_views
    this.page_views_ctr = o.page_views_ctr
    this.page_views_rpm = o.page_views_rpm
  }

  /**
   * Check PlatformStatsModel generateTestStats method
   * to see default fieldTypes not implemented here.
   */
  generateTestStats() {
    const fieldTypes = [
      {field: "balance_hotmart_earn", method: "financeAmount"},
      {field: "clicks", method: "randomNumber"},
      {field: "cost_per_click", method: "financeAmount"},
      {field: "page_views", method: "randomNumber"},
      {field: "page_views_ctr", method: "percentage"},
      {field: "page_views_rpm", method: "financeAmount"},
    ]
    super.generateTestStats(fieldTypes)
  }

}
