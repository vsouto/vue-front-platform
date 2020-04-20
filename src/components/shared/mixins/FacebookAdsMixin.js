import { isArray } from "util"
import { formatCurrency } from "@/utils/formatters"

export default {
  methods: {
    getRowInsights(row) {
      return row.insights && row.insights.length > 0
        ? row.insights[0]
        : row.insights || {}
    },
    getRowActionCost(row, action_type, format = true) {
      const cost_per_action_type = this.getRowInsights(row).cost_per_action_type
      let value =
          cost_per_action_type &&
          cost_per_action_type
            .filter(a => {
              return a.action_type == action_type
            })
            .map(a => {
              return a.value
            })[0]
      if (value === undefined) {
        let actionValue = this.getRowActionValue(row, action_type),
          spend = this.getRowInsights(row).spend
        value = actionValue > 0 ? spend / actionValue : undefined
      }
      return value === undefined ? undefined : format ? formatCurrency(value, row.currency_symbol) : value
    },
    getRowActionValue(row, action_type) {
      const actions = this.getRowInsights(row).actions
      return (
        (actions &&
            actions
              .filter(a => {
                return a.action_type == action_type
              })
              .map(a => {
                return a.value
              })[0]) ||
          0
      )
    },
    getRowActionListValue(row, attrName) {
      let value =
          (this.getRowInsights(row)[attrName] &&
            this.getRowInsights(row)[attrName][0] &&
            this.getRowInsights(row)[attrName][0].value) ||
          0
      return value || 0
    },
    getInsightValue(row, attrName) {
      let value
      let insight = this.getRowInsights(row)
      if (insight) {
        value = insight[attrName]

        // some insights come in an array with one object (action_type, value)
        if (isArray(value) && value.length == 1) {
          value = value[0]
          if (value.value !== undefined) value = value.value
        }
      }
      return value
    },
    sortByInsight(a, b, attrName) {
      let valueA = parseFloat(this.getInsightValue(a, attrName)) || 0,
        valueB = parseFloat(this.getInsightValue(b, attrName)) || 0
      return valueA > valueB ? 1 : -1
    },
    sortByInsightAction(a, b, attrName) {
      let valueA = parseFloat(this.getRowActionValue(a, attrName)) || 0,
        valueB = parseFloat(this.getRowActionValue(b, attrName)) || 0
      return valueA > valueB ? 1 : -1
    },
    sortByInsightActionCost(a, b, attrName) {
      let valueA = parseFloat(this.getRowActionCost(a, attrName, false)) || 0,
        valueB = parseFloat(this.getRowActionCost(b, attrName, false)) || 0
        // console.debug(
        //   "sortByInsightActionCost",
        //   attrName,
        //   valueA,
        //   valueB,
        //   valueA > valueB
        // );
      return valueA > valueB ? 1 : -1
    },
    sortBySpend(a, b) {
      const attrName = "spend"
      return this.sortByInsight(a, b, attrName)
    },
    sortByClicks(a, b) {
      const attrName = "outbound_clicks"
      return this.sortByInsight(a, b, attrName)
    },
    sortByCPC(a, b) {
      const attrName = "cost_per_outbound_click"
      return this.sortByInsight(a, b, attrName)
    },
    sortByCTR(a, b) {
      const attrName = "outbound_clicks_ctr"
      return this.sortByInsight(a, b, attrName)
    },
    sortByCheckout(a, b) {
      const attrName = "offsite_conversion.fb_pixel_initiate_checkout"
      return this.sortByInsightAction(a, b, attrName)
    },
    sortByCostCheckout(a, b) {
      const attrName = "offsite_conversion.fb_pixel_initiate_checkout"
      return this.sortByInsightActionCost(a, b, attrName)
    },
    sortByPurchase(a, b) {
      const attrName = "offsite_conversion.fb_pixel_purchase"
      return this.sortByInsightAction(a, b, attrName)
    },
    sortByCostPurchase(a, b) {
      const attrName = "offsite_conversion.fb_pixel_purchase"
      return this.sortByInsightActionCost(a, b, attrName)
    },
  },
}