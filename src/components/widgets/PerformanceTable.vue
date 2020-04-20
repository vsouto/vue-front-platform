<template>
  <data-tables
    :data="tableData"
    :table-props="{
      defaultSort: {prop: 'revenue', order: 'descending'}
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

// Columns
const NameColumn = () => import("@/components/tables/NameColumn")
const SpendColumn = () => import("@/components/tables/SpendColumn")
const EarnColumn = () => import("@/components/tables/EarnColumn")
const RevenueColumn = () => import("@/components/tables/RevenueColumn")
const RoiColumn = () => import("@/components/tables/RoiColumn")

export default {
  extends: BaseTable,
  data() {
    return {
      tableColumns: [
        NameColumn,
        SpendColumn,
        EarnColumn,
        RevenueColumn,
        RoiColumn
      ]
    }
  },
  computed: {
    tableData() {
      return this.dataList
    },
  }
}
</script>
