import _checkPrecision from "./checkPrecision"
import settings from "./settings"

function toFixed(value, precision) {
  precision = _checkPrecision(precision, settings.precision)
  const power = Math.pow(10, precision)

  // Multiply up by precision, round accurately, then divide and use native toFixed():
  return (Math.round((value + 1e-8) * power) / power).toFixed(precision)
}

export default toFixed
