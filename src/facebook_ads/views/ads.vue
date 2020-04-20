<template>
  <div
    id="ads"
    class="animated fadeIn"
  >
    <platform-stats-view-header
      :platform="platform"
      view-id="ads"
      :title="title"
      :selected-date="selectedDate"
      :is-ready="isReady"
      :is-fetching="fetching"
      :is-fetching-insights="fetchingInsights"
      :view-filters="viewFilters"
      :view-columns="columnComponents"
      :selected-view-columns="selectedViewColumns"
      :refreshed-datetime="refreshedDatetime"
      :is-refreshing="fetchingInsights || isRefreshing"
      :view-type="viewType"
      @onViewToggle="onViewToggle"
      @onSetColumns="onSetColumns"
      @onRefresh="refreshData()"
      @onFilter="onFilter"
      @onDateChange="onDateChange"
    />
    <data-tables-server
      ref="dataTable"
      v-loading="fetching || !isReady"
      :data="tableData"
      :total="totalCount"
      :pagination-props="paginationProps"
      :table-props="tableProps"
      :empty-text="$t('common.no_results_found')"
      @query-change="setParams"
    >
      <!-- Custom Columns -->
      <component
        :is="column"
        v-for="column in currentColumns"
        :key="column.prop"
      />

      <!-- Ad active/paused status icon -->
      <el-table-column
        prop="status"
        label="Status"
        :width="65"
      >
        <template slot-scope="props">
          <status-row-cell
            :index="props.$index"
            :row="props.row"
            :callback="updateStatus"
          />
        </template>
      </el-table-column>

      <el-table-column
        v-for="column in columns"
        :key="column.label"
        :prop="column.prop"
        :label="column.label"
        :formatter="column.formatter"
        :show-overflow-tooltip="true"
      />

      <!-- Spent Progress bar -->
      <!-- <el-table-column
        :min-width="110"
        :sortable="true"
        :sort-method="sortBySpend"
        :label="$t('facebook_ads.spent')"
        prop="spend"
      >
        <template slot-scope="props">
          <spend-row-cell
            :index="props.$index"
            :row="props.row"
            :get-row-insights="getRowInsights"
            :format-currency="formatCurrency"
            :format-percentage="formatPercentage"
          />
        </template>
      </el-table-column> -->

      <!-- Updated time -->
      <el-table-column
        prop="updated_time"
        :label="$t('facebook_ads.updated_time')"
        :width="150"
      >
        <template slot-scope="props">
          {{ formatHumanized(props.row.updated_time) }}
        </template>
      </el-table-column>
    </data-tables-server>
  </div>
</template>

<script>

// Mixins
import FormattersMixin from "@/components/shared/mixins/FormattersMixin"
import FacebookAdsViewsMixin from "@/components/shared/mixins/FacebookAdsViewsMixin"

// import SpendRowCell from "@/facebook_ads/components//SpendRowCell"

const StatusFilter = () => import("@/facebook_ads/components/filters/StatusFilter")
// const InsightSpendFilter = () => import("@/facebook_ads/components/filters/InsightSpendFilter")

const NameColumn = () => import("@/facebook_ads/components/columns/NameColumn")
const AdStatusColumn = () => import("@/facebook_ads/components/columns/AdStatusColumn")
const AdUpdatedTimeColumn = () => import("@/facebook_ads/components/columns/AdUpdatedTimeColumn")

export default {
  components: {
    // SpendRowCell
  },
  mixins: [FormattersMixin, FacebookAdsViewsMixin],
  props: {
    accountId: {
      type: String,
      default: null,
    },
    campaignId: {
      type: String,
      default: null,
    },
    adsetId: {
      type: String,
      default: null,
    }
  },
  data() {
    this.viewFilters = [
      StatusFilter
      // InsightSpendFilter
    ]
    this.viewColumns = [
      AdStatusColumn,
      NameColumn,
      AdUpdatedTimeColumn
    ]
    this.assetsAction = "facebookAds/fetchAds"
    this.insightsAction = "facebookAds/fetchAdInsights"
    this.insightId = "ad_id"
    return {}
  },
  computed: {
    title() {
      let ads = this.$t("facebook_ads.ads")
      if (this.accountId)
        return `${this.accountId} - ${ads}`
      if (this.campaignId)
        return `${this.campaignId} - ${ads}`
      if (this.adId)
        return `${this.adId} - ${ads}`
      return ads
    }
  }
}
</script>
