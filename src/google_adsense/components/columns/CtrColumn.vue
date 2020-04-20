<script>
import i18n from "@/i18n"
import BaseColumn from "@/facebook_ads/components/columns/BaseColumn"

export default {
  extends: BaseColumn,
  prop: "page_views_ctr",
  label: i18n.tc("google_adsense.ctr"),
  formatType: "percentage"
}
</script>