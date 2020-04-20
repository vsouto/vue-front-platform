import { convertCurrency, getRoiVariant, getRevenueVariant } from "@/utils"
import {
  formatCurrency,
  formatInteger,
  formatFloat,
  formatPercentage,
  formatDate,
  formatDatetime,
  formatDayMonth,
  formatHumanizedDate
} from "@/utils/formatters"
import moment from "moment-timezone"

export default {
  computed: {
    currencyRates() {
      return this.$store.getters["account/currencyRates"]
    },
    frontendCurrency() {
      return this.$store.getters["account/frontendCurrency"]
    }
  },
  methods: {
    formatCurrency(v, symbol = "", precision = 2) {
      return formatCurrency(v, symbol, precision)
    },
    formatPercentage(v, multiplyPercent = false, precision = 0, symbol = false) {
      return formatPercentage(v, multiplyPercent, precision, symbol)
    },
    formatInteger(v) {
      return formatInteger(v)
    },
    formatFloat(v, precision = 2) {
      return formatFloat(v, precision)
    },
    formatDate(v) {
      return formatDate(v)
    },
    formatDatetime(v) {
      return formatDatetime(v)
    },
    formatDayMonth(v) {
      return formatDayMonth(v)
    },
    formatHumanized(datetime) {
      if (!moment.isMoment(datetime))
        datetime = moment(datetime)
      return formatHumanizedDate(datetime)
    },
    convertCurrency(value, from, to) {
      if (from != to) {
        const rate = this.currencyRates[`${from.toUpperCase()}x${to.toUpperCase()}`]
        if (rate) return convertCurrency(value, rate)
      }
      return value
    },
    getRoiVariant(value) {
      return getRoiVariant(value)
    },
    getRevenueVariant(value) {
      return getRevenueVariant(value)
    }
  },
}