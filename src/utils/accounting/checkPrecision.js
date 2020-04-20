function _checkPrecision(val, base) {
  val = Math.round(Math.abs(val))
  return isNaN(val) ? base : val
}

export default _checkPrecision
