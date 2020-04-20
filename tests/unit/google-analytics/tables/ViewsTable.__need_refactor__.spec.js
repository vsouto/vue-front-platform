import Vuex from "vuex"
import BootstrapVue from "bootstrap-vue"
import ViewsTable from "@/google_analytics/components/ViewsTable"

import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import VueRouter from "vue-router"
import {
  views
} from "../../../data/google-analytics"
import {
  Card
} from "@/components/lib"
const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)
localVue.use(BootstrapVue)
localVue.component(Card.name, Card)
import * as rootGetters from "@/store/getters"

const router = new VueRouter()

const actions = {
  selectViewToAdd: jest.fn()
}

const store = new Vuex.Store({
  state: {
    fetch_control: {
      "googleAnalytics/views": "fetched"
    }
  },
  getters: rootGetters,
  modules: {
    googleAnalytics: {
      namespaced: true,
      actions
    }
  }
})

const wrapper = shallowMount(ViewsTable, {
  localVue,
  router,
  store,
  propsData: {
    views: views(),
    activeViews: []
  },
  mocks: {
    $t: jest.fn()
  }
})

describe("ViewsTable.vue", () => {
  it("is ViewsTable", () => {
    expect(wrapper.is(ViewsTable)).toBe(true)
  })
  it("computed should have valid values", () => {
    expect(wrapper.vm.computedTableData).toEqual(views())
    expect(wrapper.vm.isReady).toBe(true)
  })
  it("selectView method", () => {
    wrapper.vm.selectView({}, true)
    expect(actions.selectViewToAdd).toHaveBeenCalled()
  })
  it("isViewAdded method", () => {
    let data = wrapper.vm.isViewAdded(1)
    expect(data).toBe(false)
  })
  it("isViewSelected method", () => {
    let data = wrapper.vm.isViewSelected(1)
    expect(data).toBe(false)
  })
})
