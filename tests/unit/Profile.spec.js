import Vuex from "vuex"
import BootstrapVue from "bootstrap-vue"
import { BaseInput, BaseButton } from "@/components/lib"
import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import VueRouter from "vue-router"
import LoadingAnimation from "@/components/shared/LoadingAnimation"
import Profile from "@/views/Profile"
import {
  account
} from "../data/user"

const localVue = createLocalVue()
localVue.component("loading", LoadingAnimation)
localVue.component(BaseButton.name, BaseButton)
localVue.component(BaseInput.name, BaseInput)
localVue.use(VueRouter)
localVue.use(Vuex)
const router = new VueRouter()
localVue.use(BootstrapVue)

const actions = {
  updateUser: jest.fn(() => Promise.resolve({
    data: {
      user_metadata: {
        firstname: "",
        lastname: ""
      }}
  })),
  fetchUser: jest.fn(() => Promise.resolve({
    data: {
      user_metadata: {
        firstname: "",
        lastname: ""
      }}
  }))
}

const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,
      state: {
        user: account.user
      },
      getters: {
        userMetaData: () => account.user.user_metadata,
        user: () => account.user
      },
      actions
    },
  },
})

const wrapper = shallowMount(Profile, {
  localVue,
  router,
  store,
  mocks: {
    $notify: jest.fn()
  }
})

describe("Profile.vue", () => {
  it("is Profile", () => {
    expect(wrapper.is(Profile)).toBe(true)
  })

  it("should prefetch user", () => {
    expect(actions.fetchUser).toHaveBeenCalled()
  })

  it("computed correct email", () => {
    expect(wrapper.vm.userData.email).toEqual("dev@painelintegrado.com.br")
  })

  it("correct initial data", () => {
    expect(wrapper.vm.user.firstname).toEqual("test fname")
    expect(wrapper.vm.user.lastname).toEqual("test lname")
  })

  it("should trigger updateUser action on save", () => {
    wrapper.vm.save()
    expect(actions.updateUser).toHaveBeenCalled()
  })
})

