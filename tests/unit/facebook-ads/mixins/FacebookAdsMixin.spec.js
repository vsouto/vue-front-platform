import {
  shallowMount
} from "@vue/test-utils"
import FacebookAdsMixin from "@/components/shared/mixins/FacebookAdsMixin"

const wrapper = shallowMount(FacebookAdsMixin, {
  render: function (createElement) {
    return createElement(
      "div"
    )
  },
})

describe("FacebookAdsMixin", () => {
  it("getRowInsights", () => {
    let data = wrapper.vm.getRowInsights({
      insights: ["one", "two"]
    })
    expect(data).toEqual("one")
  })

  it("getRowActionCost", () => {
    let data = wrapper.vm.getRowActionCost({
      insights: [{
        cost_per_action_type: [{
          action_type: "type",
          value: 25
        }]
      }]
    }, "type")
    expect(data).toEqual("R$ 25,00")
  })

  it("getRowActionValue", () => {
    let data = wrapper.vm.getRowActionValue({
      insights: [{
        actions: [{
          action_type: "type",
          value: 25
        }]
      }]
    }, "type")
    expect(data).toEqual(25)
  })

  it("getRowActionListValue", () => {
    let data = wrapper.vm.getRowActionListValue({
      insights: [{
        actions: [{
          action_type: "type",
          value: 25
        }]
      }]
    }, "actions")
    expect(data).toEqual(25)
  })

  it("getInsightValue", () => {
    let data = wrapper.vm.getInsightValue({
      insights: [{
        actions: [{
          action_type: "type",
          value: 25
        }]
      }]
    }, "actions")
    expect(data).toEqual(25)
  })

  it("sortByInsight", () => {
    let data = wrapper.vm.sortByInsight({
      insights: [{
        actions: [{
          action_type: "type",
          value: 25
        }]
      }]
    },
    {
      insights: [{
        actions: [{
          action_type: "type",
          value: 20
        }]
      }]
    },  "actions")
    expect(data).toEqual(1)
  })

  it("sortByInsightAction", () => {
    let data = wrapper.vm.sortByInsightAction({
      insights: [{
        actions: [{
          action_type: "type",
          value: 25
        }]
      }]
    },
    {
      insights: [{
        actions: [{
          action_type: "type",
          value: 20
        }]
      }]
    },  "type")
    expect(data).toEqual(1)
  })

  it("sortByInsightActionCost", () => {
    let data = wrapper.vm.sortByInsightActionCost({
      insights: [{
        cost_per_action_type: [{
          action_type: "type",
          value: 25
        }]
      }]
    },
    {
      insights: [{
        cost_per_action_type: [{
          action_type: "type",
          value: 20
        }]
      }]
    },
    "type")
    expect(data).toEqual(1)
  })

  let a = {
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

  let b = {
    insights: [{
      spend: 20,
      outbound_clicks: 20,
      cost_per_outbound_click: 20,
      outbound_clicks_ctr: 20,
      cost_per_action_type: [{
        action_type: "offsite_conversion.fb_pixel_initiate_checkout",
        value: 20
      }, {
        action_type: "offsite_conversion.fb_pixel_purchase",
        value: 20
      }],
      actions: [{
        action_type: "offsite_conversion.fb_pixel_initiate_checkout",
        value: 20
      }, {
        action_type: "offsite_conversion.fb_pixel_purchase",
        value: 20
      }]
    }]
  }

  it("sort functions should return valid values", () => {
    let functions = [
      "sortBySpend",
      "sortByClicks",
      "sortByCPC",
      "sortByCTR",
    ]
    functions.map((func) => {
      let data = wrapper.vm[func](a, b)
      expect(data).toEqual(1)
    })
  })

  it("sortByCheckout", () => {
    let data = wrapper.vm.sortByCheckout(a, b)
    expect(data).toEqual(1)
  })
  it("sortByCostCheckout", () => {
    let data = wrapper.vm.sortByCostCheckout(a, b)
    expect(data).toEqual(1)
  })
  it("sortByPurchase", () => {
    let data = wrapper.vm.sortByPurchase(a, b)
    expect(data).toEqual(1)
  })
  it("sortByCostPurchase", () => {
    let data = wrapper.vm.sortByCostPurchase(a, b)
    expect(data).toEqual(1)
  })


})
