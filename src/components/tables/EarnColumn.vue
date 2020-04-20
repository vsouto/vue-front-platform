<script>
import i18n from "@/i18n"
import BaseColumn from "@/components/tables/BaseColumn"

export default {
  sortable: true,
  extends: BaseColumn,
  prop: "earn",
  label: i18n.tc("currency.earn"),
  formatType: "money"
}
</script>