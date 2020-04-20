<template>
  <switch-filter
    :title="$t('facebook_ads.filters.with_spend')"
    :current-value="currentValue"
    @change="$emit('filter_input', $event)"
  />
</template>

<script>
import SwitchFilter from "@/components/filters/SwitchFilter"

export default {
  components: {
    SwitchFilter
  },
  props: {
    currentValue: {
      type: Boolean,
      default: false
    }
  }
}
</script>
