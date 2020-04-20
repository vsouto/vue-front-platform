import BootstrapVue from "bootstrap-vue"
import SpendRowCell from "@/facebook_ads/components//SpendRowCell"
import { formatCurrency } from "@/utils/formatters"

jest.mock("sweetalert2")
import swal from "@/__mocks__/sweetalert2"
import { Tooltip } from "element-ui"

import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(Tooltip)

const $router = {
  push: jest.fn()
}

let row = {
  budget_remaining: 120,
  daily_budget: 25,
  insights: [{
    spend: 25,
    outbound_clicks: 25,
    cost_per_outbound_click: 25,
    outbound_clicks_ctr: 25,
    cost_per_action_type: [{
      action_type: "offsite_conversion.fb_pixel_initiate_checkout",
      value: 25
    }, {
      action_type: "offsite_conversion.fb_pixel_purchase",
      value: 25
    }],
    actions: [{
      action_type: "offsite_conversion.fb_pixel_initiate_checkout",
      value: 25
    }, {
      action_type: "offsite_conversion.fb_pixel_purchase",
      value: 25
    }]
  }],
}

const formatCurrencyFunction = (v, symbol = "R$", precision = 2) => {
  return formatCurrency(v, symbol, precision)
}

const getRowInsightsFunction = (row) => {
  return row.insights && row.insights.length > 0 ? row.insights[0] : row.insights || {}
}

const wrapper = shallowMount(SpendRowCell, {
  localVue,
  propsData: {
    index: 1,
    row: row,
    formatCurrency: formatCurrencyFunction,
    getRowInsights: getRowInsightsFunction
  },
  mocks: {
    $router,
    $t: jest.fn()
  }
})

describe("SpendRowCell.vue", () => {
  it("is SpendRowCell", () => {
    expect(wrapper.is(SpendRowCell)).toBe(true)
  })
  describe("computed properties", () => {
    it("spend", () => {
      expect(wrapper.vm.spend).toEqual(25)
    })
    it("formattedSpend", () => {
      expect(wrapper.vm.formattedSpend).toEqual("R$ 25,00")
    })
    it("budgetRemaining", () => {
      expect(wrapper.vm.budgetRemaining).toEqual(1.2)
    })
    it("formattedBudgetRemaining", () => {
      expect(wrapper.vm.formattedBudgetRemaining).toEqual("R$ 1,20")
    })
    it("dailyBudget", () => {
      expect(wrapper.vm.dailyBudget).toEqual(0.25)
    })
    it("baseProgressValue", () => {
      expect(wrapper.vm.baseProgressValue).toEqual(95)
    })
  })
  it("handleEditDailyBudget", () => {
    wrapper.vm.handleEditDailyBudget(1, row)
    expect(swal).toHaveBeenCalled()
  })
})
