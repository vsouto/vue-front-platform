import Vuex from "vuex"
import BootstrapVue from "bootstrap-vue"
import AffiliationsTable from "@/hotmart/components//AffiliationsTable"
import * as rootGetters from "@/store/getters"

import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import VueRouter from "vue-router"
import {
  Card
} from "@/components/lib"
import {
  testDataAffiliations
} from "../../data/hotmart"

const localVue = createLocalVue()
localVue.component(Card.name, Card)
localVue.use(VueRouter)
localVue.use(Vuex)
localVue.use(BootstrapVue)

const router = new VueRouter()

const store = new Vuex.Store({
  state: {},
  getters: rootGetters
})

const wrapper = shallowMount(AffiliationsTable, {
  localVue,
  store,
  router,
  propsData: {
    affiliations: testDataAffiliations
  },
  mocks: {
    $t: jest.fn()
  }
})

describe("AffiliationsTable.vue", () => {
  it("is AffiliationsTable", () => {
    expect(wrapper.is(AffiliationsTable)).toBe(true)
  })
  it("сomputedTableData", () => {
    expect(wrapper.vm.computedTableData).toEqual(testDataAffiliations)
  })
  it("hotlinksFormatter method", () => {
    let data = wrapper.vm.hotlinksFormatter({}, {}, {
      alternative_pages: [{
        id: 1,
        name: "page"
      }]
    }, 1)
    expect(data).toEqual(1)
  })
})
