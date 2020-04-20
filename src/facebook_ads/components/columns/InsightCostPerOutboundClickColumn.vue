<script>
import i18n from "@/i18n"
import BaseColumn from "@/facebook_ads/components/columns/BaseColumn"

export default {
  extends: BaseColumn,
  prop: "cost_per_outbound_click",
  label: i18n.tc("facebook_ads.cpc"),
  methods: {
    getValue(row) {
      let obj = row[this.prop] || []
      if (obj.length)
        return this.formatCurrency(obj[0].value, row, 5)
    },
  }
}
</script>