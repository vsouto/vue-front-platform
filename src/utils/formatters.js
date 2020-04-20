import moment from "moment-timezone"
import formatMoney from "./accounting/formatMoney.js"
import toFixed from "./accounting/toFixed.js"
import FORMATS from "@/constants/formats.js"

export function formatInteger(value) {
  // return value && parseInt(value).toLocaleString(locale) || '-'
  return (value && toFixed(value, 0)) || "-"
}

export function formatFloat(value, precision = 2) {
  // return value && parseFloat(value).toFixed(2) || '-'
  return (value && toFixed(value, precision)) || "-"
}

export function formatPercentage(value, multiply = true, decimals = 0, symbol = true) {
  // return value && parseFloat(value).toFixed(2) + "%" || "-"
  if (!value) return "-"
  value = parseFloat(value)
  if (multiply) value = value * 100
  value = toFixed(value, decimals)
  if (symbol) value = value + "%"
  return value
}

export function formatCurrency(value, symbol = "R$", precision = 2) {
  if (symbol == "BRL") symbol = "R$"
  else if (symbol == "USD") symbol = "U$"
  if (!value) return "-"
  let money = formatMoney(value, {
    symbol: symbol + " ",
    precision: precision,
    thousand: ".",
    decimal: ","
  })
  // console.debug('formatCurrency money', money)
  return money || "-"
}
export function formatHumanizedDate(momentDate) {
  return momentDate.isValid() ? momentDate.from(moment.now()) : "-"
}
export function formatDate(dt) {
  return moment(dt).format(FORMATS.date) || "-"
}
export function formatDatetime(dt) {
  return moment(dt).format(FORMATS.datetime) || "-"
}
export function formatDayMonth(dt) {
  return moment(dt).format(FORMATS.day_month) || "-"
}
