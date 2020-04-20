<template>
  <select-filter
    :title="$t('facebook_ads.filters.account_status')"
    :current-value="currentValue"
    :options="options"
    @change="$emit('filter_input', $event)"
  />
</template>

<script>
import SelectFilter from "@/components/filters/SelectFilter"
const field = "account_status",
  defaultValue = "1"
export default {
  field: field,
  defaultValue: defaultValue,
  components: {
    SelectFilter
  },
  props: {
    currentValue: {
      type: [String, null],
      default: defaultValue
    }
  },
  beforeCreate() {
    this.options = [
      {
        name: this.$t("facebook_ads.enabled_accounts"),
        value: "1"
      },
      {
        name: this.$t("facebook_ads.disabled_accounts"),
        value: "-1"
      }
    ]
    const customValidator = (value) => this.options.map(o => o.value).includes(value)
    this.validation = {
      required: false,
      customValidator
    }
  }
}
</script>
