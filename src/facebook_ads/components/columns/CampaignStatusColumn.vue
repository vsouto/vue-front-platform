<template>
  <el-table-column
    :fixed="fixed"
    :prop="prop"
    :width="width"
    :label="label"
    :show-overflow-tooltip="tooltip"
  >
    <template slot-scope="props">
      <status-row-cell
        :index="props.$index"
        :row="props.row"
        :callback="updateStatus"
      />
    </template>
  </el-table-column>
</template>

<script>
import StatusRowCell from "@/facebook_ads/components/StatusRowCell"
import { success, error } from "@/constants/notifications"
export default {
  prop: "effective_status",
  label: "Status",
  required: true,
  order: -2,
  components: {
    StatusRowCell,
  },
  data() {
    this.prop = this.$options.prop
    this.label = this.$options.label
    this.tooltip = false
    this.fixed = true
    this.width = 65
    return {}
  },
  methods: {
    updateStatus(newVal, row) {
      return this.$store
        .dispatch("facebookAds/updateCampaign", {
          profile_id: row.profile_id,
          account_id: row.account_id,
          campaign_id: row.id,
          campaign: {
            status: newVal
          },
          widgetName: this.tableName
        })
        .then(() => {
          this.$notify(success.updateCampaign)
        })
        .catch(() => {
          this.$notify(error.updateCampaign)
        })
    },
  }
}
</script>
