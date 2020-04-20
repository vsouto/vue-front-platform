import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import BootstrapVue from "bootstrap-vue"
import GoogleAnalyticsViews from "@/google_analytics/views/views"
import LoadingAnimation from "@/components/shared/LoadingAnimation"
import {
  BaseButton,
  Card
} from "@/components/lib"
import Vuex from "vuex"
import {
  accounts,
  profiles,
  views,
  webProperties
} from "../../data/google-analytics"

const localVue = createLocalVue()
localVue.component("loading", LoadingAnimation)
localVue.component(BaseButton.name, BaseButton)
localVue.component(Card.name, Card)
localVue.use(Vuex)
localVue.use(BootstrapVue)

const actions = {
  fetchViews: jest.fn(),
  addActiveViews: jest.fn(() => Promise.resolve())
}

const mutations = {
  setPropertyId: jest.fn(),
  clearSelectedViews: jest.fn()
}

const rootMutations = {
  SET_UNFETCHED: jest.fn()
}

const $router = {
  push: jest.fn(),
  go: jest.fn()
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
        web_property: webProperties()[0],
        profileId: 2,
        propertyId: 2
      },
      getters: {
        views: () => views(),
        active_views: () => [],
        selected_views: () => []
      },
      actions,
      mutations
    }
  }
})
const wrapper = shallowMount(GoogleAnalyticsViews, {
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

describe("GoogleAnalyticsViews.vue", () => {
  it("is GoogleAnalyticsViews", () => {
    expect(wrapper.is(GoogleAnalyticsViews)).toBe(true)
  })
  it("accounts computed", () => {
    expect(wrapper.vm.views).toEqual(views())
    expect(wrapper.vm.activeViews).toEqual([])
    expect(wrapper.vm.selectedViews).toEqual([])
  })
  it("should prefetch data", () => {
    expect(actions.fetchViews).toHaveBeenCalled()
    expect(rootMutations.SET_UNFETCHED).toHaveBeenCalled()
    expect(mutations.setPropertyId).toHaveBeenCalled()
  })
  it("addNewViews method", () => {
    wrapper.vm.addNewViews(views())
    expect(actions.addActiveViews).toHaveBeenCalled()
  })
})
