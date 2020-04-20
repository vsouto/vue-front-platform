<template>
  <el-table-column
    :fixed="fixed"
    :prop="prop"
    :width="width"
    :label="label"
    :show-overflow-tooltip="tooltip"
    :sortable="sortable"
  >
    <template slot-scope="props">
      {{ formatCurrency(props.row.earn, props.row) }}
      <badge>
        {{ props.row.sales }}
      </badge>
    </template>
  </el-table-column>
</template>

<script>
import i18n from "@/i18n"
import BaseColumn from "@/hotmart/components/columns/BaseColumn"
export default {
  extends: BaseColumn,
  prop: "earn",
  label: i18n.tc("currency.earn"),
  data() {
    this.prop = this.$options.prop
    this.label = this.$options.label
    this.sortable = true
    return {}
  }
}
</script>
