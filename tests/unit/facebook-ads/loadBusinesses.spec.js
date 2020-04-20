import Vuex from "vuex"
import BootstrapVue from "bootstrap-vue"

import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import FacebookAdsLoadBusinesses from "@/facebook_ads/views/loadBusinesses"
import {
  testDataBusinesses
} from "../../data/facebook-ads"

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(BootstrapVue)

const actions = {
  fetchProfileBusinesses: jest.fn(),
  fetchProfileAccounts: jest.fn()
}

const mutations = {
  SET_BUSINESS_ID: jest.fn()
}

const $router = {
  push: jest.fn()
}

let state = {
  profile: testDataBusinesses[0],
  fetched: false,
  business_id: 1
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
        getProfileById: () => () => ({
          id: 1,
          access_token: "token"
        }),
        getProfileBusinessesById: () => () => [],
        businessId: state => state.businessId
      },
      actions,
      mutations
    },
  },
})

const wrapper = shallowMount(FacebookAdsLoadBusinesses, {
  localVue,
  store,
  mocks: {
    $router,
    $t: jest.fn()
  },
  propsData: {
    profileId: "1"
  }
})

describe("FacebookAdsLoadBusinesses.vue", () => {
  it("is FacebookAdsLoadBusinesses", () => {
    expect(wrapper.is(FacebookAdsLoadBusinesses)).toBe(true)
  })
  it("should call action if profile exists", () => {
    expect(actions.fetchProfileBusinesses).toHaveBeenCalled()
  })
  it("loadBusinessAccounts method", () => {
    wrapper.vm.loadBusinessAccounts(1, [])
    expect($router.push).toHaveBeenCalled()
  })

  describe("computed properties", () => {
    it("profile", () => {
      expect(wrapper.vm.profile).toEqual({
        id: 1,
        access_token: "token"
      })
    })
    it("profileBusinesses", () => {
      expect(wrapper.vm.profileBusinesses).toEqual([])
    })
  })
})
