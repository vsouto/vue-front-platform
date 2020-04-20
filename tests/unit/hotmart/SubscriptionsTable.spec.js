import Vuex from "vuex"
import BootstrapVue from "bootstrap-vue"
import SubscriptionsTable from "@/hotmart/components//SubscriptionsTable"
import * as rootGetters from "@/store/getters"

import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import VueRouter from "vue-router"
import {
  Card
} from "@/components/lib"

import {
  testDataSubscriptions
} from "../../data/hotmart"

const localVue = createLocalVue()
localVue.component(Card.name, Card)
localVue.use(VueRouter)
localVue.use(Vuex)
localVue.use(BootstrapVue)

const router = new VueRouter()

const store = new Vuex.Store({
  state: {},
  getters: rootGetters,
})

const wrapper = shallowMount(SubscriptionsTable, {
  localVue,
  router,
  store,
  propsData: {
    subscriptions: testDataSubscriptions
  },
  mocks: {
    $t: jest.fn()
  }
})

describe("SubscriptionsTable.vue", () => {
  it("is SubscriptionsTable", () => {
    expect(wrapper.is(SubscriptionsTable)).toBe(true)
  })
  it("computedTableData", () => {
    expect(wrapper.vm.computedTableData).toEqual(testDataSubscriptions)
  })
  it("productFormatter", () => {
    let data = wrapper.vm.productFormatter({}, {}, { name: "name" }, 1)
    expect(data).toEqual("name")
  })
  it("subscriberFormatter", () => {
    let data = wrapper.vm.subscriberFormatter({}, {}, { name: "name" }, 1)
    expect(data).toEqual("name")
  })
})
