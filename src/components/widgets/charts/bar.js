import { Bar, mixins } from "vue-chartjs"
export default {
  name: "bar-widget-chart",
  extends: Bar,
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
