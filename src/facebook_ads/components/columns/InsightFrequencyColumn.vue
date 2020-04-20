<script>
import i18n from "@/i18n"
import BaseColumn from "@/facebook_ads/components/columns/BaseColumn"

export default {
  extends: BaseColumn,
  prop: "frequency",
  label: i18n.tc("facebook_ads.frequency"),
  formatType: "float"
}
</script>