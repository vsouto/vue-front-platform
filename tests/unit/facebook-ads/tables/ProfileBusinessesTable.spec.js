import Vuex from "vuex"
import BootstrapVue from "bootstrap-vue"
import ProfileBusinessesTable from "@/facebook_ads/components//ProfileBusinessesTable"

import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import VueRouter from "vue-router"
import {
  testDataBusinesses
} from "../../../data/facebook-ads"
import LoadingAnimation from "@/components/shared/LoadingAnimation"
import { Card } from "@/components/lib"
import * as rootGetters from "@/store/getters"

const localVue = createLocalVue()
localVue.component("loading", LoadingAnimation)
localVue.component(Card.name, Card)
localVue.use(VueRouter)
localVue.use(Vuex)
const router = new VueRouter()
localVue.use(BootstrapVue)

const store = new Vuex.Store({
  state: {
    isLoading: false,
    fetch_control: {},
    errored_control: {}
  },
  getters: rootGetters,
})

const wrapper = shallowMount(ProfileBusinessesTable, {
  localVue,
  store,
  router,
  propsData: {
    businesses: testDataBusinesses,
    loading: false,
  },
  mocks: {
    $t: jest.fn()
  }
})

describe("ProfileBusinessesTable.vue", () => {
  it("is ProfileBusinessesTable", () => {
    expect(wrapper.is(ProfileBusinessesTable)).toBe(true)
  })

  it("emit loadBusinessAccounts method", () => {
    wrapper.vm.loadBusinessAccounts()
    expect(wrapper.emitted().loadBusinessAccounts).toEqual(expect.anything(), expect.anything(), expect.anything())
  })
})
