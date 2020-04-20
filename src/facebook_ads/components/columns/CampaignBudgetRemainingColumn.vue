<script>
import i18n from "@/i18n"
import BaseColumn from "@/facebook_ads/components/columns/BaseColumn"

export default {
  extends: BaseColumn,
  prop: "budget_remaining",
  label: i18n.tc("facebook_ads.budget_remaining"),
  formatType: "money_nocomma"
}
</script>