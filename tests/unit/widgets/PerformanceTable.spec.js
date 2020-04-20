import { shallowMount, createLocalVue } from "@vue/test-utils"

import BootstrapVue from "bootstrap-vue"
import VueDataTables from "vue-data-tables"
import PerformanceTable from "@/components/widgets/PerformanceTable"
import LoadingAnimation from "@/components/shared/LoadingAnimation"
import { BaseButton, Card } from "@/components/lib"
import { TableColumn } from "element-ui"
import Vuex from "vuex"
import VueMoment from "vue-moment"
import moment from "moment-timezone"
import WidgetModel from "@/models/widget"

const localVue = createLocalVue()
localVue.component("loading", LoadingAnimation)
localVue.component("el-table-column", TableColumn)
localVue.component(BaseButton.name, BaseButton)
localVue.component(Card.name, Card)
localVue.use(Vuex)
localVue.use(BootstrapVue)
localVue.use(VueMoment, {
  moment
})
localVue.use(VueDataTables)

const actions = {
  fetchWidget: jest.fn()
}

const mockedRoute = {
  params: {
    id: 1
  }
}

const store = new Vuex.Store({
  state: {
    isLoading: false,
    fetch_control: {"fetchWidget/1/table": "fetched"},
    errored_control: {}
  },
  getters: {
    isLoading: state => state.isLoading,
    isFetching: state => attr => state.fetch_control[attr] && state.fetch_control[attr] == "fetching",
    isFetched: state => attr => state.fetch_control[attr] && state.fetch_control[attr] == "fetched",
    canFetch: state => attr => !state.fetch_control[attr],
    isReady: state => attr => state.fetch_control[attr] && (
      state.fetch_control[attr] != "fetching" ||
      state.fetch_control[attr] == "fetched"
    ),
    isErrored: state => attr => state.errored_control[attr] && state.errored_control[attr] == "error"
  },
  modules: {
    panel: {
      namespaced: true,
      getters: {
        getCurrentPanelStats: () => () => Object(),
        getWidgetStatsByIds: () => () => Object()
      },
      actions
    }
  }
})
const wrapper = shallowMount(PerformanceTable, {
  localVue,
  store,
  mocks: {
    $route: mockedRoute,
    $t: jest.fn()
  },
  propsData: {
    panelId: "panelId",
    widget: new WidgetModel({}),
    rowHeight: 50
  }
})

describe("PerformanceTable.vue", () => {
  it("is PerformanceTable", () => {
    expect(wrapper.is(PerformanceTable)).toBe(true)
  })

  xit("should prefetch data", () => {
    expect(actions.fetchWidget).toHaveBeenCalled()
  })

  xit("computed should have valid values", () => {
    expect(wrapper.vm.tableData).toEqual([])
    expect(wrapper.vm.queriedData).toEqual([])
    expect(wrapper.vm.isReady).toBe(false)

    wrapper.setData({
      pagination: {
        perPage: 5,
        currentPage: 1
      }
    })
    expect(wrapper.vm.to).toEqual(0)
    expect(wrapper.vm.from).toEqual(0)
  })

  xit("formatPercentage calculateROI", () => {
    let roi = wrapper.vm.calculateROI(10, 2)
    let formatted = wrapper.vm.formatPercentage(roi, true, 0, "%")
    expect(formatted).toEqual("400%")
  })
  xit("formatCurrency", () => {
    let currency = wrapper.vm.formatCurrency(5)
    expect(currency).toEqual("R$ 5,00")
  })
  xit("formatCurrency calculateRevenue", () => {
    let revenue = wrapper.vm.calculateRevenue(5, 0)
    let formatted = wrapper.vm.formatCurrency(revenue)
    expect(formatted).toEqual("R$ 5,00")
  })
  xit("tableRowClassName", () => {
    let data = wrapper.vm.tableRowClassName({ row: { earn: 10, spend: 2 }, rowIndex: 1 })
    expect(data).toEqual("")
  })
  xit("tableCellClassName", () => {
    let data = wrapper.vm.tableCellClassName({
      row: { earn: 10, spend: 2 },
      column: { property: "roi" },
      columnIndex: 1,
      rowIndex: 1
    })
    expect(data).toEqual("text-success")
  })
})
