import Vuex from "vuex"
import BootstrapVue from "bootstrap-vue"
import Notifications from "@lib/NotificationPlugin"
import Sidebar from "@lib/SidebarPlugin"
import SidebarItem from "@lib/SidebarPlugin/SidebarItem"
import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import DefaultLayout from "@/views/layouts/DefaultLayout"
import * as rootGetters from "@/store/getters"

const localVue = createLocalVue()
localVue.component("notifications", Notifications)
localVue.component("side-bar", Sidebar)
localVue.component("sidebar-item", SidebarItem)
localVue.use(BootstrapVue)
localVue.use(Vuex)
//localVue.use(VueRouter)

const panels = [{
  id: "panel",
  name: "panel"
}]

const store = new Vuex.Store({
  state: {
    fetch_control: {"panel/fetchPanels": "fetched"},
    errored_control: {}
  },
  getters: rootGetters,
  modules: {
    panel: {
      namespaced: true,
      getters: {
        getPanels: () => panels
      }
    },
    account: {
      namespaced: true,
      getters: {
        user: () => { return {sub: "sub"} },
        token: () => "token"
      }
    }
  },
})
const $route = {
  path: "/panel",
  name: "panel",
  matched: [{
    name: "panel",
    path: "",
    meta: {
      label: ""
    }
  }],
  meta: {
    hideContent: false
  }
}

const wrapper = shallowMount(DefaultLayout, {
  localVue,
  store,
  mocks: {
    $route,
    $sidebar: {
      showSidebar: jest.fn(),
      displaySidebar: jest.fn()
    },
    $t: jest.fn(),
    Tag: {
      name:""
    }
  },
  stubs: {
    RouterView: true,
    // SideBar: true,
    // SidebarItem: true
  }
})

describe("DefaultLayout.vue", () => {
  it("is DefaultLayout", () => {
    expect(wrapper.is(DefaultLayout)).toBe(true)
  })
  describe("computed properties", () => {
    it("panels", () => {
      expect(wrapper.vm.panels).toEqual(panels)
    })
  })

})
