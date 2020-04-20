<template>
  <el-table
    :data="data"
    :default-sort="{prop: 'earn', order: 'descending'}"
  >
    <!-- Expandable -->
    <el-table-column type="expand">
      <template slot-scope="props">
        TODO
        {{ false && props }}
      </template>
    </el-table-column>

    <!-- Name -->
    <el-table-column
      prop="name"
    >
      <template slot="header">
        <el-tooltip
          :content="platform.name"
          class="item"
          effect="dark"
          placement="top-start"
        >
          <img
            :src="platform.icon"
            height="20"
          >
        </el-tooltip>
      </template>
      <template slot-scope="props">
        <el-tooltip
          :content="`${props.row.name} (${props.row.id})`"
          class="item"
          effect="dark"
          placement="top-start"
        >
          <span style="white-space: nowrap">{{ props.row.name || props.row.id }}</span>
        </el-tooltip>
      </template>
    </el-table-column>

    <!-- Page views CTR  -->
    <el-table-column
      prop="page_views_ctr"
    >
      <template slot="header">
        <el-tooltip
          :content="$t('google_analytics.ctr')"
          class="item"
          effect="dark"
          placement="top-start"
        >
          <span>
            <cursor-default-click-icon class="icon-15x mr-n1" />
            <percent-icon class="icon-15x" />
          </span>
        </el-tooltip>
      </template>
      <template
        slot-scope="props"
      >
        {{ formatPercentage(props.row.page_views_ctr, true, 2, true) }}
      </template>
    </el-table-column>

    <!-- Cost per click  -->
    <el-table-column
      prop="cost_per_click"
    >
      <template slot="header">
        <el-tooltip
          :content="$t('google_analytics.cpc')"
          class="item"
          effect="dark"
          placement="top-start"
        >
          <span>
            <cursor-default-click-icon class="icon-15x mr-n1" />
            <currency-usd-icon class="icon-15x" />
          </span>
        </el-tooltip>
      </template>
      <template
        slot-scope="props"
      >
        {{ formatCurrency(props.row.cost_per_click, props.row.currency_symbol) }}
      </template>
    </el-table-column>

    <!-- Revenue per mile  -->
    <el-table-column
      prop="page_views_rpm"
    >
      <template slot="header">
        <el-tooltip
          :content="$t('google_analytics.rpm')"
          class="item"
          effect="dark"
          placement="top-start"
        >
          <span>
            <eye-icon class="icon-15x mr-n1" />
            <currency-usd-icon class="icon-15x" />
          </span>
        </el-tooltip>
      </template>
      <template
        slot-scope="props"
      >
        {{ formatCurrency(props.row.page_views_rpm, props.row.currency_symbol) }}
      </template>
    </el-table-column>

    <!-- Earn -->
    <earn-table-column />
  </el-table>
</template>
<script>
import Platform from "@/google_analytics"

// Icons
import CursorDefaultClickIcon from "icons/CursorDefaultClick.vue"
import EyeIcon from "icons/Eye.vue"
import PercentIcon from "icons/Percent.vue"
import CurrencyUsdIcon from "icons/CurrencyUsd.vue"

// Mixins
import FormattersMixin from "@/components/shared/mixins/FormattersMixin"
import BaseTableChildMixin from "@/components/shared/mixins/BaseTableChildMixin"

// Columns
import EarnTableColumn from "@/components/widgets/table-columns/earn"

export default {
  name: "GoogleAnalyticsEarnTable",
  components: {
    EyeIcon,
    PercentIcon,
    CursorDefaultClickIcon,
    CurrencyUsdIcon,

    EarnTableColumn
  },
  mixins: [FormattersMixin, BaseTableChildMixin],
  data() {
    return {
      platform: Platform
    }
  }
}
</script>
