<template>
  <el-tooltip
    v-if="isExpanded || hover"
    :content="text"
    effect="dark"
    placement="bottom"
  >
    <base-button
      class="minimize-sidebar animated fadeIn"
      icon
      link
      @click.native="toggleSidebar"
    >
      <menu-open-icon
        v-if="isExpanded"
        class="text-white icon-2x"
      />
      <menu-icon
        v-else
        class="text-white icon-2x"
      />
    </base-button>
  </el-tooltip>
</template>
<script>
import MenuIcon from "icons/Menu.vue"
import MenuOpenIcon from "icons/MenuOpen.vue"
export default {
  name: "SidebarToggleButton",
  components: {
    MenuIcon,
    MenuOpenIcon,
  },
  props: {
    initial: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isExpanded: this.initial
    }
  },
  computed: {
    text() {
      return this.isExpanded ? this.$t("common.minimize_menu") : this.$t("common.expand_menu")
    }
  },
  methods: {
    toggleSidebar() {
      this.isExpanded = !this.isExpanded
      this.$sidebar.toggleMinimize()
    }
  }
}
</script>
<style lang="scss" scoped>
button.btn.minimize-sidebar {
  height: 2.88rem;
  width: 2.88rem;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 5;
  .material-design-icon {
    margin: 0;
    padding: 0;
    /deep/ .material-design-icon__svg {
      width: 1.5rem !important;
      height: 1.5rem !important;
    }
  }
}
</style>
