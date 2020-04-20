<script>
import { success, error } from "@/constants/notifications"
import CampaignStatusColumn from "@/facebook_ads/components/columns/CampaignStatusColumn"
export default {
  prop: "effective_status",
  label: "Status",
  required: true,
  order: -2,
  extends: CampaignStatusColumn,
  methods: {
    updateStatus(newVal, row) {
      return this.$store
        .dispatch("facebookAds/updateAd", {
          profile_id: row.profile_id,
          account_id: row.account_id,
          adset_id: row.id,
          adset: {
            status: newVal
          },
          widgetName: this.tableName
        })
        .then(() => {
          this.$notify(success.updateAd)
        })
        .catch(() => {
          this.$notify(error.updateAd)
        })
    }
  }
}
</script>
