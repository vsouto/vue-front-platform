/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
export function find(list, f) {
  return list.filter(f)[0]
}

/**
 * Compare two arrays
 *
 * @param {Array} array1
 * @param {Array} array2
 * @return {Boolean}
 */
export function isSameArray(array1, array2) {
  return array1.length === array2.length && array1.sort().every(function(value, index) { return value === array2.sort()[index]})
}

/**
 * Random pick from a list
 *
 * @param {Array} list
 * @return {Boolean}
 */
export function randomPick(list) {
  if (!(list instanceof Array)) return
  let idx = Math.floor(Math.random() * list.length)
  return list[idx]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
export function deepCopy(obj, cache = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== "object") {
    return obj
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, (c) => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach((key) => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}

/**
 * forEach for object
 */
export function forEachValue(obj, fn) {
  Object.keys(obj).forEach((key) => fn(obj[key], key))
}

export function isObject(obj) {
  return obj !== null && typeof obj === "object"
}

export function isPromise(val) {
  return val && typeof val.then === "function"
}

export function assert(condition, msg) {
  if (!condition) throw new Error(`[vuex] ${msg}`)
}

export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0
}

/**
 * Arithmetics
 */
export function average(list) {
  if (list.length == 0) return 0
  return list.reduce((prev, curr) => prev + curr) / list.length
}
export function percentage(v1, v2) {
  if (!v2) return 0
  return parseFloat(v1) / parseFloat(v2) * 100
}
export function calculateRevenue(earn, spend) {
  earn = parseFloat(earn) || 0
  spend = parseFloat(spend) || 0
  return earn - spend
}
export function calculateROI(earn, spend, multiplyCent = false) {
  earn = parseFloat(earn) || 0
  spend = parseFloat(spend) || 0
  if (spend == 0 || earn == 0) return 0
  let roi = (earn - spend) / spend
  if (multiplyCent) roi = roi * 100
  return roi
}
export function convertCurrency(amount, rate) {
  amount = parseFloat(amount) || 0
  rate = parseFloat(rate) || 1
  return amount * rate
}

/**
 * Class Variants
 */
export function getRoiVariant(roi) {
  if (!roi || roi == 0 || roi == "-") {
    return ""
  } else if (roi < 0) {
    return "text-red"
  } else if (roi > 0 && roi < 0.3) {
    return "text-pink"
  } else if (roi >= 0.3 && roi < 0.5) {
    return "text-purple"
  } else if (roi >= 0.5 && roi < 0.7) {
    return "text-blue"
  } else if (roi >= 0.7 && roi < 0.9) {
    return "text-teal"
  } else if (roi >= 0.9 && roi <= 1) {
    return "text-cyan"
  } else if (roi > 1) {
    return "text-success"
  }
  return ""
}

export function getRevenueVariant(revenue) {
  return !revenue || revenue == 0 ? "" : revenue < 0 ? "text-danger" : "text-success"
}


export function jsonToQueryString(obj) {
  return Object.keys(obj).map(k => k + "=" + encodeURIComponent(obj[k])).join("&")
}

