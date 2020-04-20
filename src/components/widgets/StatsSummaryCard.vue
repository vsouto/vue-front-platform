<template>
  <widget-container
    :title="widget.label || widget.name"
    :is-editing="isCreating"
    :is-ready="isReady"
    :is-fetching="isFetching"
    :is-in-sync="isInSync"
    :is-errored="isErrored"
    :progress-value="percentReady"
    type="summary"
    class="stats-summary"
  >
    <div
      v-if="isReady"
      slot="header"
      class="main-container"
    >
      <div class="title">
        <widget-chart-icon />
        {{ widget.label || widget.name }}
      </div>
      <div class="revenue">
        <el-tooltip
          :content="$t('metrics.revenue')"
        >
          <span class="metric">{{ revenue }}</span>
        </el-tooltip>
        <el-tooltip
          v-if="haveComparison"
          :content="compareRevenueText"
        >
          <component
            :is="compareRevenueIconComponent"
            :class="compareRevenueIconClass"
            class="icon"
          />
        </el-tooltip>
      </div>
      <div class="roi">
        <el-tooltip
          :content="$t('metrics.roi')"
        >
          <span class="metric">{{ roi }}</span>
        </el-tooltip>
        <el-tooltip
          v-if="haveComparison"
          :content="compareRoiText"
        >
          <component
            :is="compareRoiIconComponent"
            :class="compareRoiIconClass"
            class="icon"
          />
        </el-tooltip>
      </div>
    </div>
  </widget-container>
</template>

<script>
import WidgetContainer from "@/components/widgets/WidgetContainer"
import BaseWidget from "@/components/widgets/BaseWidget"

// Icons
import ChartLineVariantIcon from "icons/ChartLineVariant.vue"
import TrendingUpIcon from "icons/TrendingUp.vue"
import TrendingDownIcon from "icons/TrendingDown.vue"

export default {
  name: "StatsSummaryCard",
  components: {
    WidgetContainer,
    "widget-chart-icon": ChartLineVariantIcon,
    "compare-up-icon": TrendingUpIcon,
    "compare-down-icon": TrendingDownIcon,
  },
  extends: BaseWidget,
  computed: {
    compareRevenueIconComponent() {
      return this.stats.revenue > this.compareStats.revenue ? TrendingUpIcon : TrendingDownIcon
    },
    compareRevenueIconClass() {
      return this.stats.revenue > this.compareStats.revenue ? "text-success" : "text-warning"
    },
    compareRoiIconComponent() {
      return this.stats.roi > this.compareStats.roi ? TrendingUpIcon : TrendingDownIcon
    },
    compareRoiIconClass() {
      return this.stats.roi > this.compareStats.roi ? "text-success" : "text-warning"
    },
    compareRevenueText() {
      return `vs ${this.revenue2}`
    },
    compareRoiText() {
      return `vs ${this.roi2}`
    }
  }
}
</script>

<style lang="scss" scoped>
.stats-summary {
  padding: 0;
  .main-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: baseline;
    .title {
      flex: 1 1 4rem;
      display: flex;
      flex-flow: row nowrap;
      align-items: baseline;
      .icon {
        margin-left: 0.225rem
      }
    }
    .revenue, .roi {
      flex: 1 1 auto;
      display: flex;
      flex-flow: row nowrap;
      align-items: baseline
    }
    .revenue, .roi {
      .metric {
        font-size: 1em;
        color: $white;
      }
    }
  }
}
</style>