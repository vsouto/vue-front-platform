import formatMoney from "@/utils/accounting/formatMoney"
import _checkCurrencyFormat from "@/utils/accounting/checkCurrencyFormat"
import _checkPrecision from "@/utils/accounting/checkPrecision"
import formatNumber from "@/utils/accounting/formatNumber"
import toFixed from "@/utils/accounting/toFixed"
import _stripInsignificantZeros from "@/utils/accounting/stripInsignificantZeros"

describe("accounting functions", () => {
  it("formatMoney", () => {
    let money = formatMoney(100251)
    expect(money).toEqual("$100,251.00")
  })

  it("_stripInsignificantZeros", () => {
    let number = _stripInsignificantZeros("100251.50", ".")
    expect(number).toEqual("100251.5")
  })

  it("_checkPrecision", () => {
    let number = _checkPrecision(100251.2)
    expect(number).toEqual(100251)
  })

  it("checkCurrencyFormat", () => {
    let format = "%s%v"
    let newFormat = _checkCurrencyFormat(format)
    expect(newFormat).toEqual({"neg": "%s-%v", "pos": "%s%v", "zero": "%s%v"})
  })

  it("formatNumber", () => {
    let number = formatNumber(100251)
    expect(number).toEqual("100,251.00")
  })

  it("toFixed", () => {
    let number = toFixed(100251)
    expect(number).toEqual("100251.00")
  })
})
