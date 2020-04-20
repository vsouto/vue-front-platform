import Vuex from "vuex"
import BootstrapVue from "bootstrap-vue"
import GoogleAnalyticsReportModal from "@/google_analytics/components/reportModal"
import * as rootGetters from "@/store/getters"

import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import VueRouter from "vue-router"
import {
  BaseButton, Card
} from "@/components/lib"

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)
localVue.use(BootstrapVue)
localVue.component(BaseButton.name, BaseButton)
localVue.component(Card.name, Card)

const router = new VueRouter()

const store = new Vuex.Store({
  state: {
    fetch_control: {
      "googleAnalytics/accounts": "fetched"
    }
  },
  getters: rootGetters,
})

const wrapper = shallowMount(GoogleAnalyticsReportModal, {
  localVue,
  router,
  store,
  propsData: {
    domain: "testDomain",
    report: {
      active_users: 5,
      data: {
        testDomain: []
      },
      headers:[]
    }
  },
  mocks: {
    $t: jest.fn()
  }
})

describe("GoogleAnalyticsReportModal.vue", () => {
  it("is GoogleAnalyticsReportModal", () => {
    expect(wrapper.is(GoogleAnalyticsReportModal)).toBe(true)
  })
  it("computed should have valid values", () => {
    expect(wrapper.vm.computedTableData).toEqual([])
    expect(wrapper.vm.domainsData).toEqual([])
    expect(wrapper.vm.headers).toEqual([])
  })
})
