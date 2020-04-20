import Fuse from "fuse.js"
import { Table, TableColumn, Tag, Button, Row, Col, Scrollbar } from "element-ui"

import FORMATS from "@/constants/formats"
import ViewTableHeader from "@/components/shared/ViewTableHeader"
import ViewTableFooter from "@/components/shared/ViewTableFooter"
import {
  calculateRevenue,
  calculateROI,
  getRoiVariant,
  deepCopy
} from "@/utils"

export default {
  props: {
    title: {
      type: String,
      default: null
    },
    panelId: {
      type: String,
      default: null
    },
    date: {
      type: [Date, Object],
      validator: value => {
        return value == null || typeof value === "object"
      }
    },
    tableName: {
      type: String,
      validator: value => {
        return value == null || typeof value === "string"
      }
    },
    selectedPlatforms: {
      type: Array,
      default: () => []
    }
  },
  components: {
    ViewTableHeader,
    ViewTableFooter,
    "el-row": Row,
    "el-col": Col,
    "el-button": Button,
    "el-tag": Tag,
    "el-table": Table,
    "el-table-column": TableColumn,
    "el-scrollbar": Scrollbar,
  },
  data() {
    return {
      tableData: [],
      searchQuery: "",
      propsToSearch: ["name", "id"],
      fuseSearch: null,
      searchedData: [],
      pagination: {
        perPage: 50,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50, 100, 200],
        total: 0,
      },
      selectedDate: this.date,
      summaryNameIndex: 1
    }
  },
  computed: {
    currencyRates() {
      return this.$store.getters["account/currencyRates"]
    },
    platforms() {
      return this.selectedPlatforms.map(p => {
        return {
          img: p.icon,
          name: p.name
        }
      })
    },
    computedTableData() {
      let table = deepCopy(this.tableData)
      if (table)
        for (const row of table) {
          if (row.spend && row.spend_currency)
            row.spend = this.convertCurrency(row.spend, row.spend_currency, this.frontendCurrency)
          if (row.earn && row.earn_currency)
            row.earn = this.convertCurrency(row.earn, row.earn_currency, this.frontendCurrency)
        }
      return table
    },
    selectedDateFormatted() {
      return this.$moment(this.selectedDate).format(FORMATS.date)
    },
    /***
       * Returns a page from the searched data or the whole data. Search is performed in the watch section below
       */
    queriedData() {
      if (!this.isReady) return []
      let result = this.computedTableData
      if (this.searchedData && this.searchedData.length > 0) {
        result = this.searchedData
      }
      return result.slice(this.from, this.to)
    },
    total() {
      return this.haveSearchData
        ? this.searchedData.length
        : (this.computedTableData && this.computedTableData.length) || 0
    },
    to() {
      let highBound = this.from + this.pagination.perPage
      if (this.total < highBound) {
        highBound = this.total
      }
      return highBound
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1)
    },
    canSearch() {
      return this.ready && this.computedTableData && this.computedTableData.length > 5
    },
    haveSearchData() {
      return this.searchedData && this.searchedData.length
    },
    fetchAttr() {
      if (!this.panelId) return null
      return `fetchWidget/${this.panelId}/${this.tableName}`
    },
    isReady() {
      if (!this.fetchAttr) return this.ready
      return this.$store.getters["isReady"](this.fetchAttr) && this.computedTableData && true
    },
    isErrored() {
      if (!this.fetchAttr) return false
      return this.$store.getters["isErrored"](this.fetchAttr)
    },
    ready() {
      return this.computedTableData && this.computedTableData.length > 0 || false
    }
  },
  methods: {
    fetchWidget() {
      return this.$store.dispatch("panel/fetchWidget", {
        id: this.panelId,
        name: this.tableName,
        data: {
          datetime_start: this.selectedDateFormatted,
          datetime_end: this.selectedDateFormatted
        }
      })
    },
    setDateStart(date) {
      this.selectedDate = date
    },
    initializeFuseSearch() {
      this.fuseSearch = new Fuse(this.computedTableData, {
        keys: this.propsToSearch,
        threshold: 0.3,
      })
    },
    updateSearchQuery(value) {
      this.searchQuery = value
    },
    calculateRevenue(earn, spend) {
      return calculateRevenue(earn, spend)
    },
    calculateROI(earn, spend, multiplyCent = false) {
      return calculateROI(earn, spend, multiplyCent)
    },
    getRoiVariant(roi) {
      return getRoiVariant(roi)
    },
    getRevenueVariant(revenue) {
      return !revenue || revenue == 0 ? "" : revenue < 0 ? "text-danger" : "text-success"
    },
    sortByRevenue(rowA, rowB) {
      const revenueA = calculateRevenue(rowA.earn, rowA.spend),
        revenueB = calculateRevenue(rowB.earn, rowB.spend)
      return revenueA > revenueB ? 1 : -1
    },
    sortByROI(rowA, rowB) {
      const roiA = calculateROI(rowA.earn, rowA.spend),
        roiB = calculateROI(rowB.earn, rowB.spend)
      return roiA > roiB ? 1 : -1
    },
    filterValue(value, row, column) {
      if (value == "gt0") return row[column.property] > 0
      else if (value == "lt0") return row[column.property] < 0
      else if (value.indexOf("!") > -1) return row[column.property] != value
      else return row[column.property] == value
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === this.summaryNameIndex) {
          sums[index] = "Total"
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          const summedValue = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          if (column.formatter) {
            sums[index] = column.formatter(data[index], column, summedValue)
          } else {
            sums[index] = summedValue
          }
        } else {
          sums[index] = ""
        }
      })

      return sums
    }
  },
  watch: {
    /**
       * Searches through the table data by a given query.
       * NOTE: If you have a lot of data, it's recommended to do the search on the Server Side and only display the results here.
       * @param value of the query
       */
    searchQuery(value) {
      let result = this.computedTableData
      if (value !== "") {
        result = this.fuseSearch.search(this.searchQuery)
      }
      this.searchedData = result
    },
    isReady(value) {
      /** Initialize Fuse search when ready */
      if (value && !this.fuseSearch) this.initializeFuseSearch()
    },
    panelId(new_id, old_id) {
      if (new_id && old_id && new_id != old_id)
        this.fetchData()
    },
    selectedDate(new_date, old_date) {
      if (new_date && new_date != old_date)
        this.fetchData()
    }
  }
}