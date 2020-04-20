<template>
  <widget-container
    :title="widget.name"
    :is-editing="isCreating"
    :is-ready="isReady"
    :is-fetching="isFetching"
    :is-in-sync="isInSync"
    :is-errored="isErrored"
    :progress-value="percentReady"
    type="panel-summary"
    class="panel-summary"
  >
    <div
      v-if="isReady"
      class="main-container"
    >
      <div class="revenue">
        <span :class="`metric ${revenueVariant}`">{{ revenue }}</span>
        <small>{{ $t("metrics.revenue") }}</small>
      </div>
      <div class="roi">
        <span :class="`metric ${roiVariant}`">{{ roi }}</span>
        <small>{{ $t("metrics.roi") }}</small>
      </div>
      <div class="spend">
        <span class="metric text-secondary">{{ spend }}</span>
        <small>{{ $t("metrics.spend") }}</small>
      </div>
      <div class="earn">
        <span class="metric text-secondary">{{ earn }}</span>
        <small>{{ $t("metrics.earn") }}</small>
      </div>
    </div>
    <!-- <panel-spend-earn-pie-chart
      v-if="isReady && stats"
      v-bind="$props"
      :component-key-int="componentKeyInt"
      :stats="stats"
    /> -->
  </widget-container>
</template>
<script>
import WidgetContainer from "@/components/widgets/WidgetContainer"
import BaseWidget from "@/components/widgets/BaseWidget"
// import PanelSpendEarnPieChart from "@/components/widgets/PanelSpendEarnPieChart"

// Mixins
import FormattersMixin from "@/components/shared/mixins/FormattersMixin"

import { getRoiVariant } from "@/utils"

export default {
  name: "PanelSummaryCard",
  components: {
    WidgetContainer,
    // PanelSpendEarnPieChart
  },
  extends: BaseWidget,
  mixins: [FormattersMixin],
  props: {
    title: {
      type: String,
      default: null
    }
  },
  computed: {
    revenueVariant() {
      let variant = ""
      if (this.stats.revenue)
        variant = this.revenue > 0 ? "text-success" : "text-warning"
      return !this.isReady || this.isInSync ? "text-secondary" : variant
    },
    roiVariant() {
      if (this.roi) {
        return getRoiVariant(this.stats.roi)
      }
      return ""
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-summary {
  text-align: center;
  /deep/ .card-body {
    display: flex
  }
  small {
    display: block;
    margin-top: -0.225rem;
    color: $gray-700;
    text-transform: uppercase
  }
  .main-container {
    flex: 1 1 auto;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: baseline;
    align-content: space-around;
    .revenue, .roi, .spend, .earn {
      display: flex;
      flex: 1 1 9.5rem;
      flex-flow: column nowrap;
    }
    .revenue, .roi {
      .metric {
        font-size: 1.5em
      }
    }
    .spend, .earn {
      .metric {
        font-size: 1.2em
      }
    }
  }
}
</style>