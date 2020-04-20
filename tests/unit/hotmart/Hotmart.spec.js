import Vuex from "vuex"
import BootstrapVue from "bootstrap-vue"
import * as rootGetters from "@/store/getters"

import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import Hotmart from "@/hotmart/views/home"
import LoadingAnimation from "@/components/shared/LoadingAnimation"
import {
  BaseButton, BaseInput, Card
} from "@/components/lib"
import {
  testDataAccounts
} from "../../data/hotmart"

const localVue = createLocalVue()
localVue.component("loading", LoadingAnimation)
localVue.component(BaseInput.name, BaseInput)
localVue.component(BaseButton.name, BaseButton)
localVue.component(Card.name, Card)
localVue.use(Vuex)
localVue.use(BootstrapVue)

const $router = {
  replace: jest.fn(),
  push: jest.fn()
}

const $route = {
  path: "/hotmart/",
  query: {
    error_title:""
  }
}

const actions = {
  fetchAccountsWithProducts: jest.fn(),
  authorizeAccount: jest.fn(),
  deleteAccount: jest.fn()
}

let state = {
  accounts: testDataAccounts
}

const store = new Vuex.Store({
  state: {
    isLoading: false,
    fetch_control: {}
  },
  getters: rootGetters,
  modules: {
    hotmart: {
      namespaced: true,
      state: state,
      getters: {
        getAccounts: state => state.accounts
      },
      actions,
    }
  }
})

const wrapper = shallowMount(Hotmart, {
  localVue,
  store,
  mocks: {
    $router,
    $route,
    $notify: jest.fn(),
    $refs: {
      hotmartRemove: {
        show: jest.fn(),
        hide: jest.fn()
      }
    },
    $t: jest.fn()
  }
})

describe("Hotmart.vue", () => {
  it("is Hotmart", () => {
    expect(wrapper.is(Hotmart)).toBe(true)
  })
  it("computed should have valid values", () => {
    expect(wrapper.vm.accounts).toBe(testDataAccounts)
  })
  it("should render correct template", () => {
    expect(wrapper.find("#hot-mart").exists()).toBe(true)
  })
  it("should call correct actions", async () => {
    wrapper.setData({
      shopName: "store"
    })
    wrapper.vm.authorizeNewAccount({})
    expect(actions.authorizeAccount).toHaveBeenCalled()
    await wrapper.vm.remove({id: 1})
    expect(actions.deleteAccount).toHaveBeenCalled()
  })
  it("formatterProducts", () => {
    let data = wrapper.vm.formatterProducts({}, {}, [{}], 1)
    expect(data).toEqual(1)
  })
})
