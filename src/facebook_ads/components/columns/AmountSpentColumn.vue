<script>
import i18n from "@/i18n"
import BaseColumn from "@/facebook_ads/components/columns/BaseColumn"

export default {
  extends: BaseColumn,
  prop: "amount_spent",
  label: i18n.tc("facebook_ads.amount_spent"),
  formatType: "money_nocomma"
}
</script>