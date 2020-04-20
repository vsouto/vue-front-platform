<script>
import i18n from "@/i18n"
import BaseColumn from "@/google_ads/components/columns/BaseColumn"

export default {
  extends: BaseColumn,
  prop: "name",
  label: i18n.tc("common.name"),
  tooltip: true,
  required: true,
  fixed: true,
  width: 200
}
</script>
