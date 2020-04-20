<template>
  <el-tooltip
    :content="$t('common.click_to_copy')"
    class="item"
    effect="dark"
    placement="top-start"
  >
    <base-button
      v-clipboard="value"
      icon
      round
      type="info"
    >
      <copy-icon
        class="icon-15x"
      />
    </base-button>
  </el-tooltip>
</template>
<script>
export default {
  name: "CopyClipboardButton",
  props: {
    value: {
      type: String,
      required: true
    }
  }
}
</script>