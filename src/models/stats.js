import { moment } from "@/constants/dates"
import FORMATS from "@/constants/formats"
import { all_platforms, spend_platforms, earn_platforms } from "@/platforms"
import TestStats from "@/models/testStats"
import { calculateROI, deepCopy } from "@/utils"
import { isArray } from "util"

export default class StatsModel {
  constructor(stats={}, generateTestStats=false) {

    this.earn = stats.earn || 0
    this.spend = stats.spend || 0
    this.revenue = stats.revenue || 0
    this.roi = stats.roi || 0

    this.id = stats.id
    this.name = stats.name
    this.date = stats.date
    this.currency = stats.currency
    this.currency_symbol = stats.currency_symbol
    this.platforms = stats.platforms || {}
    this.percent_ready = stats.percent_ready || 0

    this.setPlatforms(this.platforms, generateTestStats)
    if (generateTestStats)
      this.generateTestStats(stats, false)
  }
  clone() {
    return deepCopy(this)
  }
  setPlatforms(platforms, generateTestStats) {
    all_platforms.map(platform => {
      let platformStats = platforms[platform.id]
      if (generateTestStats)
        this.platforms[platform.id] = [
          new platform.statsModel(platformStats, generateTestStats),
          new platform.statsModel(platformStats, generateTestStats),
          new platform.statsModel(platformStats, generateTestStats),
          new platform.statsModel(platformStats, generateTestStats),
          new platform.statsModel(platformStats, generateTestStats),
        ]
      else if (isArray(platformStats))
        this.platforms[platform.id] = platformStats.map(ps => new platform.statsModel(ps))
    })
    this.earnPlatforms = this.getEarnPlatforms()
    this.spendPlatforms = this.getSpendPlatforms()
  }
  getEarnPlatforms() {
    return earn_platforms.filter(platform => {
      return this.platforms[platform.id]
    })
  }
  getSpendPlatforms() {
    return spend_platforms.filter(platform => {
      return this.platforms[platform.id]
    })
  }
  getMetric(platform, metric) {
    return this.platforms[platform.id] && this.platforms[platform.id][metric]
  }
  getEarn(platform) {
    return this.getMetric(platform, "earn") || 0
  }
  getSpend(platform) {
    return this.getMetric(platform, "spend") || 0
  }
  getDateObj() {
    return moment(this.date, FORMATS.date)
  }
  generateTestStats(o={}) {
    this.id = o.id || TestStats.randomNumber()
    this.name = o.name || TestStats.randomName()
    this.earn = o.earn || TestStats.financeAmount()
    this.spend = o.spend || TestStats.financeAmount()
    this.revenue = o.revenue || this.earn - this.spend
    this.roi = o.roi || calculateROI(this.earn, this.spend)
  }
}
