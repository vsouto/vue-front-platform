import BootstrapVue from "bootstrap-vue"
import DailyBudgetRowCell from "@/facebook_ads/components//DailyBudgetRowCell"
import BaseColumn from "@/facebook_ads/components/columns/BaseColumn"

jest.mock("sweetalert2")
import swal from "@/__mocks__/sweetalert2"
import { BaseButton } from "@/components/lib"
import { Tooltip } from "element-ui"

import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"

const localVue = createLocalVue()
localVue.component(BaseButton.name, BaseButton)
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

const formatCurrencyFunction = BaseColumn.methods.formatCurrency

const callback = jest.fn()

const wrapper = shallowMount(DailyBudgetRowCell, {
  localVue,
  propsData: {
    index: 1,
    row: row,
    formatCurrency: formatCurrencyFunction,
    callback: callback
  },
  mocks: {
    $router,
    $t: jest.fn(()=> "text")
  }
})

describe("DailyBudgetRowCell.vue", () => {
  it("is DailyBudgetRowCell", () => {
    expect(wrapper.is(DailyBudgetRowCell)).toBe(true)
  })
  describe("computed properties", () => {
    it("tooltip", () => {
      expect(wrapper.vm.tooltip).toEqual("text")
    })
    xit("formattedNewValue", () => {
      expect(wrapper.vm.formattedNewValue).toEqual("R$ 0,25")
    })
  })
  it("handleEditDailyBudget", () => {
    wrapper.vm.handleEditDailyBudget(1, row)
    expect(swal).toHaveBeenCalled()
  })
})
