import { shallowMount, createLocalVue } from "@vue/test-utils"

import BootstrapVue from "bootstrap-vue"
import FacebookAdsCampaigns from "@/facebook_ads/views/campaigns"
import LoadingAnimation from "@/components/shared/LoadingAnimation"
import FullscreenToggle from "@/components/shared/FullscreenToggle"
import GoBack from "@/components/shared/FullscreenToggle"
import { BaseButton, Card } from "@/components/lib"
import { Tooltip } from "element-ui"
import Vuex from "vuex"
import * as rootGetters from "@/store/getters"

const localVue = createLocalVue()
localVue.component("loading", LoadingAnimation)
localVue.component("fullscreen-toggle", FullscreenToggle)
localVue.component("go-back", GoBack)
localVue.component(BaseButton.name, BaseButton)
localVue.component(Card.name, Card)
localVue.component("el-tooltip", Tooltip)
localVue.use(Vuex)
localVue.use(BootstrapVue)

const actions = {
  fetchCampaigns: jest.fn(),
  updateCampaign: jest.fn()
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
      mutations,
      getters: {
        getTableSelectedIds: () => () => null // Array(1).fill('1')
      }
    }
  }
})

const wrapper = shallowMount(FacebookAdsCampaigns, {
  localVue,
  store,
  propsData: {
    profile_ids: [ "1" ],
    account_id: "act_1",
    campaign_ids: [ "1", "2" ]
  },
  mocks: {
    $route: mockedRoute,
    $t: jest.fn()
  }
})

describe("FacebookAdsCampaigns.vue", () => {
  it("is FacebookAdsCampaigns", () => {
    expect(wrapper.is(FacebookAdsCampaigns)).toBe(true)
  })
  it("should prefetch data", () => {
    expect(actions.fetchCampaigns).toHaveBeenCalled()
  })
  it("updateStatus", () => {
    wrapper.vm.updateStatus("status", {
      profile_id: "1",
      account_id: "1",
      id: "1"
    })
    expect(actions.updateCampaign).toHaveBeenCalled()
  })

  it("updateDailyBudget", () => {
    wrapper.vm.updateDailyBudget("value", {
      profile_id: "1",
      account_id: "1",
      id: "1"
    })
    expect(actions.updateCampaign).toHaveBeenCalled()
  })
  it("computed should have valid values", () => {
    expect(wrapper.vm.queriedData).toEqual([])
    expect(wrapper.vm.ready).toBe(false)
    // ! Test mixin and/or ViewTableFooter ?
    // wrapper.setData({
    // 	pagination: {
    // 		perPage: 5,
    // 		currentPage: 1
    // 	}
    // });
    // expect(wrapper.vm.to).toEqual(0);
    // expect(wrapper.vm.from).toEqual(0);
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
  // ! Move these tests to its components
  // it('handleEditStatus', () => {
  // 	wrapper.vm.handleEditStatus(1, {});
  // 	expect(swal).toHaveBeenCalled();
  // });
  // it('handleEditDailyBudget', () => {
  // 	wrapper.vm.handleEditDailyBudget(1, {});
  // 	expect(swal).toHaveBeenCalled();
  // });
  // it('handleDelete', () => {
  // 	wrapper.vm.handleDelete(1, {});
  // 	expect(swal).toHaveBeenCalled();
  // });
  // ! Test mixin?
  // it('formatterCurrency', () => {
  // 	let currency = wrapper.vm.formatterCurrency({}, {}, 125, 1);
  // 	expect(currency).toEqual('R$ 1,25');
  // });
  // ! Test actions called?
  // it('updateStatus', () => {
  // 	wrapper.vm.updateStatus('status', {});
  // 	expect(swal).toHaveBeenCalled();
  // });
  // it('updateDailyBudget', () => {
  // 	wrapper.vm.updateDailyBudget(100, { profile_id: 1, account_id: 1, id: 1 });
  // 	expect(swal).toHaveBeenCalled();
  // });
  // ! Test notify?
  // it('successEditModal', () => {
  // 	wrapper.vm.successEditModal({ name: 'account' });
  // 	expect(swal).toHaveBeenCalled();
  // });
})
