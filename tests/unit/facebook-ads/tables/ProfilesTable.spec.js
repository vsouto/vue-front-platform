import Vuex from "vuex"
import BootstrapVue from "bootstrap-vue"
import ProfilesTable from "@/facebook_ads/components//ProfilesTable"

import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import VueRouter from "vue-router"
import {
  testDataProfiles
} from "../../../data/facebook-ads"
import { Card } from "@/components/lib"
import LoadingAnimation from "@/components/shared/LoadingAnimation"
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

const wrapper = shallowMount(ProfilesTable, {
  localVue,
  store,
  router,
  propsData: {
    profiles: testDataProfiles,
  },
  mocks: {
    $t: jest.fn()
  }
})

describe("ProfilesTable.vue", () => {
  it("is ProfilesTable", () => {
    expect(wrapper.is(ProfilesTable)).toBe(true)
  })
  xit("emit loadProfileBusinesses method", () => {
    wrapper.vm.loadProfileBusinesses()
    expect(wrapper.emitted().loadProfileBusinesses).toEqual(expect.anything())
  })
  it("emit setProfileToDelete method", () => {
    wrapper.vm.deleteProfile()
    expect(wrapper.emitted().deleteProfile).toEqual(expect.anything())
  })
  it("tableData", () => {
    expect(wrapper.vm.tableData).toEqual(testDataProfiles)
  })
})
