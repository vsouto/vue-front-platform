<template>
  <el-table-column
    :fixed="fixed"
    :prop="prop"
    :width="width"
    :label="label"
    :show-overflow-tooltip="tooltip"
  >
    <template slot-scope="props">
      <bid-amount-row-cell
        :index="props.$index"
        :row="props.row"
        :callback="updateBidAmount"
        :formatted-value="getValue(props.row)"
        :format-currency="formatCurrency"
      />
    </template>
  </el-table-column>
</template>

<script>
import i18n from "@/i18n"
import BaseColumn from "@/facebook_ads/components/columns/BaseColumn"
import BidAmountRowCell from "@/facebook_ads/components/BidAmountRowCell"
import { success, error } from "@/constants/notifications"
export default {
  prop: "bid_amount",
  label: i18n.tc("facebook_ads.bid_amount"),
  formatType: "money_nocomma",
  components: {
    BidAmountRowCell
  },
  extends: BaseColumn,
  data() {
    this.prop = this.$options.prop
    this.label = this.$options.label
    this.tooltip = false
    this.fixed = false
    this.width = null
    return {}
  },
  methods: {
    updateBidAmount(newVal, row) {
      return this.$store
        .dispatch("facebookAds/updateAdset", {
          profile_id: row.profile_id,
          account_id: row.account_id,
          adset_id: row.id,
          adset: {
            bid_amount: newVal
          },
          widgetName: this.tableName
        })
        .then(() => {
          this.$notify(success.updateAdset)
        })
        .catch(() => {
          this.$notify(error.updateAdset)
        })
    }
  }
}
</script>
