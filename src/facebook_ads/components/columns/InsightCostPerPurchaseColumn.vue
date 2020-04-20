<script>
import i18n from "@/i18n"
import BaseColumn from "@/facebook_ads/components/columns/BaseColumn"

export default {
  extends: BaseColumn,
  prop: "offsite_conversion.fb_pixel_purchase",
  label: i18n.tc("common.cost_per") + i18n.tc("facebook_ads.purchases"),
  methods: {
    getValue(row) {
      let value = this.getActionValue(row, "cost_per_action_type")
      return this.formatCurrency(value, row, 5)
    },
  }
}
</script>