import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import BootstrapVue from "bootstrap-vue"
import GoogleAds from "@/google_ads"
import LoadingAnimation from "@/components/shared/LoadingAnimation"
import {
  BaseButton, Card
} from "@/components/lib"
import Vuex from "vuex"
const localVue = createLocalVue()

localVue.component("loading", LoadingAnimation)
localVue.component(BaseButton.name, BaseButton)
localVue.component(Card.name, Card)
localVue.use(Vuex)
localVue.use(BootstrapVue)

const $router = {
  replace: jest.fn(),
  push: jest.fn()
}

const $route = {
  path: "/google-ads/",
  query: {
    error_title: "",
    error_message: ""
  }
}

const googleAdsActions = {
  authorizeAccount: jest.fn(),
  deleteAccount: jest.fn(),
  fetchAccounts: jest.fn()
}

const store = new Vuex.Store({
  state: {
    isLoading: false,
  },
  getters: {
    isLoading: state => state.isLoading,
  },
  modules: {
    googleAds: {
      namespaced: true,
      actions: googleAdsActions,
      getters: {
        accounts: () => Array(5).fill({
          name: "account"
        }),
        accounts_fetched: () => true
      },
    }
  }
})
const wrapper = shallowMount(GoogleAds, {
  localVue,
  store,
  mocks: {
    $router,
    $route,
    $notify: jest.fn(),
    $refs: {
      adwordsRemove: {
        hide: jest.fn()
      }
    },
    $t: jest.fn()
  }
})

localVue.use(BootstrapVue)

describe("GoogleAds.vue", () => {
  it("is GoogleAds", () => {
    expect(wrapper.is(GoogleAds)).toBe(true)
  }),
  it("computed should have valid values", () => {
    expect(wrapper.vm.isLoading).toBe(false)
    expect(wrapper.vm.accounts.length).toBe(5)
    expect(wrapper.vm.fetched).toBe(true)
  })
  it("should render correct template", () => {
    expect(wrapper.find("#adw").exists()).toBe(true)
  })
  it("should call correct actions", async () => {
    wrapper.vm.authorizeNewAccount({})
    expect(googleAdsActions.authorizeAccount).toHaveBeenCalled()
    await wrapper.vm.remove()
    expect(googleAdsActions.deleteAccount).toHaveBeenCalled()
  })
})
