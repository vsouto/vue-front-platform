import Vuex from "vuex"
import BootstrapVue from "bootstrap-vue"
import ProfilesTable from "@/google_analytics/components/ProfilesTable"
import * as rootGetters from "@/store/getters"

import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import VueRouter from "vue-router"
import {
  profiles
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
      "googleAnalytics/profiles": "fetched"
    }
  },
  getters: rootGetters,
})

const wrapper = shallowMount(ProfilesTable, {
  localVue,
  router,
  store,
  propsData: {
    profiles: profiles(),
  },
  mocks: {
    $t: jest.fn()
  }
})

describe("ProfilesTable.vue", () => {
  it("is ProfilesTable", () => {
    expect(wrapper.is(ProfilesTable)).toBe(true)
  })
  it("computed should have valid values", () => {
    expect(wrapper.vm.computedTableData).toEqual(profiles())
    expect(wrapper.vm.isReady).toBe(true)
  })
  it("loadAccounts method", () => {
    wrapper.vm.loadAccounts({})
    expect(wrapper.emitted()["load-accounts"]).toEqual([[{}]])
  })
})
