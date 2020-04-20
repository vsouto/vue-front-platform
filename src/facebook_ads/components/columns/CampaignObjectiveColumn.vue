<script>
import i18n from "@/i18n"
import BaseColumn from "@/facebook_ads/components/columns/BaseColumn"

export default {
  extends: BaseColumn,
  prop: "objective",
  label: i18n.tc("facebook_ads.objective")
}
</script>