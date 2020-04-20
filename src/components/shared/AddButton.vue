<template>
  <el-tooltip
    :disabled="tooltipDisabled"
    :content="tooltip || $t('common.add')"
    class="add-button"
    placement="top-start"
  >
    <div>
      <base-button
        :icon="icon"
        :simple="simple"
        :loading="loading"
        :size="size"
        :type="typeCpt"
        :block="block"
        :disabled="disabled"
      >
        <add-icon
          v-if="icon"
          :class="{
            'icon-2x': size == '',
            'icon-15x': size == 'sm',
          }"
          :title="title || $t('common.add')"
        />
        <span v-else>
          {{ title || $t("common.add") }}
        </span>
      </base-button>
    </div>
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
    block: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "primary"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    tooltipDisabled: {
      type: Boolean,
      default: false
    },
    tooltip: {
      type: String,
      default: null
    }
  },
  computed: {
    typeCpt() {
      if (this.disabled)
        return "secondary"
      return this.type
    }
  }
}
</script>

<style scoped>
.add-button {
  display: inline-block
}
</style>