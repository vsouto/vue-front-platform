<script>
import i18n from "@/i18n"
import BaseColumn from "@/facebook_ads/components/columns/BaseColumn"

export default {
  extends: BaseColumn,
  prop: "business_name",
  label: i18n.tc("facebook_ads.business"),
  tooltip: true,
  width: 200
}
</script>