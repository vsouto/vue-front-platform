import { shallowMount, createLocalVue } from "@vue/test-utils"

import BootstrapVue from "bootstrap-vue"
import FacebookAdsAds from "@/facebook_ads/views/ads"

import LoadingAnimation from "@/components/shared/LoadingAnimation"
import FullscreenToggle from "@/components/shared/FullscreenToggle"
import GoBack from "@/components/shared/FullscreenToggle"
import { BaseButton, Card } from "@/components/lib"
import { Tooltip, Row, Col } from "element-ui"
import Vuex from "vuex"
import * as rootGetters from "@/store/getters"

const localVue = createLocalVue()
localVue.component("loading", LoadingAnimation)
localVue.component("fullscreen-toggle", FullscreenToggle)
localVue.component("go-back", GoBack)
localVue.component(BaseButton.name, BaseButton)
localVue.component(Card.name, Card)
localVue.component("el-row", Row)
localVue.component("el-col", Col)
localVue.component("el-tooltip", Tooltip)
localVue.use(Vuex)
localVue.use(BootstrapVue)

const actions = {
  fetchAds: jest.fn(),
  updateAd: jest.fn()
}

const mutations = {
  SET_TABLE_SELECTED_IDS: jest.fn()
}

const mockedRoute = {
  params: {
    id: 1
  }
}

const store = new Vuex.Store({
  state: {
    isLoading: false
  },
  getters: rootGetters,
  modules: {
    facebookAds: {
      namespaced: true,
      actions,
      getters: {
        getTableSelectedIds: () => () => null, // Array(1).fill('1'),
        getAdsetsByIds: () => () => []
      },
      mutations
    }
  }
})

const wrapper = shallowMount(FacebookAdsAds, {
  localVue,
  store,
  propsData: {
    profileIds: [ "1" ],
    accountId: "act_1",
    campaignId: "1",
    parentCampaign: {},
    adsetIds: ["1", "2"]
  },
  mocks: {
    $route: mockedRoute,
    $t: jest.fn(),
    $notify: jest.fn()
  }
})

describe("FacebookAdsAds.vue", () => {
  it("is FacebookAdsAds", () => {
    expect(wrapper.is(FacebookAdsAds)).toBe(true)
  })
  it("should prefetch data", () => {
    expect(actions.fetchAds).toHaveBeenCalled()
  })
  it("updateStatus", () => {
    wrapper.vm.updateStatus("status", {
      profile_id: "1",
      account_id: "1",
      id: "1"
    })
    expect(actions.updateAd).toHaveBeenCalled()
  })
  it("computed should have valid values", () => {
    expect(wrapper.vm.queriedData).toEqual([])
    expect(wrapper.vm.ready).toBe(false)
  })

  it("watcher", () => {
    wrapper.setData({
      tableData: [{
        id:1
      }]
    })
    expect(wrapper.vm.tableData).toEqual([{id:1}])
    expect(mutations.SET_TABLE_SELECTED_IDS).toHaveBeenCalled()
  })
  //watcher
})
