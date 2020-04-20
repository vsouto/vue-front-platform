<template>
  <el-tooltip
    :content="$t('common.go_back')"
    class="item"
    effect="dark"
    placement="top-start"
  >
    <base-button
      :type="type"
      icon
      round
      size="sm"
      class="btn-link"
      @click.native="goBack()"
    >
      <arrow-left-icon class="icon-15x" />
    </base-button>
  </el-tooltip>
</template>
<script>
import ArrowLeftIcon from "icons/ArrowLeft"
export default {
  components: {
    ArrowLeftIcon
  },
  props: {
    type: {
      type: String,
      default: "info"
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>