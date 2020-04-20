<script>
import i18n from "@/i18n"
import BaseColumn from "@/facebook_ads/components/columns/BaseColumn"

export default {
  extends: BaseColumn,
  prop: "funding_source_details",
  label: i18n.tc("facebook_ads.funding_source_details"),
  methods: {
    getValue(row) {
      let obj = row[this.prop]
      if (obj)
        return obj.display_string
    },
  }
}
</script>