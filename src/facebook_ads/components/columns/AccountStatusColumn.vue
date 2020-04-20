<template>
  <el-table-column
    :fixed="fixed"
    :prop="prop"
    :width="width"
    :label="label"
    :show-overflow-tooltip="tooltip"
  >
    <template slot-scope="props">
      <facebook-ads-account-status-icon
        :account-status="props.row.account_status"
        :disable-reason="props.row.disable_reason"
      />
    </template>
  </el-table-column>
</template>

<script>
import FacebookAdsAccountStatusIcon from "@/components/shared/FacebookAdsAccountStatusIcon"
import i18n from "@/i18n"
export default {
  prop: "account_status",
  label: i18n.tc("facebook_ads.account_status"),
  required: true,
  order: -2,
  components: {
    FacebookAdsAccountStatusIcon,
  },
  data() {
    this.prop = this.$options.prop
    this.label = this.$options.label
    this.tooltip = false
    this.fixed = true
    this.width = 65
    return {}
  }
}
</script>
