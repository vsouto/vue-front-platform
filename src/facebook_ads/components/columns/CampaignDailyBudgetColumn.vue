<template>
  <el-table-column
    :fixed="fixed"
    :prop="prop"
    :width="width"
    :label="label"
    :show-overflow-tooltip="tooltip"
  >
    <template slot-scope="props">
      <daily-budget-row-cell
        :index="props.$index"
        :row="props.row"
        :callback="updateDailyBudget"
        :formatted-value="getValue(props.row)"
        :format-currency="formatCurrency"
      />
    </template>
  </el-table-column>
</template>

<script>
import i18n from "@/i18n"
import BaseColumn from "@/facebook_ads/components/columns/BaseColumn"
import DailyBudgetRowCell from "@/facebook_ads/components/DailyBudgetRowCell"
import { success, error } from "@/constants/notifications"
export default {
  prop: "daily_budget",
  label: i18n.tc("facebook_ads.daily_budget"),
  formatType: "money_nocomma",
  components: {
    DailyBudgetRowCell,
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
    updateDailyBudget(newVal, row) {
      return this.$store
        .dispatch("facebookAds/updateCampaign", {
          profile_id: row.profile_id,
          account_id: row.account_id,
          campaign_id: row.id,
          campaign: {
            daily_budget: newVal
          },
          widgetName: this.tableName
        })
        .then(() => {
          this.$notify(success.updateCampaign)
        })
        .catch(() => {
          this.$notify(error.updateCampaign)
        })
    }
  }
}
</script>
