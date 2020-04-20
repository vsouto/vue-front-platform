import TestStats from "@/models/testStats"
import { deepCopy } from "@/utils"

/**
 * Interface platform stats, to be implemented in each platform
 *
 * @interface
 */
export default class PlatformStatsModel {
  /**
   *
   * @param {String} platformId
   * @param {Object} stats
   * @param {Boolean} generateTestStats
   */
  constructor(platformId, stats, generateTestStats) {
    this.platformId = platformId
    this.updateFromObject(stats)

    if (stats.earn === undefined && generateTestStats)
      this.generateTestStats()
  }

  clone() {
    return deepCopy(this)
  }

  /**
   *
   * @param {Object} o
   */
  updateFromObject(o) {
    this.id = o.id
    this._id = o._id
    this.name = o.name || this.id

    this.earn = o.earn || 0
    this.spend = o.spend || 0
    this.currency = o.currency || ""
    this.currency_symbol = o.currency_symbol || ""
  }

  /**
   *
   * @param {Array<Object>} fieldTypes
   */
  generateTestStats(fieldTypes=[]) {
    const defaultFieldTypes = [
      {field: "id", method: "randomNumber"},
      {field: "name", method: "randomName"},
      {field: "earn", method: "financeAmount"},
      {field: "spend", method: "financeAmount"},
    ]
    for (let { field, method, params } of defaultFieldTypes) {
      this[field] = TestStats[method](params)
    }
    for (let { field, method, params } of fieldTypes) {
      this[field] = TestStats[method](params)
    }
  }
}