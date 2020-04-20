<template>
  <el-tooltip
    :content="title || defaultTitle"
    class="item"
    effect="dark"
    placement="top-start"
  >
    <base-button
      :loading="loading"
      :size="size"
      icon
      round
      type="info"
      :class="`btn-size-${size}`"
    >
      <refresh-icon
        :class="{
          'icon-2x': size == '',
          'icon-15x': size == 'sm',
          '': size == 'xs',
        }"
        :title="title || defaultTitle"
      />
    </base-button>
  </el-tooltip>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    loading:{
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ""
    }
  },
  computed: {
    defaultTitle() {
      return this.$t("common.refresh")
    }
  }
}
</script>

<style scoped>
.btn-size-xs {
  width: 1.4rem;
  height: 1.4rem;
  min-width: 1.4rem;
  min-height: 1.4rem;
}
</style>