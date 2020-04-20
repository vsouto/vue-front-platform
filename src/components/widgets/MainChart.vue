<template>
  <widget-container
    :title="widget.name"
    :is-editing="isCreating"
    :is-ready="isReady"
    :is-fetching="isFetching"
    :is-in-sync="isInSync"
    :is-errored="isErrored"
    :progress-value="percentReady"
    type="chart"
  >
    <highcharts
      v-if="isReady"
      :ref="`mainChart`"
      :options="chartOptions"
      :animation-duration="1000"
      :update-args="[true, true, {duration: 1000}]"
    />
  </widget-container>
</template>

<script>
import { Chart } from "highcharts-vue"

import WidgetContainer from "@/components/widgets/WidgetContainer"
import BaseWidget from "@/components/widgets/BaseWidget"

// Mixins
import FormattersMixin from "@/components/shared/mixins/FormattersMixin"

export default {
  components: {
    WidgetContainer,
    highcharts: Chart
  },
  extends: BaseWidget,
  mixins: [FormattersMixin],
  props: {
    title: {
      type: String,
      default: null
    }
  },
  data() {
    this.datasetColors = {
      earn: "#00f2c3",
      spend: "#ff8d72",
      revenue: "#e14eca",
      "positive": "#00f2c3",
      "neutral": "#ff8d72",
      "negative": "#fd5d93"
    }
    return {
      showChart: false,
    }
  },
  computed: {
    chartOptions() {
      return {
        credits: {
          enabled: false
        },
        chart: {
          type: "spline",
          backgroundColor: "transparent",
          height: this.widget.heightUnits * this.rowHeight
        },
        title: {
          text: undefined
        },
        series: this.datasets,
        xAxis: {
          categories: this.labels,
          lineColor: "#9a9a9a"
        },
        yAxis: {
          gridLineColor: "#9a9a9a",
          title: {
            text: undefined
          }
        }
      }
    },
    labels() {
      return this.statsList.map(stats => this.$moment(stats.date).format("D/M"))
    },
    datasets() {
      // let earn = {
      //     name: "Receita",
      //     chartType: "bar",
      //     color: this.datasetColors.earn,
      //     values: []
      //   },
      //   spend = {
      //     name: "Investimento",
      //     chartType: "bar",
      //     color: this.datasetColors.spend,
      //     values: []
      //   },
      let revenue = {
        data: [],
        name: this.$t("metrics.revenue"),
        dataLabels: {
          enabled: false,
          color: "#adb5bd",
          fontWeight: undefined,
          textOutline: undefined
        },
        showInLegend: false,
        zones: [
          {
            value: 0,
            color: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [
                [0, this.datasetColors.neutral], // top
                [1, this.datasetColors.negative] // bottom
              ]
            }
          },
          {
            color: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [
                [0, this.datasetColors.positive], // top
                [1, this.datasetColors.neutral] // bottom
              ]
            }
          }
        ],
        lineWidth: 3
        // color: this.datasetColors.positive,
        // negativeColor: this.datasetColors.negative
      }
      this.statsList.map(stats => {
        // if (stats.earn !== undefined && this.panelStats.stats_aggregated.earn > 0)
        //   earn.values.push(stats.earn)
        // if (stats.spend !== undefined && this.panelStats.stats_aggregated.spend > 0)
        //   spend.values.push(stats.spend)
        if (stats.revenue !== undefined)
          revenue.data.push(stats.revenue)
      })
      let list = []
      // if (earn.values.length)
      //   list.push(earn)
      // if (spend.values.length)
      //   list.push(spend)
      // if (list.length == 2) {
      //   list.push(revenue)
      // }
      list.push(revenue)
      return list
    },
    colors() {
      return this.datasets.map(dt => dt.color)
    }
  },
  mounted() {
    setTimeout(() => {
      this.showChart = true
    }, 1000)
  },
  methods: {
    revenueColorVariant(context) {
      let value = context.dataset.data[context.dataIndex]
      return value < 0 ? "#fd5d93" : value == 0 ? "transparent" : "#00f2c3"
    }
  }
}
</script>
