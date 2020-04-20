<template>
  <div>
    <el-tooltip
      :content="$t('facebook_ads.cpc')"
      class="item"
      effect="dark"
      placement="top-start"
    >
      <span class="mr-2">
        <currency-usd-icon class="text-muted mr-n1" />
        {{ formattedValue }}
      </span>
    </el-tooltip>
  </div>
</template>

<script>
import CurrencyUsdIcon from "icons/CurrencyUsd.vue"
export default {
  components: {
    CurrencyUsdIcon
  },
  props: {
    row: {
      type: Object,
      required: true
    },
    getRowActionListValue: {
      type: Function,
      required: true
    },
    formatCurrency: {
      type: Function,
      required: true
    }
  },
  computed: {
    formattedValue() {
      return this.formatCurrency(
        this.getRowActionListValue(this.row, "cost_per_outbound_click"), this.row.currency_symbol
      )
    }
  }
}
</script>
