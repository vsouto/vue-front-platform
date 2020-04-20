import _checkCurrencyFormat from "./checkCurrencyFormat"
import settings from "./settings"
import formatNumber from "./formatNumber"

function formatMoney(number, opts = {}) {
  // Resursively format arrays:
  if (Array.isArray(number)) {
    return number.map((val) => formatMoney(val, opts))
  }

  // Build options object from second param (if object) or all params, extending defaults:
  opts = Object.assign({},
    settings,
    opts
  )

  // Check format (returns object with pos, neg and zero):
  const formats = _checkCurrencyFormat(opts.format)

  // Choose which format to use for this value:
  let useFormat

  if (number > 0) {
    useFormat = formats.pos
  } else if (number < 0) {
    useFormat = formats.neg
  } else {
    useFormat = formats.zero
  }

  // Return with currency symbol added:
  return useFormat
    .replace("%s", opts.symbol)
    .replace("%v", formatNumber(Math.abs(number), opts))
}

export default formatMoney
