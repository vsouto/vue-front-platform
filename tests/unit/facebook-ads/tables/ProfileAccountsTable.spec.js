import Vuex from "vuex"
import BootstrapVue from "bootstrap-vue"
import ProfileAccountsTable from "@/facebook_ads/components//ProfileAccountsTable"
import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import VueRouter from "vue-router"
import {
  testDataAccounts
} from "../../../data/facebook-ads"
import LoadingAnimation from "@/components/shared/LoadingAnimation"
import { Card } from "@/components/lib"
import * as rootGetters from "@/store/getters"

const localVue = createLocalVue()
localVue.component("loading", LoadingAnimation)
localVue.component(Card.name, Card)
localVue.use(VueRouter)
localVue.use(Vuex)
localVue.use(BootstrapVue)

const router = new VueRouter()

const actions = {
  selectAccountToAdd: jest.fn(),
}

const mutations = {
  ADD_SELECTED_ACCOUNT: jest.fn(),
  DEL_SELECTED_ACCOUNT: jest.fn(),
  SET_SELECTED_ACCOUNTS: jest.fn()
}

let state = {
  accounts: testDataAccounts,
  selected_accounts: testDataAccounts
}

const store = new Vuex.Store({
  state: {
    isLoading: false,
    fetch_control: {},
    errored_control: {}
  },
  getters: rootGetters,
  modules: {
    facebookAds: {
      namespaced: true,
      state: state,
      getters: {
        accounts: state => state.accounts,
        selected_accounts: state => state.selected_accounts,
      },
      actions,
      mutations
    },
  },
})

const wrapper = shallowMount(ProfileAccountsTable, {
  localVue,
  router,
  store,
  propsData: {
    accounts: testDataAccounts,
    businessAccounts: [],
    businessId: "1"
  },
  mocks: {
    $t: jest.fn()
  }
})

describe("ProfileAccountsTable.vue", () => {
  it("is ProfileAccountsTable", () => {
    expect(wrapper.is(ProfileAccountsTable)).toBe(true)
  })
  it("selectAccountToAdd method", () => {
    wrapper.vm.selectAccount({account_id: 1}, {})
    expect(actions.selectAccountToAdd).toHaveBeenCalled()
  })
  it("isAccountAdded method", () => {
    let flag = wrapper.vm.isAccountAdded(1)
    expect(flag).toBe(true)
  })
  it("isAccountSelected method", () => {
    let flag = wrapper.vm.isAccountSelected(1)
    expect(flag).toBe(true)
  })
  it("tableData", () => {
    expect(wrapper.vm.tableData).toEqual([])
  })

  // TODO
  // emit expecting ADD_SELECTED_ACCOUNT and DEL_SELECTED_ACCOUNT to be called
})
