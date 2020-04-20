

import PlanModel from  "@/subscriptions/models/plan"

export default {
  data() {
    return {
      plan: this.$store.getters["account/plan"]
    }
  },
  computed: {
    planInfoText() {
      return " " + this.$t("subscription.trial_days_left").toLowerCase()
    },
    isTrial: function () {
      if (!this.validPlan)
        return false

      if ("trial_begin" in this.plan) {
        return !!this.plan["trial_begin"]
      }
      return false
    },
    isExpired: function () {
      if (!this.validPlan)
        return false

      if (this.isTrial()) {
        if ("trial_begin" in this.plan)
          return this.plan.trial_begin.length >0
      }
      return false
    },
    planInfo: function () {
      if (!this.validPlan)
        return ""

      if (this.isTrial)
        return this.plan.trial_days_left + this.planInfoText

      return this.plan.title
    },
    planIcon: function() {
      return {
        "calendar-alert": this.isTrial,
        "star-outline": !this.isTrial
      }
    },
    validPlan: function () {
      if (!this.plan || typeof this.plan !== "object")
        return false

      return true
    }
  },
  created() {

    this.$store.subscribe((mutation, state) => {

      if (mutation.type === "account/setPlan") {
        if (state.account && state.account.user) {
          if (state.account.user.plan) {

            this.plan = new PlanModel(state.account.user.plan)
            this.isLoading = false
          }
        }
      }
    })

    if (this.plan) {

      this.isLoading = false
      if (typeof this.plan !== PlanModel)
        this.plan = new PlanModel(this.plan)
    }
  },
  mounted: function () {

  }
}
