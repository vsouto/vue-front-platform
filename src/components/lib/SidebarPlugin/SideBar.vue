<template>
  <div
    class="sidebar"
    :class="{
      'auto-zindex': $sidebar.autoZIndex,
      'hide': $sidebar.hide
    }"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <div
      ref="sidebarScrollArea"
      class="sidebar-wrapper"
    >
      <sidebar-toggle-button
        v-if="false"
        :initial="false"
        :hover="hover"
      />

      <!-- Brand and Home -->
      <div class="sidebar-item home">
        <router-link
          class="main-nav"
          :to="{ name: 'Home' }"
        >
          <img
            v-if="!isExpanded"
            class="item-icon"
            src="/img/brand/painel-icon.svg"
          >
          <img
            v-else
            class="item-brand"
            src="/img/brand/logo-white-text.png"
          />
        </router-link>
      </div>

      <!-- Panels -->
      <div class="sidebar-item panel">
        <router-link
          class="main-nav"
          :to="{ name: 'Home' }"
        >
          <panel-icon
            class="icon-2x text-primary item-icon"
            title="Painéis"
          />
          <span
            v-if="isExpanded"
            class="item-text"
          >
            Painéis
          </span>
        </router-link>
        <div
          v-if="panels.length"
          class="children open"
        >
          <router-link
            v-for="panel in panels"
            :key="panel.id"
            class="child-nav"
            :to="{ name: 'Panel', params: { id: panel.id } }"
          >
            <span v-if="isExpanded">
              {{ panel.name.toLowerCase() }}
            </span>
            <span v-else>
              {{ makePrefix(panel.name.toLowerCase()) }}
            </span>
          </router-link>
        </div>
        <div class="new-panel">
          <span
            class="child-nav create-panel"
          >
            <new-panel-button
              :is-expanded="isExpanded"
            />
          </span>
        </div>
      </div>

      <!-- Platforms -->
      <div
        v-for="platform in platforms"
        :key="platform.id"
        :class="['sidebar-item platform', { 'platform-inactive' : isPlatformInactive(platform)}]"
      >
        <router-link
          :to="platform.home"
          class="main-nav"
        >
          <img
            :src="platform.icon"
            :alt="platform.name"
            class="platform-icon item-icon"
          />
          <span
            v-if="isExpanded"
            class="item-text"
          >
            {{ platform.name }}
          </span>
        </router-link>
        <base-button
          v-if="isExpanded && platform.views.length"
          class="expand-button"
          size="sm"
          icon
          link
          simple
          @click.native="togglePlatformChildren(platform.id)"
        >
          <dropdown-icon v-if="!platformChildOpened[platform.id]" />
          <up-icon v-else />
        </base-button>
        <div
          v-if="platform.views.length"
          class="children"
          :class="{'open': platformChildOpened[platform.id]}"
        >
          <router-link
            v-if="child.path"
            v-for="(child, index) in platform.views"
            :key="platform.id+index"
            class="child-nav"
            :to="child.path"
          >
            <span v-if="isExpanded">{{ child.name }}</span>
            <span v-else>{{ child.prefix || makePrefix(child.name) }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UpIcon from "icons/ArrowUpDropCircle"
import DropdownIcon from "icons/ArrowDownDropCircle"
import PanelIcon from "icons/Poll"
import SidebarToggleButton from "@/components/navbar/SidebarToggleButton"
import NewPanelButton from "@/components/panel/NewPanelButton"
import { all_platforms } from "@/platforms"
import PlatformsStatusMixin from "@/components/shared/mixins/PlatformsStatusMixin"

export default {
  name: "Sidebar",
  mixins: [
    PlatformsStatusMixin
  ],
  data() {
    return {
      hover: false,
      all_platforms: all_platforms,
      platformChildOpened: {}
    }
  },
  computed: {
    platforms() {
      return all_platforms
    },
    panels() {
      return this.$store.getters["panel/getPanels"]
    },
    isExpanded() {
      return this.hover || !this.$sidebar.isMinimized
    }
  },
  components: {
    "up-icon": UpIcon,
    "dropdown-icon": DropdownIcon,
    "panel-icon": PanelIcon,
    SidebarToggleButton,
    NewPanelButton
  },
  props: {
    link: {
      type: [Object, String],
      default: "/home"
    },
    title: {
      type: String,
      default: "Painel Integrado",
      description: "Sidebar title"
    },
    shortTitle: {
      type: String,
      default: "PI",
      description: "Painel Integrado"
    },
    backgroundColor: {
      type: String,
      default: "vue",
      validator: value => {
        let acceptedValues = [
          "",
          "vue",
          "blue",
          "green",
          "orange",
          "red",
          "primary"
        ];
        return acceptedValues.indexOf(value) !== -1;
      },
      description:
        "Sidebar background color (vue|blue|green|orange|red|primary)"
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
      description:
        "List of sidebar links as an array if you don't want to use components for these."
    },
    autoClose: {
      type: Boolean,
      default: true,
      description:
        "Whether sidebar should autoclose on mobile when clicking an item"
    }
  },
  provide() {
    return {
      autoClose: this.autoClose
    };
  },
  beforeDestroy() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false;
    }
  },
  created() {
    this.$sidebar.autoZIndex = false
    this.$sidebar.hide = false
    this.setPlatformChildren()
  },
  mounted() {
    this.minimizeSidebar()

  },
  methods: {
    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize();
      }
    },
    togglePlatformChildren(id) {
      this.platformChildOpened[id] = !this.platformChildOpened[id]
    },
    makePrefix(text) {
      let words = text.split(' ');
      if (words.length > 1)
        return words.map(word => word.substring(0, 1).toUpperCase()).join('');
      else
        return words[0].substring(0, 2).toUpperCase()
    },
    setPlatformChildren() {
      let platformChildOpened = {}
      this.platforms.map(p => {
        platformChildOpened[p.id] = false
      })
      this.platformChildOpened = platformChildOpened
    }
  }
};
</script>

<style lang="scss" scoped>

.sidebar {
  height: 100vh;
  margin-top: 0;
  margin-left: 0;
  z-index: 1 !important;
  background: #212c3c;
  border-radius: 0;
  z-index: 99999 !important;

  &:before {
    left: 1.35rem;
    display: none !important
  }

  &.auto-zindex {
    z-index: auto !important
  }

  &.hide {
    display: none
  }

  .sidebar-wrapper {
    z-index: 1 !important;
    display: flex;
    flex-flow: column nowrap;

    .material-design-icon {
      margin: 0;
      padding: 0;
      /deep/ .material-design-icon__svg {
        width: 1.5rem !important;
        height: 1.5rem !important;
      }
    }

    > .sidebar-item {
      padding: 0.5rem .7rem 0.5rem;
      display: flex;
      flex-flow: column nowrap;
      align-items: flex-start;
      position: relative;

      &:after{
        display: none;
      }
      &.home:after {
        display: block;
        bottom: 0.5rem;
      }
      &.home {
        flex-flow: row nowrap;
        padding: 1rem;
        /deep/ .item-icon {
          height: auto;
          width: auto;
          margin: 0!important;
          padding: 0!important;
          max-width: 2.2em;
          max-height: 2.2em;
        }
      }
      &.panel {
        padding-top: 0;
        .children {
          margin-bottom: 0;
        }
        .new-panel {
          margin-bottom: 1rem;
          .child-nav {
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            .add-icon {
              clip-path: circle(40%);
              background: #606266;
              color: #fff;
              padding: 0.1rem;
              margin-left: 0.3rem;
              margin-top: 0.5rem;
              &.hovered {
                background: #e14eca
              }
            }
            .text {
              margin-top: 0.5rem;
              margin-left: 0.5rem;
              text-transform: uppercase;
            }
          }
        }
      }
      &.panel:after {
        display: block;
        bottom: 0.7rem;
      }
      &.platform {
        padding: 0 0.7rem;
        margin: 0
      }
      img.item-icon {
        width: 1.5rem;
        height: 1.5rem;
      }
      .item-text {
        padding:0;
        margin: 0
      }
      .expand-button {
        position:absolute;
        top:0;
        right:0.5rem
      }
      .main-nav {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        .item-icon {
          margin: .5rem;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .item-text {
          text-transform: uppercase;
          padding: .5rem 0;
          display: block;
          white-space: nowrap;
          font-size: .875rem;
          color: #fff;
          text-decoration: none;
          font-weight: 400;
          line-height: 30px;
          overflow: hidden;
        }
      }
      .children {
        display: none;
        flex-flow: column nowrap;
        align-items: flex-start;
        margin-left: 0.7rem;
        margin-bottom: 1rem;
        &.open {
          display: flex
        }
        a {
          color: white
        }
      }
    }
  }
}
</style>
