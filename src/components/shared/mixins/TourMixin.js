
/**
 * TOUR Mixin
 *
 */

export default {
  data() {
    this.tour_active_class = "tour-active"
    this.tour_body = "in-tour"
    this.tourCallbacks = {
      onStart: this.tourFirstTime,
      onNextStep: this.onNextStep,
      onPreviousStep: this.onPreviousStep,
      onStop: this.tourFinish,
      onSkip: this.tourSkip
    }
    this.tourDelayStart = 300
    return {
      started: false
    }
  },
  computed: {
    tour() {
      if (!this.$tours || !this.$tours[this.tourName])
        return
      return this.$tours[this.tourName]
    }
  },
  mounted: function () {

    if (!this.tour)
      return

    this.tour.options.labels.buttonNext = "Próximo"
    this.tour.options.labels.buttonPrevious = "Anterior"
    this.tour.options.labels.buttonSkip = "Pular"
    this.tour.options.labels.buttonStop = "Entendi"

    if (this.isReady === undefined)
      this.tourStart()
  },
  watch: {
    isReady(ready) {
      if (ready)
        this.tourStart()
    }
  },
  methods: {
    tourFirstTime () {

      if (!this.steps || this.steps.length <= 0)
        return

      const curStepEl = document.querySelector(this.steps[0].target)

      if (!curStepEl) {
        return
      }

      // Add the in-tour class to body
      document.body.classList.add(this.tour_body)

      // Add the active class for the first step
      curStepEl.classList.add(this.tour_active_class)
    },
    onNextStep(currentStep) {

      const curStepEl = document.querySelector(this.steps[ currentStep ].target)
      const nextStepEl = document.querySelector(this.steps[ currentStep + 1 ].target)

      //Add active class to next step and remove from current.
      curStepEl.classList.remove(this.tour_active_class)
      nextStepEl.classList.add(this.tour_active_class)
    },
    onPreviousStep(currentStep) {
      const curStepEl = document.querySelector(this.steps[ currentStep ].target)
      const prevStepEl = document.querySelector(this.steps[ currentStep - 1 ].target)

      //Add active step to previous and remove from current.
      curStepEl.classList.remove(this.tour_active_class)
      prevStepEl.classList.add(this.tour_active_class)

    },
    tourStart() {
      if (this.didUserSkippedTour())
        return
      if (!this.started) {
        setTimeout(() => {
          this.tour.start()
          this.started = true
        }, this.tourDelayStart)
      }
    },
    tourFinish () {

      try {
        this.userFinishedTour()
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
      }
    },
    tourSkip () {

      try {
        this.$notify({
          message:
            this.$t("tour.tour_skipped"),
          timeout: 6000,
          type: "primary",
          overlap: true,
          horizontalAlign: "right",
          verticalAlign: "top",
        })

        this.userFinishedTour()
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
      }
    },
    didUserSkippedTour() {

      const app_metadata = this.getUserAppMetadata()

      if (app_metadata && typeof app_metadata === "object") {
        if ("tours" in app_metadata) {
          if (app_metadata.tours.includes( this.tourName )) {
            return true
          }
        }
      }
      return false
    },
    getUserAppMetadata() {
      return this.$store.getters["account/appMetaData"]
    },
    userFinishedTour() {

      const tours_skiped_updated = this.addCurrentTourToMetadata()

      this.$store
        .dispatch("account/updateUser", {
          "tours" : tours_skiped_updated
        })
        .then(res => {

          if (res) {

            this.$store.commit("account/setTours", tours_skiped_updated)

            this.finished = true

            // We finished the tour, so remove in-tour from body and remove active class.
            document.body.classList.remove(this.tour_body)
            const element = document.querySelector(`.${this.tour_active_class}`)

            if (element)
              element.classList.remove(this.tour_active_class)
          }
          else {
            this.$notify({
              message:
                this.$t("tour.tour_skip_error"),
              timeout: 6000,
              type: "warning"
            })
          }
        })
    },
    addCurrentTourToMetadata() {

      // we need to add current tour to metadata array
      const current_app_metadata = this.getUserAppMetadata() || []
      var new_app_metadata_tours = []

      if ("tours" in current_app_metadata)
        new_app_metadata_tours = current_app_metadata.tours // ["hotmart"]

      if (!new_app_metadata_tours.includes(this.tourName))
        new_app_metadata_tours.push(this.tourName)
      return new_app_metadata_tours
    }
  }
}
