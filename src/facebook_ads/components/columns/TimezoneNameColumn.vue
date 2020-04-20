<script>
import i18n from "@/i18n"
import BaseColumn from "@/facebook_ads/components/columns/BaseColumn"

export default {
  extends: BaseColumn,
  prop: "timezone_name",
  label: i18n.tc("facebook_ads.timezone_name"),
  tooltip: true,
  width: 100
}
</script>