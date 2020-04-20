<template>
  <div class="row">
    <label class="col-md-3 col-form-label">Estratégia de Lance</label>
    <div class="col-sm-6">
      <div class="form-group">
        <div class="mb-0">
          <select
            class="form-control form-select"
            @change="changeValue($event)"
          >
            <option>-- Please Select --</option>
            <option
              v-for="(option, index) in options"
              :key="index"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "BidStrategyFilter",
  data() {
    return {
      myFilter: "",
      options: [
        "LOWEST_COST_WITHOUT_CAP",
        "LOWEST_COST_WITH_BID_CAP",
        "TARGET_COST"
      ]
    }
  },
  methods: {
    changeValue(event) {
      this.$emit("filter_input", event)
    }
  }
}

</script>
