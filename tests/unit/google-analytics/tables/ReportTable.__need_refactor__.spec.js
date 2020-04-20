import Vuex from "vuex"
import BootstrapVue from "bootstrap-vue"
import ReportTable from "@/google_analytics/components/ReportTable"
import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import VueRouter from "vue-router"
import {
  Card
} from "@/components/lib"
import * as rootGetters from "@/store/getters"

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)
localVue.use(BootstrapVue)
localVue.component(Card.name, Card)

const router = new VueRouter()

const store = new Vuex.Store({
  state: {
    fetch_control: {
      "googleAnalytics/report": "fetched"
    }
  },
  getters: rootGetters,
})

const wrapper = shallowMount(ReportTable, {
  localVue,
  router,
  store,
  propsData: {
    report: {
      active_users: 5,
      data: [],
      headers:[]
    },
  },
  mocks: {
    $t: jest.fn()
  }
})

describe("ReportTable.vue", () => {
  it("is ReportTable", () => {
    expect(wrapper.is(ReportTable)).toBe(true)
  })
  it("computed should have valid values", () => {
    expect(wrapper.vm.computedTableData).toEqual([])
    expect(wrapper.vm.domains).toEqual([])
    expect(wrapper.vm.activeUsers).toEqual(5)
    expect(wrapper.vm.isReady).toBe(true)
  })
  it("loadDetails method", () => {
    wrapper.vm.loadDetails("domainName")
    expect(wrapper.emitted()["load-details"]).toEqual([["domainName"]])
  })
})
