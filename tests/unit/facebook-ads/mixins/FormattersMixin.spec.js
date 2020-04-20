import {
  shallowMount,
} from "@vue/test-utils"
import FormattersMixin from "@/components/shared/mixins/FormattersMixin"

const wrapper = shallowMount(FormattersMixin, {
  render: function (createElement) {
    return createElement(
      "div"
    )
  },
})

describe("FormattersMixin", () => {
  it("formatCurrency", () => {
    let money = wrapper.vm.formatCurrency(25)
    expect(money).toEqual(" 25,00")
    let moneyBRL = wrapper.vm.formatCurrency(25, "R$")
    expect(moneyBRL).toEqual("R$ 25,00")
  })
  it("formatPercentage", () => {
    let money = wrapper.vm.formatPercentage(25)
    expect(money).toEqual("25")
  })
  it("formatInteger", () => {
    let money = wrapper.vm.formatInteger(25)
    expect(money).toEqual("25")
  })
  it("formatFloat", () => {
    let money = wrapper.vm.formatFloat(25)
    expect(money).toEqual("25.00")
  })
})
