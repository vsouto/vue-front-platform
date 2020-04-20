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
          <select
            v-validate="validations"
            class="form-control form-select"
            @change="change"
          >
            <option
              :selected="null == currentValue"
              :value="null"
            >
              {{ placeholder }}
            </option>
            <option
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              :selected="option.value == currentValue"
            >
              {{ option.name || option.value }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: null
    },
    options: {
      type: Array,
      required: true
    },
    currentValue: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: "-----"
    },
    validations: {
      type: Object,
      default: () => {
        return {required: false}
      }
    },
  },
  methods: {
    change($event) {
      this.$validator.validateAll().then(isValid => {
        if (!isValid) return
        this.$emit("change", $event)
      })
    }
  }
}
</script>
