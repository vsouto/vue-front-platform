<template>
  <div
    id="adsets"
    class="animated fadeIn"
  >
    <platform-stats-view-header
      :platform="platform"
      view-id="adsets"
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
      <!-- Actions -->
      <el-table-column
        fixed="right"
        class-name="action-column"
      >
        <template slot-scope="scope">
          <action-icon
            class="action-icon"
          />
          <div class="on-hover animated fadeIn">
            <base-button
              size="sm"
              type="info"
              simple
              class="action-simple-button"
              @click.native="viewAds(scope.row)"
            >
              {{ $t("facebook_ads.ads") }}
            </base-button>
          </div>
        </template>
      </el-table-column>

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
const AdsetStatusColumn = () => import("@/facebook_ads/components/columns/AdsetStatusColumn")
const AdsetDailyBudgetColumn = () => import("@/facebook_ads/components/columns/AdsetDailyBudgetColumn")
const AdsetBidAmountColumn = () => import("@/facebook_ads/components/columns/AdsetBidAmountColumn")
const AdsetBidStrategyColumn = () => import("@/facebook_ads/components/columns/AdsetBidStrategyColumn")
const AdsetPacingTypeColumn = () => import("@/facebook_ads/components/columns/AdsetPacingTypeColumn")
const AdsetUpdatedTimeColumn = () => import("@/facebook_ads/components/columns/AdsetUpdatedTimeColumn")

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
    }
  },
  data() {
    this.viewFilters = [
      StatusFilter
      // InsightSpendFilter
    ]
    this.viewColumns = [
      AdsetStatusColumn,
      NameColumn,
      AdsetDailyBudgetColumn,
      AdsetBidAmountColumn,
      AdsetBidStrategyColumn,
      AdsetPacingTypeColumn,
      AdsetUpdatedTimeColumn
    ]
    this.assetsAction = "facebookAds/fetchAdsets"
    this.insightsAction = "facebookAds/fetchAdsetInsights"
    this.insightId = "adset_id"
    return {}
  },
  computed: {
    title() {
      let adsets = this.$t("facebook_ads.adsets")
      if (this.accountId)
        return `${this.accountId} - ${adsets}`
      if (this.campaignId)
        return `${this.campaignId} - ${adsets}`
      return adsets
    }
  }
}
</script>
