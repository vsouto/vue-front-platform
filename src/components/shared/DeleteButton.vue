<template>
  <el-tooltip
    :disabled="tooltipDisabled"
    :content="$t('common.delete')"
    class="item"
    effect="dark"
    placement="top-start"
  >
    <base-button
      :class="{
        'sm': size == 'sm',
      }"
      :loading="loading"
      :size="size"
      :link="icon == 'close'"
      class="delete-button"
      icon
      round
      type="danger"
    >
      <delete-icon
        v-if="icon == 'trash'"
        :class="{
          'icon-2x': size == '',
          'icon-15x': size == 'sm',
        }"
        :title="title || $t('common.delete')"
      />
      <close-circle-icon
        v-if="icon == 'close'"
        :class="{
          'icon-2x': size == '',
          'icon-15x': size == 'sm',
        }"
        :title="title || $t('common.delete')"
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
    },
    simple: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: "trash"
    },
    tooltipDisabled: {
      type: Boolean,
      default: false
    },
  }
}
</script>

<style lang="scss" scoped>
.delete-button {
  display: inline-block;
}
</style>