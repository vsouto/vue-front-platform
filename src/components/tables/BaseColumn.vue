<template>
  <el-table-column
    :fixed="fixed"
    :prop="prop"
    :width="width"
    :label="label"
    :sortable="sortable"
    :show-overflow-tooltip="tooltip"
  >
    <template slot-scope="props">
      {{ getValue(props.row) }}
    </template>
  </el-table-column>
</template>
<script>
import i18n from "@/i18n"
import {
  formatCurrency,
  formatFloat,
  formatPercentage,
  formatHumanizedDate
} from "@/utils/formatters"
export default {
  prop: "name",
  label: i18n.tc("common.name"),
  data() {
    this.prop = this.$options.prop
    this.label = this.$options.label
    this.tooltip = this.$options.tooltip || false
    this.width = this.$options.widget || undefined
    this.fixed = this.$options.fixed || false
    this.sortable = this.$options.sortable || false
    this.formatType = this.$options.formatType || undefined
    return {}
  },
  methods: {
    getValue(row) {
      let value = row[this.prop]
      if (this.formatType == "money_nocomma")
        return this.formatCurrency(parseInt(value) / 100, row)
      if (this.formatType == "money")
        return this.formatCurrency(value, row)
      if (this.formatType == "float")
        return this.formatFloat(value)
      if (this.formatType == "percentage")
        return this.formatPercentage(this.formatFloat(value))
      if (this.formatType == "datetime_humanized")
        return this.formatHumanized(value)
      return value
    },
    formatCurrency(value, row, precision = 2) {
      return formatCurrency(value, row.currency || row.currency_symbol, precision)
    },
    formatFloat(value, precision = 2) {
      return formatFloat(value, precision)
    },
    formatPercentage(value, precision = 2, symbol = true) {
      return formatPercentage(value, false, precision, symbol)
    },
    formatHumanized(datetime) {
      if (!this.$moment.isMoment(datetime))
        datetime = this.$moment(datetime)
      return formatHumanizedDate(datetime)
    }
  }
}
</script>