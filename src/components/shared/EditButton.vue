<template>
  <el-tooltip
    :disabled="tooltipDisabled"
    :content="$t('common.edit')"
    class="item"
    effect="dark"
    placement="top-start"
  >
    <base-button
      :class="{
        'sm': size == 'sm',
      }"
      :size="size"
      :link="icon"
      class="edit-button"
      icon
      round
      type="info"
    >
      <edit-icon
        :class="{
          'icon-2x': size == '',
          'icon-15x': size == 'sm',
        }"
        :title="$t('common.edit')"
      />
    </base-button>
  </el-tooltip>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: ""
    },
    icon: {
      type: Boolean,
      default: false
    },
    tooltipDisabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-button {
  display: inline-block;
}
</style>