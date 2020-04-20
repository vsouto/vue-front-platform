import FacebookAds from "@/facebook_ads"
import Filters from "@/plugins/filters/Filters"
import DatePicker from "@/components/shared/DatePicker"
import PlatformStatsViewHeader from "@/components/shared/PlatformStatsViewHeader"

import ActionIcon from "icons/ArrowLeftCircleOutline"

export default {
  components: {
    ActionIcon,
    PlatformStatsViewHeader,
    DatePicker
  },
  data() {
    this.platform = FacebookAds
    this.insightViewColumns = FacebookAds.tableColumns.insights
    return {
      fetching: false,
      fetchingInsights: false,
      tableData: [],
      totalCount: 0,
      lastEvaluatedKey: null,
      filters: {},
      pagination: {
        perPage: 25
      },
      selectedDate: this.$store.getters["panel/selectedDate"],
      isRefreshing: false,
      refreshedDatetime: null,
      viewType: this.$store.getters["facebookAds/viewType"],
      columns: [],
      insightColumns: []
    }
  },
  created() {
    this.fetch()
  },
  computed: {
    isReady() {
      if (this.viewType == "metrics")
        return this.$store.getters["isReady"](this.insightsAction)
      return this.$store.getters["isReady"](this.assetsAction)
    },
    isFetched() {
      if (this.viewType == "metrics")
        return this.$store.getters["isFetched"](this.insightsAction)
      return this.$store.getters["isFetched"](this.assetsAction)
    },
    pageSizes() {
      let sizes = []
      if (this.totalCount < 10)
        sizes.push(this.totalCount)
      if (this.totalCount == 10)
        sizes.push(10)
      if (this.totalCount > 10)
        sizes.push(25)
      if (this.totalCount > 25)
        sizes.push(50)
      if (this.totalCount > 50)
        sizes.push(100)
      return sizes
    },
    canPaginage() {
      return this.isReady && this.totalCount > this.tableData.length
    },
    assetIds() {
      if (!this.tableData.length) return null
      return this.tableData.map(asset => asset.id)
    },
    paginationProps() {
      return {
        pageSize: this.pagination.perPage,
        pageSizes: this.pageSizes,
        disabled: !this.canPaginage
      }
    },
    tableProps() {
      return {
        stripe: true,
        border: false,
        defaultExpandAll: true,
        width: "93vw",
        height: "75vh"
      }
    },
    currentColumns() {
      if (this.viewType == "metrics")
        return this.insightColumns
      return this.columns
    },
    selectedViewColumns() {
      if (this.viewType == "metrics")
        return this.$store.getters["facebookAds/getViewInsightColumns"](this.viewId) || []
      return this.$store.getters["facebookAds/getViewColumns"](this.viewId) || []
    },
    columnComponents() {
      if (this.viewType == "metrics")
        return this.insightViewColumns
      return this.viewColumns
    }
  },
  methods: {
    getSelectedFilters() {
      this.filters.date_range = this.selectedDate
      return this.filters instanceof Filters ? this.filters.stringify() : JSON.stringify(this.filters)
    },
    async fetchAssets(options={}) {
      const { force } = options
      let payload = {
        filters: this.getSelectedFilters(),
        params: JSON.stringify({
          force: force || false,
          lastEvaluatedKey: this.lastEvaluatedKey,
          size: this.pagination.perPage,
          accountId: this.accountId,
          campaignId: this.campaignId,
          adsetId: this.adsetId
        })
      }
      this.fetching = true
      await this.$store
        .dispatch(this.assetsAction, payload)
        .then(resp => {
          if (!resp) return
          this.tableData = resp.response || []
          this.lastEvaluatedKey = resp.last_evaluated_key && JSON.stringify(resp.last_evaluated_key) || null
          this.totalCount = resp.total_count || 0
          this.refreshedDatetime = resp.refreshed_datetime
          this.isRefreshing = resp.refreshing || false
        })
        .catch(error => {
          console.error('error ', error); //eslint-disable-line
        })
        .finally(() => {
          this.fetching = false
        })
    },
    async fetchInsights(options={}) {
      const { force, ids } = options
      let payload = {
        filters: this.getSelectedFilters(),
        params: JSON.stringify({
          force: force || false,
          ids: ids || null,
        })
      }
      this.fetchingInsights = true
      this.$store
        .dispatch(this.insightsAction, payload)
        .then(resp => {
          if (!resp) return
          this.tableData = resp.response || []
          this.lastEvaluatedKey = resp.last_evaluated_key && JSON.stringify(resp.last_evaluated_key) || null
          this.totalCount = resp.total_count || 0
          this.refreshedDatetime = resp.refreshed_datetime
          this.isRefreshing = resp.refreshing || false
        })
        .catch(error => {
          console.error('error ', error); //eslint-disable-line
        })
        .finally(() => {
          this.fetchingInsights = false
        })
    },
    async refreshData() {
      this.fetch({force: true})
    },
    fetch(options={}) {
      if (this.viewType == "metrics")
        this.fetchInsights(options)
      else
        this.fetchAssets(options)
    },
    setParams(params) {
      this.pagination.perPage = params.pageSize || this.pagination.perPage
    },
    onFilter(selectedFilters) {
      this.filters = selectedFilters
      this.fetch()
    },
    onDateChange(selectedDate) {
      this.selectedDate = selectedDate
      this.fetch()
    },
    onViewToggle(viewType) {
      if (viewType == "metrics")
        this.viewType = "metrics"
      else
        this.viewType = "info"
      this.$store.commit("facebookAds/SET_VIEW_TYPE", this.viewType)
      this.onSetColumns()
      this.fetch()
    },
    onSetColumns(columns=null) {
      if (!columns)
        columns = this.columnComponents
      if (this.viewType == "metrics")
        this.insightColumns = columns
      else
        this.columns = columns
      this.$nextTick().then(() => {
        this.$refs.dataTable.$refs.elTable.doLayout()
      })
    }
  }
}
