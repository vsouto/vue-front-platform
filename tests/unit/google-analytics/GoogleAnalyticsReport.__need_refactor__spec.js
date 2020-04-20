import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import BootstrapVue from "bootstrap-vue"
import GoogleAnalyticsReport from "@/google_analytics/views/report"
import LoadingAnimation from "@/components/shared/LoadingAnimation"
import {
  BaseButton,
  Card
} from "@/components/lib"
import Vuex from "vuex"
import {
  profiles
} from "../../data/google-analytics"

const localVue = createLocalVue()
localVue.component("loading", LoadingAnimation)
localVue.component(BaseButton.name, BaseButton)
localVue.component(Card.name, Card)
localVue.use(Vuex)
localVue.use(BootstrapVue)

const actions = {
  fetchReport: jest.fn()
}

const mutations = {
  setViewId: jest.fn()
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
        profileId: 2,
        viewId: 2
      },
      getters: {
        report: () => ({
          active_users: 5,
          data: [],
          headers:[]
        })
      },
      actions,
      mutations
    }
  }
})
const wrapper = shallowMount(GoogleAnalyticsReport, {
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
        view_id: 1
      }
    },
    $refs: {
      reportModal: {
        hide: jest.fn(),
        show: jest.fn()
      }
    },
    $notify: jest.fn(),
    $t: jest.fn(),
  }
})

describe("GoogleAnalyticsReport.vue", () => {
  it("is GoogleAnalyticsReport", () => {
    expect(wrapper.is(GoogleAnalyticsReport)).toBe(true)
  })
  it("report computed", () => {
    expect(wrapper.vm.report).toEqual({
      active_users: 5,
      data: [],
      headers:[]
    })
  })
  it("should prefetch data", () => {
    expect(actions.fetchReport).toHaveBeenCalled()
    expect(rootMutations.SET_UNFETCHED).toHaveBeenCalled()
    expect(mutations.setViewId).toHaveBeenCalled()
  })
})
