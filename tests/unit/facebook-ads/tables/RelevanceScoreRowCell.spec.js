import BootstrapVue from "bootstrap-vue"
import RelevanceScoreRowCell from "@/facebook_ads/components//RelevanceScoreRowCell"

import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import { BaseButton } from "@/components/lib"
import { Tooltip } from "element-ui"

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
    relevance_score: {
      score: 25,
      status: "status"
    },
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

const getRowInsightsFunction = (row) => {
  return row.insights && row.insights.length > 0 ? row.insights[0] : row.insights || {}
}

const wrapper = shallowMount(RelevanceScoreRowCell, {
  localVue,
  propsData: {
    row: row,
    getRowInsights: getRowInsightsFunction,
  },
  mocks: {
    $router,
    $t: jest.fn(()=> "text")
  }
})

describe("RelevanceScoreRowCell.vue", () => {
  it("is RelevanceScoreRowCell", () => {
    expect(wrapper.is(RelevanceScoreRowCell)).toBe(true)
  })
  describe("computed properties", () => {
    it("relevanceScore", () => {
      expect(wrapper.vm.relevanceScore).toEqual(25)
    })
    it("text", () => {
      expect(wrapper.vm.text).toEqual("Ótimo!")
    })
    it("notEnoughImpressions", () => {
      expect(wrapper.vm.notEnoughImpressions).toBe(false)
    })
    it("variant", () => {
      expect(wrapper.vm.variant).toEqual("success")
    })
  })
})
