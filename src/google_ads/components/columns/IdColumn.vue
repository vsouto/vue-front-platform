<script>
import BaseColumn from "@/google_ads/components/columns/BaseColumn"

export default {
  extends: BaseColumn,
  prop: "id",
  label: "ID",
  tooltip: true,
  required: true,
  fixed: true,
  width: 150
}
</script>
