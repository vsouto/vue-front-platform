<script>
import i18n from "@/i18n"
import BaseColumn from "@/google_ads/components/tables/BaseColumn"

export default {
  extends: BaseColumn,
  prop: "spend",
  label: i18n.tc("google_ads.spend"),
  formatType: "money"
}
</script>