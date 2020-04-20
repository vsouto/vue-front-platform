import PlatformStatsModel from "@/models/platformStats"
import Platform from "@/monetizze"
import TestStats from "@/models/testStats"


export default class MonetizzeModel extends PlatformStatsModel {
  constructor(stats={}, generateTestStats=false) {
    super(Platform.id, stats, generateTestStats)
  }

  updateFromObject(o) {
    super.updateFromObject(o)

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
  }

  /**
   * Check PlatformStatsModel generateTestStats method
   * to see default fieldTypes not implemented here.
   */
  generateTestStats() {
    const fieldTypes = [
      {field: "postback_type_code", method: "randomPick", params: ["1","2","2","3","3","4","4","4","5","6","7"]},
      {field: "credit_card_earn", method: "financeAmount"},
      {field: "credit_card_sales", method: "randomNumber"},
      {field: "billet_earn", method: "financeAmount"},
      {field: "billet_sales", method: "randomNumber"},
      {field: "pending_count", method: "zeroToTen"},
      {field: "cancels_count", method: "zeroToTen"},
      {field: "refunds_count", method: "zeroToTen"},
      {field: "disputing_count", method: "zeroToTen"}
    ]
    super.generateTestStats(fieldTypes)

    this.pending_value = this.pending_count * TestStats.financeAmount()
    this.cancels_value = this.cancels_count * TestStats.financeAmount()
    this.refunds_value = this.refunds_count * TestStats.financeAmount()
    this.disputing_value = this.disputing_count * TestStats.financeAmount()
    this.sales = this.billet_sales + this.credit_card_sales
  }
}
