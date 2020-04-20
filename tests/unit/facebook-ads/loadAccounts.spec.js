import Vuex from "vuex"
import BootstrapVue from "bootstrap-vue"
import { BaseButton } from "@/components/lib"
import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import VueRouter from "vue-router"
import FacebookAdsLoadAccounts from "@/facebook_ads/views/loadAccounts"
import {
  testDataProfiles,
  testDataAccounts
} from "../../data/facebook-ads"
import AddButton from "@/components/shared/AddButton"

const localVue = createLocalVue()
localVue.component("add-button", AddButton)
localVue.component(BaseButton.name, BaseButton)
localVue.use(VueRouter)
localVue.use(Vuex)
const router = new VueRouter()
router.push = jest.fn()
localVue.use(BootstrapVue)

const actions = {
  addAccounts: jest.fn(),
  fetchBusinessAccounts: jest.fn()
}

const mutations = {
  ADD_SELECTED_ACCOUNT(state, account) {
    state.selected_accounts.push(account)
  }
}

let state = {
  accounts: testDataAccounts,
  selected_accounts: [testDataAccounts[0]]
}

const store = new Vuex.Store({
  state: {
    isLoading: false,
  },
  getters: {
    isLoading: state => state.isLoading
  },
  modules: {
    facebookAds: {
      namespaced: true,
      state: state,
      getters: {
        getProfileById: () => () => testDataProfiles[0],
        getAccounts: state => state.accounts,
        selected_accounts: state => state.selected_accounts,
        getProfileBusinessAccountsById: () => () => []
      },
      actions,
      mutations
    },
  },
})

const wrapper = shallowMount(FacebookAdsLoadAccounts, {
  localVue,
  router,
  store,
  mocks: {
    $t: jest.fn()
  },
  propsData: {
    profileId: "1",
    businessId: "1",
    accountIds: [1, 2]
  }
})

describe("FacebookAdsLoadAccounts.vue", () => {
  it("is FacebookAdsLoadAccounts", () => {
    expect(wrapper.is(FacebookAdsLoadAccounts)).toBe(true)
  })
  xit("should push to another route if profile is empty", () => {
    expect(router.push).toHaveBeenCalled()
  })
  it("emit addNewAccounts method", () => {
    wrapper.vm.addNewAccounts()
    expect(actions.addAccounts).toHaveBeenCalled()
  })

  describe("computed properties", () => {
    it("haveChanges without changes", () => {
      expect(wrapper.vm.haveChanges).toBe(false)
    })
    it("haveChanges withchanges", () => {
      mutations.ADD_SELECTED_ACCOUNT(state, {
        id: 4,
        account_id: 4,
        nickname: "trainee"
      })
      expect(wrapper.vm.haveChanges).toBe(true)
    })
    it("profile", () => {
      expect(wrapper.vm.profile).toEqual(testDataProfiles[0])
    })
    it("accounts", () => {
      expect(wrapper.vm.accounts).toEqual(state.accounts)
    })
    it("selectedAccounts", () => {
      expect(wrapper.vm.selectedAccounts).toEqual(state.selected_accounts)
    })
    it("selectedAccountsLength", () => {
      expect(wrapper.vm.selectedAccountsLength).toEqual(1)
    })
  })
})
