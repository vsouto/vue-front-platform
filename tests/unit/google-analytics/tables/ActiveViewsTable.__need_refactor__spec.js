import Vuex from "vuex"
import BootstrapVue from "bootstrap-vue"
import ActiveViewsTable from "@/google_analytics/components/ActiveViewsTable"
import * as rootGetters from "@/store/getters"

import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import VueRouter from "vue-router"
import {
  views
} from "../../../data/google-analytics"
import {
  Card
} from "@/components/lib"
const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)
localVue.use(BootstrapVue)
localVue.component(Card.name, Card)

const router = new VueRouter()

const store = new Vuex.Store({
  state: {
    fetch_control: {
      "googleAnalytics/active_views": "fetched"
    }
  },
  getters: rootGetters,
})

const wrapper = shallowMount(ActiveViewsTable, {
  localVue,
  router,
  store,
  propsData: {
    activeViews: views(),
  },
  mocks: {
    $t: jest.fn()
  }
})

describe("ActiveViewsTable.vue", () => {
  it("is ActiveViewsTable", () => {
    expect(wrapper.is(ActiveViewsTable)).toBe(true)
  })
  it("computed should have valid values", () => {
    expect(wrapper.vm.computedTableData).toEqual(views())
    expect(wrapper.vm.isReady).toBe(true)
  })
  it("deleteView method", () => {
    wrapper.vm.deleteView({})
    expect(wrapper.emitted()["delete-view"]).toEqual([[{}]])
  })
  it("loadReport method", () => {
    wrapper.vm.loadReport({})
    expect(wrapper.emitted()["load-report"]).toEqual([[{}]])
  })
})
