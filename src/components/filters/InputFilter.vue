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
          <base-input
            v-model="value"
            :placeholder="placeholder"
            :type="type"
            @change="$emit('change', $event)"
          />
        </div>
      </div>
    </div>
    <label class="col-sm-2 label-on-right"><code>(maior que)</code></label>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: null
    },
    currentValue: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text",
      validator: prop => ["text", "number"].includes(prop)
    }
  },
  data() {
    return {
      value: this.currentValue
    }
  }
}
</script>
