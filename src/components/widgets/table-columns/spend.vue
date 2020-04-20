<template>
  <el-table-column
    :sortable="true"
    prop="spend"
    :width="130"
    :label="$t('currency.spend')"
    label-class-name="text-warning"
  >
    <!-- <template slot="header">
      <el-tooltip
        :content="$t('currency.spent')"
        class="item"
        effect="dark"
        placement="top-start"
      >
        <span>
          <currency-usd-icon class="icon-15x mr-n1 text-warning" />
          <transfer-right-icon class="icon-15x text-warning" />
        </span>
      </el-tooltip>
    </template> -->
    <template slot-scope="props">
      <slot>
        {{ formatCurrency(props.row.spend, props.row.currency_symbol) }}
      </slot>
    </template>
  </el-table-column>
</template>
<script>

// Icons
// import CurrencyUsdIcon from "icons/CurrencyUsd.vue"
// import TransferRightIcon from "icons/TransferRight.vue"

// Mixins
import FormattersMixin from "@/components/shared/mixins/FormattersMixin"

export default {
  name: "SpendTableColumn",
  components: {
    // CurrencyUsdIcon,
    // TransferRightIcon
  },
  mixins: [FormattersMixin]
}
</script>
