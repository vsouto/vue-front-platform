import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
jest.mock("axios")

// Global
import Vuex from "vuex"
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
import Home from "@/facebook_ads/views/home"
import OAuthCallbackMixin from "@/components/shared/mixins/OAuthCallbackMixin"
import TourMixin from "@/components/shared/mixins/TourMixin"

// Test data
import {
  testDataAccounts,
  testDataProfiles
} from "../../data/facebook-ads"

// Store
import rootState from "@/store/state"
import { mutations } from "@/store/modules/facebook-ads"

const localVue = createLocalVue()
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
  deleteProfile: jest.fn(() => Promise.resolve()),
  authorizeProfile: jest.fn(() => Promise.resolve("url")),
  deleteAccount: jest.fn(() => Promise.resolve())
}

const state = {
  profiles: testDataProfiles,
  accounts: testDataAccounts,
}

const getters = {
  getProfiles: (state) => state.profiles,
  getAccounts: (state) => state.accounts
}


const store = new Vuex.Store({
  state: rootState,
  getters: {
    isReady: () => () => true
  },
  modules: {
    facebookAds: {
      namespaced: true,
      state,
      actions,
      mutations,
      getters
    },
  }
})

// Router
const $router = {
  push: jest.fn()
}
const $route = {
  name: "FacebookAds",
  query: {}
}

const wrapper = shallowMount(Home, {
  localVue,
  store,
  mixins: [TourMixin, OAuthCallbackMixin],
  data() {
    return {
      authorizing: false,
      profileDelete: {},
      profileLoad: {},
      loadingBtn: false,
      accountDelete: {}
    }
  },
  mocks: {
    $notify: jest.fn(),
    $t: jest.fn(),
    $router,
    $route
  }
})

describe("home.vue", () => {
  const accounts = testDataAccounts,
    profiles = testDataProfiles

  it("is Home", () => {
    expect(wrapper.is(Home)).toBe(true)
  })

  xit("setCallbackListener", () => {
    expect(wrapper.vm.setCallbackListener).toHaveBeenCalled()
  })

  describe("computed properties", () => {
    xit("profilesReady", () => {
      expect(wrapper.vm.profilesReady).toBe(true)
    })
    it("profiles", () => {
      expect(wrapper.vm.profiles).toEqual(profiles)
    })
    xit("accountsReady", () => {
      expect(wrapper.vm.accountsReady).toBe(true)
    })
    it("accounts", () => {
      expect(wrapper.vm.accounts).toEqual(accounts)
    })
  })

  it("authorize new profile", () => {
    wrapper.vm.authorizeNewProfile()
    expect(actions.authorizeProfile).toHaveBeenCalled()
    // TODO expect(wrapper.vm.openOAuth).toHaveBeenCalledWith("url")
  })

  it("load profile business", () => {
    wrapper.vm.loadProfileBusinesses(profiles[0])
    expect($router.push).toHaveBeenCalledWith({
      name: "FacebookAdsLoadBusinesses",
      params: {
        profileId: profiles[0].id
      }
    })
  })
  it("remove profile", () => {
    wrapper.vm.removeProfile({id: 1})
    expect(actions.deleteProfile).toHaveBeenCalled()
  })
  it("remove account", () => {
    wrapper.vm.removeAccount({accountId: 1, profile_id: 1})
    expect(actions.deleteAccount).toHaveBeenCalled()
  })
})
