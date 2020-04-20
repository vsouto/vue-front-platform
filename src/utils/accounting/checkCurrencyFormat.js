function _checkCurrencyFormat(format) {
  // Format should be a string, in which case `value` ('%v') must be present:
  if (typeof(format) == "string" && format.match("%v")) {
    // Create and return positive, negative and zero formats:
    return {
      pos: format,
      neg: format.replace("-", "").replace("%v", "-%v"),
      zero: format
    }
  }

  // Otherwise, assume format was fine:
  return format
}

export default _checkCurrencyFormat
