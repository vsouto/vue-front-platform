<script>
import i18n from "@/i18n"
import BaseColumn from "@/components/tables/BaseColumn"

export default {
  sortable: true,
  extends: BaseColumn,
  prop: "spend",
  label: i18n.tc("currency.spend"),
  formatType: "money"
}
</script>