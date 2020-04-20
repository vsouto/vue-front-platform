<template>
  <div class="row">
    <label class="col-md-3 col-form-label">Data início</label>
    <div class="col-sm-6">
      <div class="form-group">
        <div class="mb-0">
          <date-picker
            v-model="date"
            size="large"
            type="daterange"
            class="panel-date-picker"
            :placeholder="$t('common.select_date')"
            :range-separator="$t('common.date_separator')"
            format="dd/MM/yyyy"
            align="center"
            @change="changeValue($event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { DatePicker } from "element-ui"

export default {
  name: "DateFilter",
  components: {
    DatePicker
  },
  data() {
    return {
      date: "",
    }
  },
  computed: {
    selectedDate: function () {
      return []
    },
  },
  methods: {
    changeValue(event) {
      this.$emit("filter_input", event)
      this.date = event
    }
  }
}
</script>
