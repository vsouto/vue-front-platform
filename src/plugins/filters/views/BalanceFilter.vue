<template>
  <div class="row">
    <label class="col-md-3 col-form-label">{{ $t("facebook_ads.filter_balance") }}</label>
    <div class="col-sm-6">
      <div class="form-group">
        <div class="mb-0">
          <base-switch
            v-model="balance"
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
  name: "BalanceFilter",
  components: {
    BaseSwitch
  },
  data() {
    return {
      balance: false,
    }
  },
  methods: {
    changeValue(event) {
      this.$emit("filter_input", event)
    }
  }
}
</script>
