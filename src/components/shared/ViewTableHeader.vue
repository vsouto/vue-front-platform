<template>
  <el-row
    slot="header"
    class="p-0 m-0"
  >
    <el-col :span="24">
      <h6
        v-if="title"
      >
        {{ title }}
      </h6>
      <!-- <base-input
        v-if="canSearch"
        class="pull-right"
      >
        <el-input
          :value="searchQuery"
          type="search"
          class="mb-3 search-input"
          clearable
          prefix-icon="el-icon-search"
          :placeholder="$t('table.search')"
          aria-controls="datatables"
          @input="$emit('update-search-query', $event)"
        />
      </base-input> -->
    </el-col>
  </el-row>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    canSearch: {
      type: Boolean,
      default: false
    }
  }
}
</script>
