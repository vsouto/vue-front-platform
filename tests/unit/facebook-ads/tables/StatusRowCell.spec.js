import BootstrapVue from "bootstrap-vue"
import StatusRowCell from "@/facebook_ads/components//StatusRowCell"

jest.mock("sweetalert2")
import swal from "@/__mocks__/sweetalert2"
import { BaseButton } from "@/components/lib"
import { Tooltip } from "element-ui"

import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.component(BaseButton.name, BaseButton)
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

const callback = jest.fn()

const wrapper = shallowMount(StatusRowCell, {
  localVue,
  propsData: {
    index: 1,
    row: row,
    callback: callback
  },
  mocks: {
    $router,
    $t: jest.fn(()=> "text")
  }
})

describe("StatusRowCell.vue", () => {
  it("is StatusRowCell", () => {
    expect(wrapper.is(StatusRowCell)).toBe(true)
  })
  describe("computed properties", () => {
    it("tooltip", () => {
      expect(wrapper.vm.tooltip).toEqual("text")
    })
  })
  it("isHovering", () => {
    wrapper.vm.isHovering("hover text")
    setTimeout(() => {
      expect(wrapper.vm.hovering).toHaveBeenCalled()
    }, 100)
  })
  it("handleEditStatus", () => {
    wrapper.vm.handleEditStatus(1, row)
    expect(swal).toHaveBeenCalled()
  })
})
