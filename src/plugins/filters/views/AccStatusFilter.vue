<template>
  <div class="row">
    <label class="col-md-3 col-form-label">Account Status</label>
    <div class="col-sm-6">
      <div class="form-group">
        <div class="mb-0">
          <base-input
            v-model="acc_status"
            type="text"
            @change="changeValue($event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "AccStatusFilter",
  data() {
    return {
      acc_status: ""
    }
  },
  methods: {
    changeValue(event) {
      this.$emit("filter_input", event)
    }
  }
}
</script>
