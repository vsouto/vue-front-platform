<script>
import i18n from "@/i18n"
import BaseColumn from "@/facebook_ads/components/columns/BaseColumn"

export default {
  extends: BaseColumn,
  prop: "outbound_clicks_ctr",
  label: i18n.tc("facebook_ads.ctr"),
  methods: {
    getValue(row) {
      let obj = row[this.prop] || []
      if (obj.length)
        return this.formatPercentage(obj[0].value, row)
    },
  }
}
</script>