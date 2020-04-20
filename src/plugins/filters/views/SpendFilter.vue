<template>
  <div class="row">
    <label class="col-md-3 col-form-label">{{ $t("facebook_ads.filter_spend") }}</label>
    <div class="col-sm-6">
      <div class="form-group">
        <div class="mb-0">
          <base-switch
            v-model="spend"
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
  name: "SpendFilter",
  components: {
    BaseSwitch
  },
  data() {
    return {
      spend: false
    }
  },
  methods: {
    changeValue(event) {
      this.$emit("filter_input", event)
    }
  }
}
</script>
