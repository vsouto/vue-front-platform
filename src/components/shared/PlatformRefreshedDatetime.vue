<template>
  <div
    class="stats-refreshed-datetime"
  >
    <refresh-button
      :disabled="!canBeRefreshed || isRefreshing"
      class="refresh-widget"
      size="xs"
      @click.native="$emit('onRefresh')"
    />
    <span v-if="isRefreshing">
      {{ $t("metrics.loading") }}
    </span>
    <span v-else>
      {{ $t("common.updated_datetime") }}
      {{ formatHumanized(refreshedDatetime) }}
    </span>
  </div>
</template>
<script>
import { formatHumanizedDate} from "@/utils/formatters"

export default {
  props: {
    refreshedDatetime: {
      type: null,
      default: null
    },
    isRefreshing: {
      type: Boolean,
      default: false
    },
    canBeRefreshed: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    formatHumanized(datetime) {
      if (!this.$moment.isMoment(datetime))
        datetime = this.$moment(datetime)
      return formatHumanizedDate(datetime)
    }
  }
}
</script>