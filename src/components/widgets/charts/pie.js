import { Doughnut, mixins } from "vue-chartjs"
export default {
  name: "pie-widget-chart",
  extends: Doughnut,
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
