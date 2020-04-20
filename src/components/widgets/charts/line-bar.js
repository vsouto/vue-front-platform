import Chart from "chart.js"
import { generateChart, mixins } from "vue-chartjs"

Chart.defaults.LineBar = Chart.defaults.bar
Chart.controllers.LineBar = Chart.controllers.bar.extend({ /* custom magic here */})

// First argument is the chart-id, second the chart type.
const LineBar = generateChart("line-bar", "LineBar")

export default {
  name: "line-bar-widget-chart",
  extends: LineBar,
  mixins: [mixins],
  props: {
    chartData: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
