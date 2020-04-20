import Vuex from "vuex"
import BootstrapVue from "bootstrap-vue"
import PanelsTable from "@/components/panel-list/PanelsTable"

import { shallowMount, createLocalVue } from "@vue/test-utils"
import VueRouter from "vue-router"
import LoadingAnimation from "@/components/shared/LoadingAnimation"
import { Card } from "@/components/lib"
const localVue = createLocalVue()
localVue.component("loading", LoadingAnimation)
localVue.component(Card.name, Card)
localVue.use(VueRouter)
localVue.use(Vuex)
localVue.use(BootstrapVue)

const router = new VueRouter()

const store = new Vuex.Store({
  state: {
    isLoading: false,
    fetch_control: {},
    errored_control: {}
  },
  getters: {
    isLoading: state => state.isLoading,
    isFetching: state => attr => state.fetch_control[attr] && state.fetch_control[attr] == "fetching",
    isFetched: state => attr => state.fetch_control[attr] && state.fetch_control[attr] == "fetched",
    canFetch: state => attr => !state.fetch_control[attr],
    isReady: state => attr => state.fetch_control[attr] && (
      state.fetch_control[attr] != "fetching" ||
    state.fetch_control[attr] == "fetched"
    )
  }
})

const wrapper = shallowMount(PanelsTable, {
  localVue,
  router,
  store,
  propsData: {
    panels: []
  },
  mocks: {
    $t: jest.fn()
  }
})

describe("PanelsTable.vue", () => {
  it("is PanelsTable", () => {
    expect(wrapper.is(PanelsTable)).toBe(true)
  })
  xit("computed should have valid values", () => {
    expect(wrapper.vm.queriedData).toEqual([])
    wrapper.setData({
      pagination: {
        perPage: 5,
        currentPage: 1
      }
    })
    expect(wrapper.vm.total).toEqual(0)
  })
  it("setPanelToEdit", () => {
    wrapper.vm.setPanelToEdit({})
    expect(wrapper.emitted().setPanelToEdit).toEqual([ [ {} ] ])
  })
  xit("setPanelToDelete", () => {
    wrapper.vm.setPanelToDelete({})
    expect(wrapper.emitted().setPanelToDelete).toEqual([ [ {} ] ])
  })
  xit("havePlatform", () => {
    let data = wrapper.vm.havePlatform("facebook_ads", {
      facebook_ads: ["act_1"]
    })
    expect(data).toBe(true)
  })
  xit("haveFilters", () => {
    let data = wrapper.vm.haveFilters({
      filters: {
        params: ["filter"]
      }
    })
    expect(data).toBe(true)
  })
})
