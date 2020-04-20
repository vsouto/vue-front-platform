import Vuex from "vuex"
import BootstrapVue from "bootstrap-vue"
import AccountsTable from "@/google_analytics/components/AccountsTable"
import * as rootGetters from "@/store/getters"

import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import VueRouter from "vue-router"
import {
  accounts
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
      "googleAnalytics/accounts": "fetched"
    }
  },
  getters: rootGetters,
})

const wrapper = shallowMount(AccountsTable, {
  localVue,
  router,
  store,
  propsData: {
    accounts: accounts(),
  },
  mocks: {
    $t: jest.fn()
  }
})

describe("AccountsTable.vue", () => {
  it("is AccountsTable", () => {
    expect(wrapper.is(AccountsTable)).toBe(true)
  })
  it("computed should have valid values", () => {
    expect(wrapper.vm.computedTableData).toEqual(accounts())
    expect(wrapper.vm.isReady).toBe(true)
  })
  it("loadProperties method", () => {
    wrapper.vm.loadProperties({})
    expect(wrapper.emitted()["load-properties"]).toEqual([[{}]])
  })
})
