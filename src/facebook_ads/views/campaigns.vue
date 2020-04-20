<template>
  <div
    id="campaigns"
    class="animated fadeIn"
  >
    <platform-stats-view-header
      :platform="platform"
      view-id="campaigns"
      :title="title"
      :selected-date="selectedDate"
      :is-ready="isReady"
      :is-fetching="fetching"
      :is-fetching-insights="fetchingInsights"
      :view-filters="viewFilters"
      :view-columns="columnComponents"
      :selected-view-columns="selectedViewColumns"
      :refreshed-datetime="refreshedDatetime"
      :is-refreshing="isRefreshing"
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
              @click.native="viewAdsets(scope.row)"
            >
              {{ $t("facebook_ads.adsets") }}
            </base-button>
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

const CampaignObjectiveFilter = () => import("@/facebook_ads/components/filters/CampaignObjectiveFilter")
const StatusFilter = () => import("@/facebook_ads/components/filters/StatusFilter")
// const = () => InsightSpendFilter import("@/facebook_ads/components/filters/InsightSpendFilter")

const NameColumn = () => import("@/facebook_ads/components/columns/NameColumn")
const CampaignStatusColumn = () => import("@/facebook_ads/components/columns/CampaignStatusColumn")
const CampaignObjectiveColumn = () => import("@/facebook_ads/components/columns/CampaignObjectiveColumn")
const CampaignBidStrategyColumn = () => import("@/facebook_ads/components/columns/CampaignBidStrategyColumn")
const CampaignBudgetRemainingColumn = () => import("@/facebook_ads/components/columns/CampaignBudgetRemainingColumn")
const CampaignPacingTypeColumn = () => import("@/facebook_ads/components/columns/CampaignPacingTypeColumn")
const CampaignUpdatedTimeColumn = () => import("@/facebook_ads/components/columns/CampaignUpdatedTimeColumn")
const CampaignDailyBudgetColumn = () => import("@/facebook_ads/components/columns/CampaignDailyBudgetColumn")

export default {
  name: "FacebookAdsCampaigns",
  components: {
    // SpendRowCell,
  },
  mixins: [FormattersMixin, FacebookAdsViewsMixin],
  props: {
    accountId: {
      type: String,
      default: null,
    }
  },
  data() {
    this.viewFilters = [
      CampaignObjectiveFilter,
      StatusFilter
      // InsightSpendFilter
    ]
    this.viewColumns = [
      CampaignStatusColumn,
      NameColumn,
      CampaignDailyBudgetColumn,
      CampaignObjectiveColumn,
      CampaignBidStrategyColumn,
      CampaignBudgetRemainingColumn,
      CampaignPacingTypeColumn,
      CampaignUpdatedTimeColumn
    ]
    this.assetsAction = "facebookAds/fetchCampaigns"
    this.insightsAction = "facebookAds/fetchCampaignInsights"
    this.insightId = "campaign_id"
    return {}
  },
  computed: {
    title() {
      let campaigns = this.$t("facebook_ads.campaigns")
      if (this.accountId)
        return `${this.accountId} - ${campaigns}`
      return campaigns
    }
  },
  methods: {
    viewAdsets(row) {
      this.$router.push({ name: "FacebookAdsCampaignAdsets", params: {campaignId: row.id} })
    },
    viewAds(row) {
      this.$router.push({ name: "FacebookAdsCampaignAds", params: {campaignId: row.id} })
    }
  }
}
</script>
