<template>
  <el-table-column
    :sortable="true"
    prop="earn"
    :label="$t('currency.earn')"
    label-class-name="text-success"
  >
    <!-- <template slot="header">
      <el-tooltip
        :content="$t('currency.earned')"
        class="item"
        effect="dark"
        placement="top-start"
      >
        <span>
          <currency-usd-icon class="icon-15x mr-n1 text-success" />
          <transfer-left-icon class="icon-15x text-success" />
        </span>
      </el-tooltip>
    </template> -->
    <template slot-scope="props">
      <slot>
        {{ formatCurrency(props.row.earn, props.row.currency_symbol) }}
      </slot>
    </template>
  </el-table-column>
</template>
<script>

// Icons
// import CurrencyUsdIcon from "icons/CurrencyUsd.vue"
// import TransferLeftIcon from "icons/TransferLeft.vue"

// Mixins
import FormattersMixin from "@/components/shared/mixins/FormattersMixin"

export default {
  name: "EarnTableColumn",
  components: {
    // CurrencyUsdIcon,
    // TransferLeftIcon
  },
  mixins: [FormattersMixin]
}
</script>
