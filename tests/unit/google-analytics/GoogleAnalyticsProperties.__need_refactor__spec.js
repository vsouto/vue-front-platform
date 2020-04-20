import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import BootstrapVue from "bootstrap-vue"
import GoogleAnalyticsProperties from "@/google_analytics/views/properties"
import LoadingAnimation from "@/components/shared/LoadingAnimation"
import {
  BaseButton,
  Card
} from "@/components/lib"
import Vuex from "vuex"
import {
  profiles,
  webProperties,
  accounts
} from "../../data/google-analytics"

const localVue = createLocalVue()
localVue.component("loading", LoadingAnimation)
localVue.component(BaseButton.name, BaseButton)
localVue.component(Card.name, Card)
localVue.use(Vuex)
localVue.use(BootstrapVue)

const actions = {
  fetchWebProperties: jest.fn()
}

const mutations = {
  setWebProperty: jest.fn(),
  setAccountId: jest.fn()
}

const rootMutations = {
  SET_UNFETCHED: jest.fn()
}

const $router = {
  push: jest.fn()
}

const store = new Vuex.Store({
  state: {
    isLoading: false,
  },
  getters: {
    isLoading: state => state.isLoading,
  },
  mutations: rootMutations,
  modules: {
    googleAnalytics: {
      namespaced: true,
      state: {
        profile: profiles()[0],
        account: accounts()[0],
        profileId: 2,
        accountId: 2
      },
      getters: {
        web_properties: () => webProperties()
      },
      actions,
      mutations
    }
  }
})
const wrapper = shallowMount(GoogleAnalyticsProperties, {
  localVue,
  store,
  mocks: {
    $router,
    $route: {
      query: {
        error_title: "",
        error_message: ""
      },
      params: {
        account_id: 1
      }
    },
    $notify: jest.fn(),
    $t: jest.fn()
  }
})



describe("GoogleAnalyticsProperties.vue", () => {
  it("is GoogleAnalyticsProperties", () => {
    expect(wrapper.is(GoogleAnalyticsProperties)).toBe(true)
  })
  it("properties computed", () => {
    expect(wrapper.vm.properties).toEqual(webProperties())
  })
  it("should prefetch data", () => {
    expect(actions.fetchWebProperties).toHaveBeenCalled()
    expect(rootMutations.SET_UNFETCHED).toHaveBeenCalled()
    expect(mutations.setAccountId).toHaveBeenCalled()
  })
  it("loadViews method", () => {
    wrapper.vm.loadViews({
      id: 1
    })
    expect($router.push).toHaveBeenCalled()
    expect(mutations.setWebProperty).toHaveBeenCalled()
  })
})
