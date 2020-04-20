<template>
  <div class="row">
    <label class="col-md-3 col-form-label">Frequência ></label>
    <div class="col-sm-6">
      <div class="form-group">
        <div class="mb-0">
          <base-input
            v-model="frequency"
            type="text"
            @change="changeValue($event)"
          />
        </div>
      </div>
    </div>
    <label class="col-sm-2 label-on-right"><code>(maior que)</code></label>
  </div>
</template>

<script>

export default {
  name: "FrequencyFilter",
  data() {
    return {
      frequency: ""
    }
  },
  methods: {
    changeValue(event) {
      this.$emit("filter_input", event)
    }
  }
}
</script>
