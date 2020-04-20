<template>
  <div class="row">
    <label class="col-md-3 col-form-label">With Issues</label>
    <div class="col-sm-6">
      <div class="form-group">
        <div class="mb-0">
          <base-switch
            v-model="effective_status"
            @input="changeValue($event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { BaseSwitch } from "@/components/lib"

export default {
  name: "IssuesFilter",
  components: {
    BaseSwitch
  },
  data() {
    return {
      effective_status: false
    }
  },
  methods: {
    changeValue(event) {
      this.$emit("filter_input", event)
    }
  }
}
</script>
