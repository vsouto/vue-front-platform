<template>
  <data-tables
    :data="tableData"
    :table-props="{
      defaultSort: {prop: 'spend', order: 'descending'}
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
import { spend_platforms } from "@/platforms"

// Columns
const NameColumn = () => import("@/components/tables/NameColumn")
const SpendColumn = () => import("@/components/tables/SpendColumn")

export default {
  name: "PlatformsSpendTable",
  extends: BaseTable,
  data() {
    return {
      platforms: spend_platforms,
      tableColumns: [
        NameColumn,
        SpendColumn
      ]
    }
  }
}
</script>
