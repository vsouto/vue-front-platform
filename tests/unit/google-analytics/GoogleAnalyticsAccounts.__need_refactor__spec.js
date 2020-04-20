import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import BootstrapVue from "bootstrap-vue"
import GoogleAnalyticsAccounts from "@/google_analytics/views/accounts"
import LoadingAnimation from "@/components/shared/LoadingAnimation"
import {
  BaseButton,
  Card
} from "@/components/lib"
import Vuex from "vuex"
import {
  accounts,
  profiles
} from "../../data/google-analytics"

const localVue = createLocalVue()
localVue.component("loading", LoadingAnimation)
localVue.component(BaseButton.name, BaseButton)
localVue.component(Card.name, Card)
localVue.use(Vuex)
localVue.use(BootstrapVue)

const actions = {
  fetchAccounts: jest.fn()
}

const mutations = {
  setAccount: jest.fn(),
  setProfileId: jest.fn()
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
        profileId: 2
      },
      getters: {
        accounts: () => accounts()
      },
      actions,
      mutations
    }
  }
})
const wrapper = shallowMount(GoogleAnalyticsAccounts, {
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
        id: 1
      }
    },
    $notify: jest.fn(),
    $t: jest.fn()
  }
})

describe("GoogleAnalyticsAccounts.vue", () => {
  it("is GoogleAnalyticsAccounts", () => {
    expect(wrapper.is(GoogleAnalyticsAccounts)).toBe(true)
  })
  it("accounts computed", () => {
    expect(wrapper.vm.accounts).toEqual(accounts())
  })
  it("should prefetch data", () => {
    expect(actions.fetchAccounts).toHaveBeenCalled()
    expect(rootMutations.SET_UNFETCHED).toHaveBeenCalled()
    expect(mutations.setProfileId).toHaveBeenCalled()
  })
  it("loadProperties method", () => {
    wrapper.vm.loadProperties({
      id: 1
    })
    expect($router.push).toHaveBeenCalled()
    expect(mutations.setAccount).toHaveBeenCalled()
  })
})
