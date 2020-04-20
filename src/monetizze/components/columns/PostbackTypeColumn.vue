<script>
import i18n from "@/i18n"
import BaseColumn from "@/monetizze/components/columns/BaseColumn"
export default {
  extends: BaseColumn,
  prop: "postback_type_code",
  label: i18n.tc("common.type"),
  data() {
    this.prop = this.$options.prop
    this.label = this.$options.label
    this.tooltip = true
    this.width = 100
    return {}
  },
  methods: {
    getValue(row) {
      let id = row.id || row.stats.id
      if (id && id.toString().indexOf("account::") === 0)
        return this.$t("monetizze.whole_account")

      let code = row.postback_type_code
      if (code == 1)
        return this.$t("monetizze.system")
      if (code == 2)
        return this.$t("monetizze.producer")
      if (code == 3)
        return this.$t("monetizze.co_producer")
      if (code == 4)
        return this.$t("monetizze.affiliate")
      if (code == 5)
        return this.$t("monetizze.premium_affiliate")
      if (code == 6)
        return this.$t("monetizze.affiliate_manager")
      if (code == 7)
        return this.$t("monetizze.co_affiliate")
    }
  }
}
</script>
