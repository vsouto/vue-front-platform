import Vuex from "vuex"
import BootstrapVue from "bootstrap-vue"
import AccountsTable from "@/facebook_ads/components//AccountsTable"
import LoadingAnimation from "@/components/shared/LoadingAnimation"
import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import VueRouter from "vue-router"
import {
  testDataAccounts
} from "../../../data/facebook-ads"
import { Card } from "@/components/lib"
import * as rootGetters from "@/store/getters"

const localVue = createLocalVue()
localVue.component("loading", LoadingAnimation)
localVue.component(Card.name, Card)
localVue.use(VueRouter)
localVue.use(Vuex)
localVue.use(BootstrapVue)

const store = new Vuex.Store({
  state: {
    isLoading: false,
    fetch_control: {},
    errored_control: {}
  },
  getters: rootGetters,
})

const router = new VueRouter()

const wrapper = shallowMount(AccountsTable, {
  localVue,
  store,
  router,
  propsData: {
    accounts: testDataAccounts,
  },
  mocks: {
    $t: jest.fn()
  }
})

describe("AccountsTable.vue", () => {
  wrapper.setData({
    pagination: {
      perPage: 5,
      currentPage: 1,
      perPageOptions: [5, 10, 25, 50],
      total: 0
    }
  })
  it("is AccountsTable", () => {
    expect(wrapper.is(AccountsTable)).toBe(true)
  })

  it("emit deleteAccount method", () => {
    wrapper.vm.deleteAccount()
    expect(wrapper.emitted().deleteAccount).toEqual(expect.anything())
  })
})
