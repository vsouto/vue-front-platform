<template>
  <div>
    <el-tooltip
      :content="$t('facebook_ads.clicks')"
      class="item"
      effect="dark"
      placement="top-start"
    >
      <span class="mr-2">
        <cursor-default-click-icon class="text-muted mr-n1" />
        {{ getRowActionListValue(row, 'outbound_clicks') }}
      </span>
    </el-tooltip>
    <el-tooltip
      :content="$t('facebook_ads.cpc')"
      class="item"
      effect="dark"
      placement="top-start"
    >
      <span class="mr-2">
        <currency-usd-icon class="text-muted mr-n1" />
        {{ formatCurrency(getRowActionListValue(row, 'cost_per_outbound_click'), row.currency_symbol) }}
      </span>
    </el-tooltip>
    <el-tooltip
      :content="$t('facebook_ads.ctr')"
      class="item"
      effect="dark"
      placement="top-start"
    >
      <span>
        <percent-icon class="text-muted mr-n1" />
        {{ formatPercentage(getRowActionListValue(row, 'outbound_clicks_ctr'), row.currency_symbol) }}
      </span>
    </el-tooltip>
  </div>
</template>

<script>
import CursorDefaultClickIcon from "icons/CursorDefaultClick.vue"
import CurrencyUsdIcon from "icons/CurrencyUsd.vue"
import PercentIcon from "icons/Percent.vue"
export default {
  components: {
    CurrencyUsdIcon,
    CursorDefaultClickIcon,
    PercentIcon
  },
  props: {
    index: {
      type: Number,
      required: true
    },
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
    },
    formatPercentage: {
      type: Function,
      required: true
    }
  }
}
</script>
