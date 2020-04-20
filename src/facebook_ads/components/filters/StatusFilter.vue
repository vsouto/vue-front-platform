<template>
  <select-filter
    title="Status"
    :current-value="currentValue"
    :options="options"
    @change="$emit('filter_input', $event)"
  />
</template>

<script>
import SelectFilter from "@/components/filters/SelectFilter"
const field = "effective_status",
  defaultValue = "ACTIVE"
export default {
  field: field,
  defaultValue: defaultValue,
  components: {
    SelectFilter
  },
  props: {
    currentValue: {
      type: [String, null],
      default: defaultValue
    }
  },
  beforeCreate() {
    this.options = [
      {
        name: "ACTIVE",
        value: "ACTIVE"
      },
      {
        name: "PAUSED",
        value: "PAUSED"
      }
    ]
    const customValidator = (value) => this.options.map(o => o.value).includes(value)
    this.validation = {
      required: false,
      customValidator
    }
  }
}
</script>
