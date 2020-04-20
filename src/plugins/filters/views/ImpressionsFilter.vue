<template>
  <div class="row">
    <label class="col-md-3 col-form-label">Impressões ></label>
    <div class="col-sm-6">
      <div class="form-group">
        <div class="mb-0">
          <base-input
            v-model="impressions"
            placeholder="digite um número"
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
  name: "ImpressionsFilter",
  data() {
    return {
      impressions: ""
    }
  },
  methods: {
    changeValue(event) {
      this.$emit("filter_input", event)
    }
  }
}
</script>
