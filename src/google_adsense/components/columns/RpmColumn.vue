<script>
import i18n from "@/i18n"
import BaseColumn from "@/facebook_ads/components/columns/BaseColumn"

export default {
  extends: BaseColumn,
  prop: "page_views_rpm",
  label: i18n.tc("google_adsense.rpm"),
  formatType: "money"
}
</script>