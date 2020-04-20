import Sidebar from './SideBar.vue';
import SidebarItem from './SidebarItem.vue';
import SidebarSharePlugin from "./SidebarSharePlugin.vue"

const SidebarStore = {
  showSidebar: true,
  sidebarLinks: [],
  isMinimized: true,
  autoZIndex: false,
  hide: false,
  displaySidebar(value) {
    this.showSidebar = value;
    this.toggleMinimize();
  },
  toggleMinimize() {
    document.body.classList.toggle('sidebar-mini');
    // we simulate the window Resize so the charts will get updated in realtime.
    const simulateWindowResize = setInterval(() => {
      window.dispatchEvent(new Event('resize'));
    }, 180);

    // we stop the simulation of Window Resize after the animations are completed
    setTimeout(() => {
      clearInterval(simulateWindowResize);
    }, 1000);

    this.isMinimized = !this.isMinimized;
  }
};

const SidebarPlugin = {
  install(Vue, options) {
    if (options && options.sidebarLinks) {
      SidebarStore.sidebarLinks = options.sidebarLinks;
    }
    let app = new Vue({
      data: {
        sidebarStore: SidebarStore
      }
    });
    Vue.prototype.$sidebar = app.sidebarStore;
    Vue.component('side-bar', Sidebar);
    Vue.component('sidebar-item', SidebarItem);
    Vue.component('sidebar-share', SidebarSharePlugin);
  }
};

export default SidebarPlugin;
