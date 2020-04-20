import Vuex from "vuex"
import BootstrapVue from "bootstrap-vue"
import PropertiesTable from "@/google_analytics/components/PropertiesTable"
import * as rootGetters from "@/store/getters"

import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import VueRouter from "vue-router"
import {
  webProperties
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
      "googleAnalytics/web_properties": "fetched"
    }
  },
  getters: rootGetters,
})

const wrapper = shallowMount(PropertiesTable, {
  localVue,
  router,
  store,
  propsData: {
    properties: webProperties(),
  },
  mocks: {
    $t: jest.fn()
  }
})

describe("PropertiesTable.vue", () => {
  it("is PropertiesTable", () => {
    expect(wrapper.is(PropertiesTable)).toBe(true)
  })
  it("computed should have valid values", () => {
    expect(wrapper.vm.computedTableData).toEqual(webProperties())
    expect(wrapper.vm.isReady).toBe(true)
  })
  it("loadViews method", () => {
    wrapper.vm.loadViews({})
    expect(wrapper.emitted()["load-views"]).toEqual([[{}]])
  })
})
