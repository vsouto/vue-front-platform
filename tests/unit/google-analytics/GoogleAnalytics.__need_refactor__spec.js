import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import BootstrapVue from "bootstrap-vue"
import GoogleAnalytics from "@/google_analytics"
import LoadingAnimation from "@/components/shared/LoadingAnimation"
import {
  BaseButton,
  Card
} from "@/components/lib"
import AddButton from "@/components/shared/AddButton"
import Vuex from "vuex"
import {
  profiles,
  views
} from "../../data/google-analytics"

const localVue = createLocalVue()
localVue.component("loading", LoadingAnimation)
localVue.component("add-button", AddButton)
localVue.component(BaseButton.name, BaseButton)
localVue.component(Card.name, Card)
localVue.use(Vuex)
localVue.use(BootstrapVue)

const actions = {
  authorizeAccount: jest.fn(),
  fetchActiveViews: jest.fn(),
  fetchProfiles: jest.fn(),
  deleteActiveView: jest.fn(),
  deleteProfile: jest.fn()
}

const mutations = {
  setProfile: jest.fn()
}

const $router = {
  replace: jest.fn(),
  push: jest.fn()
}

const store = new Vuex.Store({
  state: {
    isLoading: false,
  },
  getters: {
    isLoading: state => state.isLoading,
  },
  modules: {
    googleAnalytics: {
      namespaced: true,
      getters: {
        profiles: () => profiles(),
        active_views: () => views()
      },
      actions,
      mutations
    }
  }
})
const wrapper = shallowMount(GoogleAnalytics, {
  localVue,
  store,
  mocks: {
    $router,
    $route: {
      query: {
        error_title: "",
        error_message: ""
      },
    },
    $notify: jest.fn(),
    $refs: {
      analyticsRemove: {
        hide: jest.fn()
      }
    },
    $t: jest.fn()
  }
})

describe("GoogleAnalytics.vue", () => {
  it("is GoogleAnalytics", () => {
    expect(wrapper.is(GoogleAnalytics)).toBe(true)
  })
  it("should prefetch data", () => {
    expect(actions.fetchProfiles).toHaveBeenCalled()
    expect(actions.fetchActiveViews).toHaveBeenCalled()
  })
  it("computed should have valid values", () => {
    expect(wrapper.vm.isLoading).toBe(false)
    expect(wrapper.vm.profiles.length).toBe(2)
    expect(wrapper.vm.activeViews.length).toBe(2)
  })
  it("should call correct actions", async () => {
    wrapper.vm.authorizeNewAccount({})
    expect(actions.authorizeAccount).toHaveBeenCalled()
    await wrapper.vm.removeView()
    expect(actions.deleteActiveView).toHaveBeenCalled()
    await wrapper.vm.removeProfile()
    expect(actions.deleteProfile).toHaveBeenCalled()
  })
  it("loadReport method", () => {
    wrapper.vm.loadReport({
      id: 1
    })
    expect($router.push).toHaveBeenCalled()
  })
  it("loadAccounts method", () => {
    wrapper.vm.loadAccounts({
      id: 1
    })
    expect($router.push).toHaveBeenCalled()
    expect(mutations.setProfile).toHaveBeenCalled()
  })
})
