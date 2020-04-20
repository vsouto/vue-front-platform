<template>
  <div
    id="accounts"
    class="animated fadeIn"
  >
    <platform-stats-view-header
      :platform="platform"
      view-id="accounts"
      :title="$t('facebook_ads.accounts')"
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
              @click.native="viewCampaigns(scope.row)"
            >
              {{ $t("facebook_ads.campaigns") }}
            </base-button>
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
    </data-tables-server>
  </div>
</template>
<script>
// Mixins
import FormattersMixin from "@/components/shared/mixins/FormattersMixin"
import FacebookAdsViewsMixin from "@/components/shared/mixins/FacebookAdsViewsMixin"

import FacebookAdsAccountStatusIcon from "@/components/shared/FacebookAdsAccountStatusIcon"

const AccountStatusFilter = () => import("@/facebook_ads/components/filters/AccountStatusFilter")
const AccountWithBalanceFilter = () => import("@/facebook_ads/components/filters/AccountWithBalanceFilter")
//const InsightSpendFilter = () => import("@/facebook_ads/components/filters/InsightSpendFilter")

const AccountStatusColumn = () => import("@/facebook_ads/components/columns/AccountStatusColumn")
const NameColumn = () => import("@/facebook_ads/components/columns/NameColumn")
const BusinessNameColumn = () => import("@/facebook_ads/components/columns/BusinessNameColumn")
const TimezoneNameColumn = () => import("@/facebook_ads/components/columns/TimezoneNameColumn")
const AmountSpentColumn = () => import("@/facebook_ads/components/columns/AmountSpentColumn")
const CurrencyColumn = () => import("@/facebook_ads/components/columns/CurrencyColumn")
const BalanceColumn = () => import("@/facebook_ads/components/columns/BalanceColumn")
const FundingSourceDetailsColumn = () => import("@/facebook_ads/components/columns/FundingSourceDetailsColumn")

export default {
  name: "FacebookAdsAccounts",
  components: {
    FacebookAdsAccountStatusIcon
  },
  mixins: [FormattersMixin, FacebookAdsViewsMixin],
  data() {
    this.viewFilters = [
      AccountStatusFilter,
      AccountWithBalanceFilter,
      // InsightSpendFilter
    ]
    this.viewColumns = [
      AccountStatusColumn,
      NameColumn,
      BusinessNameColumn,
      TimezoneNameColumn,
      AmountSpentColumn,
      CurrencyColumn,
      BalanceColumn,
      FundingSourceDetailsColumn
    ]
    this.assetsAction = "facebookAds/fetchAccounts"
    this.insightsAction = "facebookAds/fetchAccountInsights"
    this.insightId = "account_id"
    return {}
  },
  methods: {
    viewCampaigns(row) {
      this.$router.push({ name: "FacebookAdsAccountCampaigns", params: {accountId: row.id} })
    },
    viewAdsets(row) {
      this.$router.push({ name: "FacebookAdsAccountAdsets", params: {accountId: row.id} })
    },
    viewAds(row) {
      this.$router.push({ name: "FacebookAdsAccountAds", params: {accountId: row.id} })
    }
  }
}
</script>
