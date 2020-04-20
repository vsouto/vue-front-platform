import moment from "moment-timezone"
import FORMATS from "@/constants/formats"

moment.locale("pt_BR")

const now = moment()
const today = now.clone().startOf("day")
const yesterday = now
  .clone()
  .subtract(1, "day")
  .startOf("day")
const yesterday_end = now
  .clone()
  .subtract(1, "day")
  .endOf("day")

const month_first_day = now.clone().startOf("month")
const month_last_day = today

const last_month_first_day = now
  .clone()
  .subtract(1, "month")
  .startOf("month")
const last_month_same_day_yesterday = now
  .clone()
  .subtract(1, "day")
  .subtract(1, "month")
  .endOf("day")
const last_month_last_day = now
  .clone()
  .subtract(1, "month")
  .endOf("month")

const last_7days_first_day = now
  .clone()
  .subtract(7, "day")
  .startOf("day")
const last_7days_last_day = yesterday_end

const before_last7days_first_day = now
  .clone()
  .subtract(14, "day")
  .startOf("day")
const before_last7days_last_day = now
  .clone()
  .subtract(8, "day")
  .endOf("day")

const last_30days_first_day = now
  .clone()
  .subtract(30, "day")
  .startOf("day")
const before_last_30days_first_day = now
  .clone()
  .subtract(60, "day")
  .startOf("day")
const before_last_30days_last_day = now
  .clone()
  .subtract(31, "day")
  .endOf("day")

export default {
  now,
  today,
  yesterday,
  yesterday_end,
  month_first_day,
  month_last_day,
  last_month_first_day,
  last_month_last_day,
  last_month_same_day_yesterday,
  last_7days_first_day,
  last_7days_last_day,
  before_last7days_first_day,
  before_last7days_last_day,
  last_30days_first_day,
  before_last_30days_first_day,
  before_last_30days_last_day,
  makeList: (startDate, endDate) => {
    let now = startDate.clone(), dates = []
    while (now.isSameOrBefore(endDate)) {
      dates.push(now.format(FORMATS.date))
      now.add(1, "days")
    }
    return dates
  },
  defaultDatePickerDate: () => {
    return [month_first_day, today]
  },
  moment: moment
}