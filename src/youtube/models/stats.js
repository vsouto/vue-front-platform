import TestStats from "@/models/testStats"

export default class YoutubeModel {
  constructor(stats={}, generateTestStats=false) {
    this.updateFromObject(stats)
    if (stats.earn === undefined && generateTestStats)
      this.generateTestStats()
  }
  clone() {
    return new YoutubeModel({
      ...this
    })
  }
  updateFromObject(o) {
    this.id = o.id
    this.name = o.name
    this.postback_type_code = o.postback_type_code

    this.sales = o.sales
    this.credit_card_earn = o.credit_card_earn
    this.credit_card_sales = o.credit_card_sales
    this.billet_earn = o.billet_earn
    this.billet_sales = o.billet_sales
    this.pending_count = o.pending_count
    this.pending_value = o.pending_value
    this.cancels_count = o.cancels_count
    this.cancels_value = o.cancels_value
    this.refunds_count = o.refunds_count
    this.refunds_value = o.refunds_value
    this.disputing_count = o.disputing_count
    this.disputing_value = o.disputing_value

    this.earn = o.earn || 0
    this.earn_currency = o.earn_currency || "BRL"
  }
  generateTestStats() {
    this.id = TestStats.randomNumber()
    this.name = TestStats.randomName()
    this.postback_type_code = TestStats.randomPick(["1","2","2","3","3","4","4","4","5","6","7"])

    this.credit_card_earn = TestStats.financeAmount()
    this.credit_card_sales = TestStats.randomNumber()
    this.billet_earn = TestStats.financeAmount()
    this.billet_sales = TestStats.randomNumber()
    this.sales = this.billet_sales + this.credit_card_sales

    this.pending_count = TestStats.zeroToTen()
    this.pending_value = this.pending_count * TestStats.financeAmount()
    this.cancels_count = TestStats.zeroToTen()
    this.cancels_value = this.cancels_count * TestStats.financeAmount()
    this.refunds_count = TestStats.zeroToTen()
    this.refunds_value = this.refunds_count * TestStats.financeAmount()
    this.disputing_count = TestStats.zeroToTen()
    this.disputing_value = this.disputing_count * TestStats.financeAmount()

    this.earn = TestStats.financeAmount()
  }
}
