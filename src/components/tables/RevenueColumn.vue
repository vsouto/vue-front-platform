<script>
import i18n from "@/i18n"
import BaseColumn from "@/components/tables/BaseColumn"

export default {
  sortable: true,
  extends: BaseColumn,
  prop: "revenue",
  label: i18n.tc("metrics.revenue"),
  formatType: "money"
}
</script>