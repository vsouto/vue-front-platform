import Vuex from "vuex"
import BootstrapVue from "bootstrap-vue"
import LimitedUsersTable from "@/components/limited-users/LimitedUsersTable"

import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import VueRouter from "vue-router"
import {
  limitedUsers
} from "../../data/limited-user"
import {
  Card
} from "@/components/lib"
const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)
localVue.use(BootstrapVue)
localVue.component(Card.name, Card)

const router = new VueRouter()

const store = new Vuex.Store({
  state: {
    fetch_control: { "limitedUsers": "fetched" },
  },
  getters: {
    isReady: state => attr => state.fetch_control[attr] && (
      state.fetch_control[attr] != "fetching" ||
      state.fetch_control[attr] == "fetched"
    )
  },
  modules: {
    limitedUser: {
      namespaced: true,
      state: {
        fetched: true,
        limited_users: limitedUsers()
      },
      getters: {
        fetched: state => state.fetched,
      },
    }
  }

})

const wrapper = shallowMount(LimitedUsersTable, {
  localVue,
  router,
  store,
  propsData: {
    users: limitedUsers(),
  },
  mocks: {
    $t: jest.fn()
  }
})

describe("LimitedUsersTable.vue", () => {
  it("is LimitedUsersTable", () => {
    expect(wrapper.is(LimitedUsersTable)).toBe(true)
  })
  it("computed should have valid values", () => {
    expect(wrapper.vm.computedTableData).toEqual(limitedUsers())
    expect(wrapper.vm.isReady).toBe(true)
  })
  it("panelsFormatter method", () => {
    let data = wrapper.vm.panelsFormatter(limitedUsers()[0])
    expect(data).toEqual([])
  })
  it("widgetsFormatter method", () => {
    let data = wrapper.vm.widgetsFormatter(limitedUsers()[0])
    expect(data).toEqual([])
  })
})
