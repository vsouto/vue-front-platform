<template>
  <el-table-column
    prop="currency"
    :width="100"
  >
    <template slot="header">
      {{ $t('currency.currency') }}
    </template>
    <template slot-scope="props">
      <slot>
        {{ props.row.currency }}
      </slot>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "CurrencyCodeTableColumn",
}
</script>
