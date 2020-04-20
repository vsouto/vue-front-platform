<script>
import i18n from "@/i18n"
import { success, error } from "@/constants/notifications"
import CampaignDailyBudgetColumn from "@/facebook_ads/components/columns/CampaignDailyBudgetColumn"
export default {
  prop: "daily_budget",
  label: i18n.tc("facebook_ads.daily_budget"),
  formatType: "money_nocomma",
  extends: CampaignDailyBudgetColumn,
  methods: {
    updateDailyBudget(newVal, row) {
      return this.$store
        .dispatch("facebookAds/updateAdset", {
          profile_id: row.profile_id,
          account_id: row.account_id,
          adset_id: row.id,
          adset: {
            daily_budget: newVal
          },
          widgetName: this.tableName
        })
        .then(() => {
          this.$notify(success.updateAdset)
        })
        .catch(() => {
          this.$notify(error.updateAdset)
        })
    },
  }
}
</script>
