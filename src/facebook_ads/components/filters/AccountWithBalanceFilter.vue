<template>
  <switch-filter
    :title="$t('facebook_ads.filters.account_with_balance')"
    :current-value="currentValue"
    @change="$emit('filter_input', $event)"
  />
</template>

<script>
import SwitchFilter from "@/components/filters/SwitchFilter"
const field = "balance",
  defaultValue = true

export default {
  field: field,
  defaultValue: defaultValue,
  components: {
    SwitchFilter
  },
  props: {
    currentValue: {
      type: Boolean,
      default: defaultValue
    }
  }
}
</script>
