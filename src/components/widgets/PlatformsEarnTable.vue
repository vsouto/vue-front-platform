<template>
  <data-tables
    :data="tableData"
    :table-props="{
      defaultSort: {prop: 'earn', order: 'descending'}
    }"
    :current-page="1"
    :page-size="5"
    :pagination-props="{ background: true, pageSizes: [5] }"
  >
    <!-- Custom Columns -->
    <component
      :is="column"
      v-for="column in tableColumns"
      :key="column.prop"
    />
  </data-tables>
</template>
<script>
import BaseTable from "@/components/widgets/BaseTable"
import { earn_platforms } from "@/platforms"

// Columns
const NameColumn = () => import("@/components/tables/NameColumn")
const EarnColumn = () => import("@/components/tables/EarnColumn")

export default {
  name: "PlatformsEarnTable",
  extends: BaseTable,
  data() {
    return {
      platforms: earn_platforms,
      tableColumns: [
        NameColumn,
        EarnColumn
      ]
    }
  }
}
</script>
