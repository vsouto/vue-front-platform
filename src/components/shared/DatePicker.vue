<template>
  <el-date-picker
    v-model="date"
    :type="type"
    :picker-options="pickerOptions"
    :clearable="false"
    :disabled="isFetching || !isReady || isCreating"
    :size="size"
    :range-separator="$t('common.date_separator')"
    placeholder="Escolha uma data"
    format="dd/MM/yyyy"
    align="center"
  />
</template>
<script>
import { DatePicker } from "element-ui"
import DATES from "@/constants/dates"
export default {
  components: {
    "el-date-picker": DatePicker
  },
  props: {
    selectedDate: {
      type: Array,
      required: true
    },
    isFetching: {
      type: Boolean,
      default: false
    },
    isCreating: {
      type: Boolean,
      default: false
    },
    isReady: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "date",
      validator: value => {
        if (value) {
          let acceptedValues = [
            "date", "daterange"
          ]
          return acceptedValues.indexOf(value) !== -1
        }
        return true
      },
      description: "(date|daterange)"
    },
    size: {
      type: String,
      default: "mini"
    }
  },
  computed: {
    date: {
      get() {
        return this.selectedDate
      },
      set(newDate) {
        this.$emit("change", newDate)
      }
    },
    pickerOptions() {
      let options = {
        disabledDate(time) {
          let six_months = (3600 * 24 * 30 * 6 * 1000)
          return time.getTime() > Date.now() || Date.now() - time.getTime() > six_months
        },
        shortcuts: this.type == "date" ? [
          {
            text: "Hoje",
            onClick(picker) {
              picker.$emit("pick", DATES.today)
            }
          }, {
            text: "Ontem",
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit("pick", DATES.yesterday)
            }
          }
        ] : [
          {
            text: "Hoje",
            onClick(picker) {
              const end = DATES.today
              const start = DATES.today
              picker.$emit("pick", [start, end])
            }
          },
          {
            text: "Ontem",
            onClick(picker) {
              const end = DATES.yesterday
              const start = DATES.yesterday
              picker.$emit("pick", [start, end])
            }
          },
          {
            text: "Últimos 7 dias",
            onClick(picker) {
              const end = DATES.last_7days_last_day
              const start = DATES.last_7days_first_day
              picker.$emit("pick", [start, end])
            }
          },
          {
            text: "Mês atual",
            onClick(picker) {
              const end = DATES.month_last_day
              const start = DATES.month_first_day
              picker.$emit("pick", [start, end])
            }
          },
          {
            text: "Mês passado",
            onClick(picker) {
              const end = DATES.last_month_last_day
              const start = DATES.last_month_first_day
              picker.$emit("pick", [start, end])
            }
          },
          {
            text: "Últimos 30 dias",
            onClick(picker) {
              const end = DATES.last_30days_last_day
              const start = DATES.last_30days_first_day
              picker.$emit("pick", [start, end])
            }
          }
        ]
      }
      return options
    }
  }
}
</script>

<style scoped>

.el-date-editor {
  width: 15rem !important;
  background: transparent !important;
  border-color: #212529 !important;
  line-height: 20px !important
}

.el-date-editor >>> .el-range__close-icon {
  display: none !important
}

.el-date-editor >>> input {
  background: transparent !important;
  border-color: #212529 !important;
  color: white;
  padding-right: 5px
}

.el-date-editor:hover, .el-date-editor:hover >>> input {
  border-color: #e14eca !important;
}

.el-date-editor >>> .el-icon-date {
  color: #e14eca
}

.el-range-editor >>> .el-range-separator {
  padding: 0 5px 0 0 !important;
  color: white !important;
  width: auto !important
}
</style>

<style lang="scss" scoped>
.el-picker-panel {
  background: #222a42;
  color: #c0c4cc;
  border: 1px solid #222a42;
  .el-picker-panel__body-wrapper {
    .el-picker-panel__sidebar {
      background: #212529;
      border-right: 1px solid #303133;
      .el-picker-panel__shortcut {
        color: hsla(0,0%,100%,.8);
      }
    }
    .el-picker-panel__body {
      .el-date-range-picker__content {
        &.is-left {
          border-right: 1px solid #212529
        }
      }
    }
  }
  /deep/ .el-date-table {
    /deep/ th {
      color: #909399
    }
    /deep/ td {
      &.next-month {
        color: #c0c4cc
      }
      &.prev-month {
        color: #c0c4cc
      }
      &.end-date, &.start-date {
        span {
          background-color: #e14eca
        }
      }
      &.in-range {
        div {
          background-color: #212529
        }
      }
    }
  }
}
</style>