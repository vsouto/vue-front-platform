<template>
  <div class="row">
    <label
      v-if="title"
      class="col-md-3 col-form-label"
    >
      {{ title }}
    </label>
    <div class="col-sm-6">
      <div class="form-group">
        <div class="mb-0">
          <base-switch
            v-model="value"
            @change="$emit('change', $event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BaseSwitch } from "@/components/lib"

export default {
  components: {
    BaseSwitch
  },
  props: {
    title: {
      type: String,
      default: null
    },
    currentValue: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: this.currentValue
    }
  }
}
</script>
