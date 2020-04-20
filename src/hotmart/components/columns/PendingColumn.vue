<template>
  <el-table-column
    :fixed="fixed"
    :prop="prop"
    :width="width"
    :label="label"
    :show-overflow-tooltip="tooltip"
  >
    <template slot-scope="props">
      {{ formatCurrency(props.row.printed_billet_value, props.row) }}
      <badge>
        {{ props.row.printed_billet_count }}
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
  label: i18n.tc("hotmart.pending"),
  data() {
    this.prop = this.$options.prop
    this.label = this.$options.label
    return {}
  }
}
</script>
