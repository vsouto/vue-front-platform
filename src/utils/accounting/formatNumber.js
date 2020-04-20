import _stripInsignificantZeros from "./stripInsignificantZeros"
import settings from "./settings"
import toFixed from "./toFixed"

function formatNumber(number, opts = {}) {
  // Resursively format arrays:
  if (Array.isArray(number)) {
    return number.map((val) => formatNumber(val, opts))
  }

  // Build options object from second param (if object) or all params, extending defaults:
  opts = Object.assign({},
    settings,
    opts
  )

  // Do some calc:
  const negative = number < 0 ? "-" : ""
  const base = parseInt(toFixed(Math.abs(number), opts.precision), 10) + ""
  const mod = base.length > 3 ? base.length % 3 : 0

  // Format the number:
  const formatted = negative +
    (mod ? base.substr(0, mod) + opts.thousand : "") +
      base.substr(mod).replace(/(\d{3})(?=\d)/g, "$1" + opts.thousand) +
        (opts.precision > 0 ? opts.decimal + toFixed(Math.abs(number), opts.precision).split(".")[1] : "")

  return opts.stripZeros ? _stripInsignificantZeros(formatted, opts.decimal) : formatted
}

export default formatNumber
