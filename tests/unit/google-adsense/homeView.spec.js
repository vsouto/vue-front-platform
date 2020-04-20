import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
jest.mock("axios")

// Global
import Vuex from "vuex"
import VueRouter from "vue-router"
import BootstrapVue from "bootstrap-vue"
import VueMoment from "vue-moment"
import moment from "moment-timezone"
import VueDataTables from "vue-data-tables"
import VueTour from "vue-tour-animated"
import LoadingAnimation from "@/components/shared/LoadingAnimation"
import {
  BaseButton, BaseInput, Card
} from "@/components/lib"

// Shared
import AddButton from "@/components/shared/AddButton"
import EditButton from "@/components/shared/EditButton"
import DeleteButton from "@/components/shared/DeleteButton"
import RefreshButton from "@/components/shared/RefreshButton"
import CopyToClipboardButton from "@/components/shared/CopyToClipboardButton"

// Local
import Home from "@/google_adsense/views/home"
import TourMixin from "@/components/shared/mixins/TourMixin"

// Test data
import {
  testDataAccounts
} from "../../data/google-adsense"

// Store
import rootState from "@/store/state"
import * as rootGetters from "@/store/getters"
import { mutations } from "@/store/modules/google-adsense"

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(VueMoment, {
  moment
})
localVue.use(BootstrapVue)
localVue.use(VueTour)
localVue.use(VueDataTables)
localVue.use(Vuex)
localVue.prototype.$http = jest.fn()
localVue.component("add-button", AddButton)
localVue.component("edit-button", EditButton)
localVue.component("delete-button", DeleteButton)
localVue.component("copy-clipboard-button", CopyToClipboardButton)
localVue.component("refresh-button", RefreshButton)
localVue.component("loading", LoadingAnimation)
localVue.component(BaseButton.name, BaseButton)
localVue.component(BaseInput.name, BaseInput)
localVue.component(Card.name, Card)

// Store
const actions = {
  authorizeAccount: jest.fn(),
  deleteAccount: jest.fn(),
  fetchAccounts: jest.fn()
}

const state = {
  accounts: testDataAccounts,
}

const getters = {
  getAccounts: (state) => state.accounts
}

const store = new Vuex.Store({
  state: rootState,
  getters: rootGetters,
  modules: {
    googleAdsense: {
      namespaced: true,
      state,
      actions,
      mutations,
      getters
    },
  },
})

// Router
const router = new VueRouter()

const wrapper = shallowMount(Home, {
  localVue,
  router,
  store,
  mixins: [TourMixin],
  data() {
    return {
      accountDelete: {},
      loadingBtn: false,
      authorizing: false
    }
  },
  mocks: {
    $notify: jest.fn(),
    $t: jest.fn(),
  },

})

describe("home.vue", () => {

  const accounts = testDataAccounts

  it("is Home", () => {
    expect(wrapper.is(Home)).toBe(true)
  })
  describe("computed properties", () => {
    xit("accountsReady", () => {
      expect(wrapper.vm.accountsReady).toBe(true)
    })
    it("accounts", () => {
      expect(wrapper.vm.accounts).toEqual(accounts)
    })
  })
  it("remove account", async () => {
    await wrapper.vm.remove({id: "id"})
    expect(actions.deleteAccount).toHaveBeenCalled()
  })
  it("authorize new account", async () => {
    wrapper.vm.authorizeNewAccount({})
    expect(actions.authorizeAccount).toHaveBeenCalled()
  })

})
