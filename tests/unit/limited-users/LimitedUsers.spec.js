import Vuex from "vuex"
import BootstrapVue from "bootstrap-vue"
import VueRouter from "vue-router"
import { BaseButton, Card } from "@/components/lib"
import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import LimitedUsers from "@/views/LimitedUsers"
import LoadingAnimation from "@/components/shared/LoadingAnimation"
const localVue = createLocalVue()
localVue.component("loading", LoadingAnimation)
localVue.component(BaseButton.name, BaseButton)
localVue.component(Card.name, Card)
localVue.use(BootstrapVue)
localVue.use(Vuex)
localVue.use(VueRouter)

import {
  limitedUsers
} from "../../data/limited-user"


const router = new VueRouter()

const vuelidateStub = () => ({
  $error: false,
  $model: "",
  $touch: jest.fn()
})

const $v = {
  form: {
    email: vuelidateStub(),
    password: {
      ...vuelidateStub(),
      $params: {
        minLength: {}
      }
    },
    firstname: vuelidateStub(),
    lastname: vuelidateStub(),
  },
  $touch: jest.fn(),
  $invalid: false,
}

const actions = {
  fetchLimitedUsers: jest.fn(),
  createLimitedUser: jest.fn(),
  updateLimitedUser: jest.fn(),
  deleteLimitedUser: jest.fn(),
}

let state = {
  fetched: true,
  limited_users: limitedUsers(),
  limited_user: limitedUsers()[0],
}

const store = new Vuex.Store({
  state: {
    isLoading: false,
  },
  getters: {
    isLoading: state => state.isLoading
  },
  modules: {
    limitedUser: {
      namespaced: true,
      state: state,
      actions,
    },
  }
})

const wrapper = shallowMount(LimitedUsers, {
  localVue,
  store,
  router,
  mocks: {
    $v,
    show: jest.fn(),
    hide: jest.fn(),
    $notify: jest.fn()
  }
})

describe("LimitedUsers.vue", () => {
  it("is LimitedUsers", () => {
    expect(wrapper.is(LimitedUsers)).toBe(true)
  })
  it("should pre-fill data", () => {
    expect(actions.fetchLimitedUsers).toHaveBeenCalled()
  })

  describe("methods", () => {
    it("submit", () => {
      wrapper.vm.submit()
    })
    it("add", () => {
      wrapper.vm.add()
      expect(actions.createLimitedUser).toHaveBeenCalled()
    })
    it("edit", () => {
      wrapper.vm.edit()
      expect(actions.updateLimitedUser).toHaveBeenCalled()
    })
    it("remove", () => {
      wrapper.vm.remove()
      expect(actions.deleteLimitedUser).toHaveBeenCalled()
    })
    it("openAddModal", () => {
      wrapper.vm.openAddModal()
      expect(wrapper.vm.showForm).toBe(true)
    })
    it("openEditModal", () => {
      wrapper.vm.openEditModal(limitedUsers()[0])
      expect(wrapper.vm.editingUserId).toEqual(1)
      expect(wrapper.vm.modalTitle).toEqual("Editando dev@painelintegrado.com.br")
      expect(wrapper.vm.form).toEqual({
        email: "dev@painelintegrado.com.br",
        password: "dummydummy",
        firstname: "dev",
        lastname: "developer",
        limited_auth_id: 1
      })
    })
    it("openDelModal", () => {
      wrapper.vm.openDelModal(limitedUsers()[0])
      expect(wrapper.vm.deletingUserId).toEqual(1)
      expect(wrapper.vm.modalTitle).toEqual("Removendo dev@painelintegrado.com.br")
    })
  })

  describe("computed properties", () => {
    it("isAdd", () => {
      wrapper.setData({
        editingUserId: false,
        deletingUserId: false
      })
      expect(wrapper.vm.isAdd).toBe(true)
    })
    it("isLoading", () => {
      expect(wrapper.vm.isLoading).toBe(false)
    })
    it("fetched", () => {
      expect(wrapper.vm.fetched).toEqual(state.fetched)
    })
    it("limitedUsers", () => {
      expect(wrapper.vm.limitedUsers).toEqual(state.limited_users)
    })
    it("limitedUser", () => {
      expect(wrapper.vm.limitedUser).toEqual(state.limited_user)
    })
  })
})
