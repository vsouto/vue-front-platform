<template>
  <div class="main-container">
    <div class="chart-container">
      <pie-widget-chart
        :ref="`panelSummarySpendChart`"
        :key="`panelSummarySpendChart`"
        :chart-data="spendData"
        :options="pieChartOptions"
        :styles="{
          height: '5rem',
          position: 'relative'
        }"
      />
    </div>
    <div class="chart-container">
      <pie-widget-chart
        :ref="`panelSummaryEarnChart`"
        :key="`panelSummaryEarnChart`"
        :chart-data="earnData"
        :options="pieChartOptions"
        :styles="{
          height: '5rem',
          position: 'relative'
        }"
      />
    </div>
  </div>
</template>

<script>
import PieWidgetChart from "@/components/widgets/charts/pie"
import StatsModel from "@/models/stats"

// Mixins
import FormattersMixin from "@/components/shared/mixins/FormattersMixin"


export default {
  components: {
    PieWidgetChart
  },
  mixins: [FormattersMixin],
  props: {
    stats: {
      type: StatsModel,
      required: true
    }
  },
  data() {
    return {
      pieChartOptions: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        responsive: true,
        responsiveAnimationDuration: 100,
        cutoutPercentage: 50,
        color: function(context) {
          let index = context.dataIndex, value = context.dataset.data[context.dataIndex]
          return value < 0 ? "red" :  // draw negative values in red
            index % 2 ? "blue" :    // else, alternate values in blue and green
              "green"
        },
        tooltips: {
          backgroundColor: "#f5f5f5",
          titleFontColor: "#333",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "point",
          intersect: false,
          position: "nearest"
        },
        scales: {
          yAxes: [
            {
              display: 0,
              ticks: {
                display: false
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "transparent",
                color: "transparent"
              }
            }
          ],
          xAxes: [
            {
              display: 0,
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "transparent",
                zeroLineColor: "transparent"
              },
              ticks: {
                display: false
              }
            }
          ]
        }
      }
    }
  },
  computed: {
    spendData() {
      let dataset = {
          data: [],
          backgroundColor: "transparent",
          hoverBackgroundColor: [],
          borderColor: [],
          borderWidth: 1
        },
        spendData = {
          labels: [],
          datasets: [dataset]
        }

      if (this.stats)
        this.stats.spendPlatforms.map(platform => {
          spendData.labels.push(platform.name)
          dataset.label = platform.name
          dataset.data.push(this.stats.getSpend(platform))
          dataset.borderColor.push(platform.color + "7F")
          dataset.hoverBackgroundColor.push(platform.color)
        })

      return spendData
    },
    earnData() {
      let dataset = {
          data: [],
          backgroundColor: "transparent",
          hoverBackgroundColor: [],
          borderColor: [],
          borderWidth: 1
        },
        earnData = {
          labels: [],
          datasets: [dataset]
        }

      if (this.stats)
        this.stats.earnPlatforms.map(platform => {
          earnData.labels.push(platform.name)
          dataset.label = platform.name
          dataset.data.push(this.stats.getEarn(platform))
          dataset.borderColor.push(platform.color + "7F")
          dataset.hoverBackgroundColor.push(platform.color)
        })

      return earnData
    },
  },
  mounted() {
    this.refresh()
  },
  updated() {
    this.refresh()
  },
  methods: {
    refresh() {
      this.$refs["panelSummarySpendChart"].renderChart(this.spendData, this.pieChartOptions)
      this.$refs["panelSummaryEarnChart"].renderChart(this.earnData, this.pieChartOptions)
    }
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  display: inline-flex;
  .chart-container {
    flex: 1 1 auto
  }
}
</style>