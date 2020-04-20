<script>
import i18n from "@/i18n"
import BaseColumn from "@/google_adsense/components/columns/BaseColumn"

export default {
  extends: BaseColumn,
  prop: "status",
  label: i18n.tc("common.status"),
  tooltip: true,
  required: true,
  fixed: true,
  width: 200
}
</script>
