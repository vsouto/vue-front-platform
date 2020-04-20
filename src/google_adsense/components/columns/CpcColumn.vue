<script>
import i18n from "@/i18n"
import BaseColumn from "@/facebook_ads/components/columns/BaseColumn"

export default {
  extends: BaseColumn,
  prop: "cost_per_click",
  label: i18n.tc("google_adsense.cpc"),
  formatType: "money"
}
</script>