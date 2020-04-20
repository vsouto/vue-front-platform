<script>
import i18n from "@/i18n"
import BaseColumn from "@/facebook_ads/components/columns/BaseColumn"

export default {
  extends: BaseColumn,
  prop: "spend",
  label: i18n.tc("currency.spent"),
  formatType: "money"
}
</script>