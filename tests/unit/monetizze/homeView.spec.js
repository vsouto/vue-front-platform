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
import pt_BR from "vee-validate/dist/locale/pt_BR"
import VeeValidate, { Validator } from "vee-validate"

// Shared
import AddButton from "@/components/shared/AddButton"
import EditButton from "@/components/shared/EditButton"
import DeleteButton from "@/components/shared/DeleteButton"
import RefreshButton from "@/components/shared/RefreshButton"
import CopyToClipboardButton from "@/components/shared/CopyToClipboardButton"

// Local
import Home from "@/monetizze/views/home"
import AccountModel from "@/monetizze/models/account"
import TourMixin from "@/components/shared/mixins/TourMixin"
import { SweetModal } from "sweet-modal-vue"

// Test data
import {
  testDataAccounts
} from "../../data/monetizze"

// Store
import rootState from "@/store/state"
import * as rootGetters from "@/store/getters"
import { mutations } from "@/store/modules/monetizze"

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(VueMoment, {
  moment
})
localVue.use(BootstrapVue)
localVue.use(VueTour)
localVue.use(VueDataTables)
localVue.use(VeeValidate, {
  fieldsBagName: "veeFields"
})
Validator.localize("pt_BR", pt_BR)
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
localVue.component("sweet-modal", SweetModal)


// Store
const actions = {
  getAccounts: jest.fn(),
  deleteAccount: jest.fn(),
  newAccount: jest.fn(() => Promise.resolve({
    data: testDataAccounts[0]
  })),
  addAccount: jest.fn(),
  getToken: jest.fn()
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
    monetizze: {
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

// Wrapper
const wrapper = shallowMount(Home, {
  localVue,
  router,
  store,
  mixins: [TourMixin],
  data() {
    return {
      accountDelete: {},
      loadingBtn: false,
      form: new AccountModel(testDataAccounts[0]),
      authorizing: false
    }
  },
  mocks: {
    $notify: jest.fn(),
    $t: jest.fn(),
    errors: {
      first: jest.fn()
    }
  }
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

  it("remove account", () => {
    wrapper.vm.remove({
      id: accounts[0].id
    })
    expect(actions.deleteAccount).toHaveBeenCalled()

  })

  it("add newAccount", async () => {
    await wrapper.vm.newAccount()
    expect(actions.newAccount).toHaveBeenCalled()
  })

})
