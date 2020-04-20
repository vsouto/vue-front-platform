import PlatformStatsModel from "@/models/platformStats"
import Platform from "@/google_ads"

export default class GoogleAdsStatsModel extends PlatformStatsModel {
  constructor(stats={}, generateTestStats=false) {
    super(Platform.id, stats, generateTestStats)
  }

  updateFromObject(o) {
    super.updateFromObject(o)

    // TODO: adwords stats attributes
    this.currency = o.currency || "BRL"
    this.currency_symbol = o.currency_symbol || "R$"
  }

  /**
   * Check PlatformStatsModel generateTestStats method
   * to see default fieldTypes not implemented here.
   */
  generateTestStats() {

    // TODO: adwords stats attributes
    const fieldTypes = []
    super.generateTestStats(fieldTypes)
  }
}
