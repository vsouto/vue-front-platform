<script>
import i18n from "@/i18n"
import BaseColumn from "@/components/tables/BaseColumn"

export default {
  sortable: true,
  extends: BaseColumn,
  prop: "roi",
  label: i18n.tc("metrics.roi"),
  formatType: "percentage"
}
</script>