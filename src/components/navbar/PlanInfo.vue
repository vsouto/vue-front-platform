<template>
  <div
    v-if="validPlan"
  >
    <base-button
      :class="btnClass"
      simple
      link
      @click.native="togglePlanInfo"
    >
      <calendar-alert-icon v-if="isTrial" />
      <star-icon v-else />
      <span class="plan-info-text">
        {{ planInfo }}
      </span>
    </base-button>
    <!-- Plan Modal -->
    <plan-modal
      ref="planModalRef"
      :plan="plan"
      @submit="false"
    />
  </div>
</template>

<script>

import CalendarAlertIcon from "icons/CalendarAlert.vue"
import StarIcon from "icons/Star.vue"
import PlanModal from "@/components/modals/PlanModal"
import PlanInfoMixin from "../shared/mixins/PlanInfoMixin"

export default {
  name: "PlanInfo",
  components: {
    CalendarAlertIcon,
    StarIcon,
    PlanModal
  },
  mixins: [PlanInfoMixin],
  data: function () {
    return {
      isLoading: true
    }
  },
  computed: {
    btnClass: function () {

      const defaultClass = "btn-secondary"
      const warningClass = "btn-warning"
      const dangerClass = "btn-danger"

      if (!this.validPlan)
        return false

      if (this.plan["trial_days_left"] <= 2)
        return dangerClass

      if (this.plan["trial_days_left"] <= 4)
        return warningClass

      return defaultClass
    }
  },
  methods: {
    togglePlanInfo: function () {
      this.$router.push({ name: "Subscriptions"})
    }
  }
}
</script>

<style lang="scss" scoped>
  .plan-info-text {
    padding-left: 0.5rem;
  }
</style>
