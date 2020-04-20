<template>
  <base-nav
    v-model="showMenu"
    :transparent="true"
    class="navbar-absolute top-navbar"
    type="dark"
  >
    <div
      slot="brand"
      class="navbar-wrapper"
    >
      <div
        :class="{ toggled: $sidebar.showSidebar }"
        class="navbar-toggle d-inline"
      >
        <button
          type="button"
          class="navbar-toggler"
          @click="toggleSidebar"
        >
          <span class="navbar-toggler-bar bar1" />
          <span class="navbar-toggler-bar bar2" />
          <span class="navbar-toggler-bar bar3" />
        </button>
      </div>
    </div>

    <!-- Breadcrumb -->
    <div class="breadcrumb-nav">
      <slot />
    </div>

    <ul
      :class="$rtl.isRTL ? 'mr-auto' : 'ml-auto'"
      class="navbar-nav"
    >
      <plan-info class="plan-info-container" />
      <base-dropdown
        :menu-on-right="!$rtl.isRTL"
        tag="li"
        title-tag="a"
        class="nav-item"
        title-classes="nav-link"
        menu-classes="dropdown-navbar"
      >
        <template slot="title">
          <div class="photo">
            <img :src="userPicture">
          </div>
          <b class="caret d-none d-lg-block d-xl-block" />
          <!-- <p class="d-lg-none">Log out</p> -->
        </template>
        <div class="text-center">
          <strong>Conta</strong>
        </div>
        <router-link
          :to="{name: 'Settings'}"
          class="dropdown-item"
        >
          <i class="fa fa-user" /> {{ $t("common.profile") }}
        </router-link>
        <router-link
          :to="{name: 'Subscriptions'}"
          class="dropdown-item"
        >
          <i class="fa fa-cogs" /> {{ $t("common.subscriptions") }}
        </router-link>
        <a
          class="dropdown-item"
          @click="logout()"
        >
          <i class="fa fa-lock" /> {{ $t("common.leave") }}
        </a>
      </base-dropdown>
    </ul>
  </base-nav>
</template>
<script>
import { BaseNav } from "@/components/lib"
import PlanInfo from "@/components/navbar/PlanInfo"

export default {
  components: {
    BaseNav,
    PlanInfo,
  },
  props: {
    navItems: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: ""
    }
  },
  computed: {
    routeName() {
      const { name } = this.$route
      return this.capitalizeFirstLetter(name)
    },
    isRTL() {
      return this.$rtl.isRTL
    },
    userPicture() {
      return this.$store.getters["account/userPicture"]
    },
    pageLabel() {
      return this.$route.meta.label ? this.$route.meta.label : this.$route.name
    },
  },
  watch:{
    $route:{
      handler() {
        this.showMenu = false
      },
      deep:true,
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("account/logout")
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications
    },
    closeDropDown() {
      this.activeNotifications = false
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false)
    },
    toggleMenu() {
      this.showMenu = !this.showMenu
    }
  }
}
</script>

<style scoped lang="scss">
.navbar /deep/ .container-fluid {
  padding: 0 !important;
  flex-basis: calc(100vw - 3rem);
}
.navbar {
  padding: 0 .5rem !important;
  z-index: auto !important;

  .navbar-nav {
    flex-direction: row;
    flex-basis: auto;
    justify-content: flex-end;
    align-items: center
  }

  &.top-navbar {
    top: 0px;
  }

  .painel-brand {
    padding: 0 3.4rem 0 .9rem;
    margin: 0;
    img {
      height: 2rem
    }
  }

  /deep/ .navbar-collapse {
    margin-left: 4.6rem;
  }
}
.breadcrumb-nav {
  display: flex;
  flex-wrap: nowrap;
}
</style>
