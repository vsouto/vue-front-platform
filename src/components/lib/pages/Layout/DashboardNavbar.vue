<template>
  <base-nav
    v-model="showMenu"
    class="navbar-absolute top-navbar"
    type="white"
    :transparent="true"
  >
    <div
      slot="brand"
      class="navbar-wrapper"
    >
      <div class="navbar-minimize d-inline">
        <sidebar-toggle-button />
      </div>
      <div
        class="navbar-toggle d-inline"
        :class="{ toggled: $sidebar.showSidebar }"
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
      <a
        class="navbar-brand"
        href="#pablo"
      >{{ routeName }}</a>
    </div>

    <ul
      class="navbar-nav"
      :class="$rtl.isRTL ? 'mr-auto' : 'ml-auto'"
    >
      <div
        class="search-bar input-group"
        @click="searchModalVisible = true"
      >
        <!--
          <input type="text" class="form-control" placeholder="Search...">
          <div class="input-group-addon"><i class="tim-icons icon-zoom-split"></i></div>
        -->
        <button
          id="search-button"
          class="btn btn-link"
          data-toggle="modal"
          data-target="#searchModal"
        >
          <i class="tim-icons icon-zoom-split" />
        </button>
        <!-- You can choose types of search input -->
      </div>
      <modal
        id="searchModal"
        :show.sync="searchModalVisible"
        class="modal-search"
        :centered="false"
        :show-close="true"
      >
        <input
          id="inlineFormInputGroup"
          slot="header"
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="SEARCH"
        >
      </modal>
      <base-dropdown
        tag="li"
        :menu-on-right="!$rtl.isRTL"
        title-tag="a"
        title-classes="nav-link"
        class="nav-item"
      >
        <template
          slot="title"
        >
          <div class="notification d-none d-lg-block d-xl-block" />
          <i class="tim-icons icon-sound-wave" />
          <p class="d-lg-none">
            New Notifications
          </p>
        </template>
        <li class="nav-link">
          <a
            href="#"
            class="nav-item dropdown-item"
          >Mike John responded to your email</a>
        </li>
        <li class="nav-link">
          <a
            href="#"
            class="nav-item dropdown-item"
          >You have 5 more tasks</a>
        </li>
        <li class="nav-link">
          <a
            href="#"
            class="nav-item dropdown-item"
          >Your friend Michael is in town</a>
        </li>
        <li class="nav-link">
          <a
            href="#"
            class="nav-item dropdown-item"
          >Another notification</a>
        </li>
        <li class="nav-link">
          <a
            href="#"
            class="nav-item dropdown-item"
          >Another one</a>
        </li>
      </base-dropdown>
      <base-dropdown
        tag="li"
        :menu-on-right="!$rtl.isRTL"
        title-tag="a"
        class="nav-item"
        title-classes="nav-link"
        menu-classes="dropdown-navbar"
      >
        <template
          slot="title"
        >
          <div class="photo">
            <img src="img/mike.jpg">
          </div>
          <b class="caret d-none d-lg-block d-xl-block" />
          <p class="d-lg-none">
            Log out
          </p>
        </template>
        <li class="nav-link">
          <a
            href="#"
            class="nav-item dropdown-item"
          >Profile</a>
        </li>
        <li class="nav-link">
          <a
            href="#"
            class="nav-item dropdown-item"
          >Settings</a>
        </li>
        <div class="dropdown-divider" />
        <li class="nav-link">
          <a
            href="#"
            class="nav-item dropdown-item"
          >Log out</a>
        </li>
      </base-dropdown>
    </ul>
  </base-nav>
</template>
<script>
import { CollapseTransition } from 'vue2-transitions';
import { BaseNav, Modal } from '@/components/lib';
import SidebarToggleButton from './SidebarToggleButton';

export default {
  components: {
    SidebarToggleButton,
    CollapseTransition,
    BaseNav,
    Modal
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: ''
    };
  },
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
    isRTL() {
      return this.$rtl.isRTL;
    }
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
  }
};
</script>
<style scoped>
.top-navbar {
  top: 0px;
}
</style>
