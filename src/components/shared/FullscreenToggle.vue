<template>
  <el-tooltip
    :content="fullscreen ? $t('common.exit_fullscreen') : $t('common.enter_fullscreen')"
    class="item"
    effect="dark"
    placement="top-start"
  >
    <base-button
      :type="type"
      icon
      round
      class="btn-link"
      size="sm"
      @click.native="toggleFullscreen()"
    >
      <fullscreen-icon
        v-if="!fullscreen"
        class="icon-15x"
      />
      <fullscreen-exit-icon
        v-else
        class="icon-15x"
      />
    </base-button>
  </el-tooltip>
</template>
<script>
import FullscreenIcon from "icons/Fullscreen"
import FullscreenExitIcon from "icons/FullscreenExit"
export default {
  components: {
    FullscreenIcon,
    FullscreenExitIcon
  },
  props: {
    element: {
      type: null,
      required: true
    },
    type: {
      type: String,
      default: "info"
    },
    startFullscreen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fullscreen: this.startFullscreen
    }
  },
  methods: {
    toggleFullscreen() {
      this.$fullscreen.toggle(this.element, {
        wrap: false,
        callback: this.fullscreenChange
      })
    },
    fullscreenChange(fullscreen) {
      this.fullscreen = fullscreen
    }
  }
}
</script>