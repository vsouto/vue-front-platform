<template>
  <div
    :class="{ 'nav-open': $sidebar.showSidebar }"
    class="wrapper"
  >
    <notifications />
    <sidebar-fixed-toggle-button />
    <div
      :data="sidebarBackground"
      class="main-panel"
    >
      <side-bar
        :background-color="sidebarBackground"
        :short-title="$t('sidebar.shortTitle')"
        :title="$t('sidebar.title')"
      >
        <template
          v-if="isCustomer"
          slot="links"
        >
          <sidebar-item
            v-for="(p,i) in panels"
            :key="i"
            :link="{
              name: p.name,
              icon: 'finance',
              color: 'text-white',
              path: `/panel/${p.id}`
            }"
          />
        </template>
      </side-bar>
      <default-navbar :nav-items="navItems">
        <route-bread-crumb />
      </default-navbar>
      <div
        :class="{ 'content': !hideContent }"
        @click="toggleSidebar"
      >
        <keep-alive
          include="Panel"
          :max="2"
        >
          <router-view :key="$route.fullPath" />
        </keep-alive>
      </div>
      <div
        v-if="notOnProduction"
        class="local-dev-helper"
      >
        <input
          class="id"
          :value="$store.getters['account/user'].sub"
        >
        <input
          class="tk"
          :value="$store.getters['account/token']"
        >
      </div>
    </div>
  </div>
</template>
<script>
import PerfectScrollbar from "perfect-scrollbar"

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`)
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className)
    }, 100)
  }
}

import DefaultNavbar from "@/components/navbar/DefaultNavbar"
import SidebarFixedToggleButton from "@/components/navbar/SidebarFixedToggleButton.vue"
import { RouteBreadCrumb } from "@/components/lib"

export default {
  name: "DefaultLayout",
  components: {
    DefaultNavbar,
    SidebarFixedToggleButton,
    RouteBreadCrumb
  },
  data() {
    return {
      notOnProduction: process.env.VUE_APP_ENV != "production",
      sidebarBackground: "vue", //vue|blue|orange|green|red|primary
      modalOpened: false,
      currentTitle: null
    }
  },
  computed: {
    isCustomer() {
      const isRegularUser = this.$store.getters["account/isRegularUser"]
      return isRegularUser
    },
    navItems() {
      return []
    },
    panels() {
      return this.$store.getters["panel/getPanels"]
    },
    hideContent() {
      return this.$route.meta.hideContent
    }
  },
  mounted() {
    this.initScrollbar()
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false)
      }
    },
    initScrollbar() {

      let docClasses = document.body.classList
      let isWindows = navigator.platform.startsWith("Win")

      if (isWindows) {
        // if we are on windows OS we activate the perfectScrollbar function
        initScrollbar("sidebar")
        initScrollbar("main-panel")
        initScrollbar("sidebar-wrapper")

        docClasses.add("perfect-scrollbar-on")
      } else {
        docClasses.add("perfect-scrollbar-off")
      }

      this.$sidebar.displaySidebar(false)
    }
  }
}
</script>
<style lang="scss">
.main-panel {
  > .content {
    padding: 3rem 2rem 2rem 16rem;
    min-height: 100vh;
  }
}
.sidebar-mini {
  .main-panel {
    > .content {
      padding: 3rem 2rem 2rem 6rem;
      min-height: 100vh;
    }
  }
}

$scaleSize: 0.95;
@keyframes zoomIn95 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  to {
    opacity: 1;
  }
}

.main-panel .zoomIn {
  animation-name: zoomIn95;
}

@keyframes zoomOut95 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}

.main-panel .zoomOut {
  animation-name: zoomOut95;
}

.local-dev-helper {
  position: fixed;
  bottom: 0.5rem;
  right: 0.5rem;
  width: 70vw;
  background: $black;
  padding: 0.5rem;
  display: flex;
  .id {
    display: block;
    margin-bottom: 0.5rem;
    background: transparent;
    padding: 0.25rem;
    color: $gray-100;
    border: none;
    flex: 1 1 auto;
    margin: 0 0.5rem;
  }
  .tk {
    display: block;
    color: $gray-100;
    background: transparent;
    padding: 0.25rem;
    border: none;
    flex: 1 1 auto;
    margin: 0 0.5rem;
  }
}
</style>
