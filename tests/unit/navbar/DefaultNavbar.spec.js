import Vuex from "vuex"
import BootstrapVue from "bootstrap-vue"
import VueRouter from "vue-router"
import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import DefaultNavbar from "@/components/navbar/DefaultNavbar"
import PlanInfo from "@/components/navbar/PlanInfo"
import LoadingAnimation from "@/components/shared/LoadingAnimation"
import {
  BaseDropdown
} from "@/components/lib"

const localVue = createLocalVue()

localVue.component("loading", LoadingAnimation)
localVue.component(BaseDropdown.name, BaseDropdown)
localVue.component("plan-info", PlanInfo)
localVue.use(VueRouter)
localVue.use(Vuex)
localVue.use(BootstrapVue)

const router = new VueRouter()

const actions = {
  logout: jest.fn()
}

const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,
      getters: {
        userPicture: () => ""
      },
      actions
    }
  }
})

const $sidebar = {
  showSidebar: true,
  displaySidebar: jest.fn()
}

const wrapper = shallowMount(DefaultNavbar, {
  localVue,
  store,
  router,
  mocks: {
    $rtl: {
      isRTL: true
    },
    $t: jest.fn(),
    $sidebar
  },
  propsData: {
    navItems: []
  }
})

describe("DefaultNavbar.vue", () => {
  it("is DefaultNavbar", () => {
    expect(wrapper.is(DefaultNavbar)).toBe(true)
  })
  it("computed should have valid values", () => {
    expect(wrapper.vm.isRTL).toBe(true)
    expect(wrapper.vm.userPicture).toEqual("")
  })
  it("logout", () => {
    wrapper.vm.logout()
    expect(actions.logout).toHaveBeenCalled()
  })
  it("logout", () => {
    let str = wrapper.vm.capitalizeFirstLetter("string")
    expect(str).toEqual("String")
  })
  it("toggleSidebar", () => {
    wrapper.vm.toggleSidebar()
    expect($sidebar.displaySidebar).toHaveBeenCalledWith(!$sidebar.showSidebar)
  })
  it("hideSidebar", () => {
    wrapper.vm.hideSidebar("string")
    expect($sidebar.displaySidebar).toHaveBeenCalledWith(false)
  })
})
