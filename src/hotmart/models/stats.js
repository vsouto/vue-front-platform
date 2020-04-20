import PlatformStatsModel from "@/models/platformStats"
import Platform from "@/hotmart"
import TestStats from "@/models/testStats"

export default class HotmartStatsModel extends PlatformStatsModel {
  constructor(stats={}, generateTestStats=false) {
    super(Platform.id, stats, generateTestStats)
  }

  updateFromObject(o) {
    super.updateFromObject(o)

    this.balance_hotmart_earn = o.balance_hotmart_earn
    this.balance_hotmart_sales = o.balance_hotmart_sales
    this.billet_earn = o.billet_earn
    this.billet_sales = o.billet_sales
    this.blocked_count = o.blocked_count
    this.blocked_value = o.blocked_value
    this.cancelled_count = o.cancelled_count
    this.cancelled_value = o.cancelled_value
    this.cash_payment_earn = o.cash_payment_earn
    this.cash_payment_sales = o.cash_payment_sales
    this.chargeback_count = o.chargeback_count
    this.chargeback_value = o.chargeback_value
    this.credit_card_earn = o.credit_card_earn
    this.credit_card_sales = o.credit_card_sales
    this.debit_earn = o.debit_earn
    this.debit_sales = o.debit_sales
    this.echeck_earn = o.echeck_earn
    this.echeck_sales = o.echeck_sales
    this.instant_earn = o.instant_earn
    this.instant_sales = o.instant_sales
    this.overdue_count = o.overdue_count
    this.overdue_value = o.overdue_value
    this.paypal_earn = o.paypal_earn
    this.paypal_sales = o.paypal_sales
    this.pre_order_count = o.pre_order_count
    this.pre_order_value = o.pre_order_value
    this.printed_billet_count = o.printed_billet_count
    this.printed_billet_value = o.printed_billet_value
    this.processing_transaction_count = o.processing_transaction_count
    this.processing_transaction_value = o.processing_transaction_value
    this.protested_count = o.protested_count
    this.protested_value = o.protested_value
    this.refunded_count = o.refunded_count
    this.refunded_value = o.refunded_value
    this.sales = o.sales
    this.started_count = o.started_count
    this.started_value = o.started_value
    this.under_analisys_count = o.under_analisys_count
    this.under_analisys_value = o.under_analisys_value
    this.waiting_payment_count = o.waiting_payment_count
    this.waiting_payment_value = o.waiting_payment_value
  }

  /**
   * Check PlatformStatsModel generateTestStats method
   * to see default fieldTypes not implemented here.
   */
  generateTestStats() {
    const fieldTypes = [
      {field: "balance_hotmart_earn", method: "financeAmount"},
      {field: "balance_hotmart_sales", method: "randomNumber"},
      {field: "billet_earn", method: "financeAmount"},
      {field: "billet_sales", method: "randomNumber"},
      {field: "cash_payment_earn", method: "financeAmount"},
      {field: "cash_payment_sales", method: "randomNumber"},
      {field: "credit_card_earn", method: "financeAmount"},
      {field: "credit_card_sales", method: "randomNumber"},
      {field: "debit_earn", method: "financeAmount"},
      {field: "debit_sales", method: "randomNumber"},
      {field: "echeck_earn", method: "financeAmount"},
      {field: "echeck_sales", method: "randomNumber"},
      {field: "instant_earn", method: "financeAmount"},
      {field: "instant_sales", method: "randomNumber"},
      {field: "paypal_earn", method: "financeAmount"},
      {field: "paypal_sales", method: "randomNumber"},

      {field: "printed_billet_count", method: "zeroToTen"},
      {field: "processing_transaction_count", method: "zeroToTen"},
      {field: "blocked_count", method: "zeroToTen"},
      {field: "cancelled_count", method: "zeroToTen"},
      {field: "chargeback_count", method: "zeroToTen"},
      {field: "overdue_count", method: "zeroToTen"},
      {field: "pre_order_count", method: "zeroToTen"},
      {field: "protested_count", method: "zeroToTen"},
      {field: "refunded_count", method: "zeroToTen"},
      {field: "started_count", method: "zeroToTen"},
      {field: "under_analisys_count", method: "zeroToTen"},
      {field: "waiting_payment_count", method: "zeroToTen"},
    ]
    super.generateTestStats(fieldTypes)

    this.sales = this.balance_hotmart_sales + this.billet_sales + this.cash_payment_sales + this.credit_card_sales + this.debit_sales + this.echeck_sales + this.instant_sales + this.paypal_sales
    this.printed_billet_value = this.printed_billet_count * TestStats.financeAmount()
    this.processing_transaction_value = this.processing_transaction_count * TestStats.financeAmount()
    this.blocked_value = this.blocked_count * TestStats.financeAmount()
    this.cancelled_value = this.cancelled_count * TestStats.financeAmount()
    this.chargeback_value = this.chargeback_count * TestStats.financeAmount()
    this.overdue_value = this.overdue_count * TestStats.financeAmount()
    this.pre_order_value = this.pre_order_count * TestStats.financeAmount()
    this.protested_value = this.protested_count * TestStats.financeAmount()
    this.refunded_value = this.refunded_count * TestStats.financeAmount()
    this.started_value = this.started_count * TestStats.financeAmount()
    this.under_analisys_value = this.under_analisys_count * TestStats.financeAmount()
    this.waiting_payment_value = this.waiting_payment_count * TestStats.financeAmount()
  }

}