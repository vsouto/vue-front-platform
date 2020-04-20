<template>
  <div class="row">
    <label class="col-md-3 col-form-label">Objective</label>
    <div class="col-sm-6">
      <div class="form-group">
        <div class="mb-0">
          <select
            class="form-control form-select"
            @change="changeValue($event)"
          >
            <option>-- Please Select --</option>
            <option
              v-for="(option, index) in options"
              :key="index"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ObjectivesFilter",
  data() {
    return {
      options: [
        "APP_INSTALLS",
        "BRAND_AWARENESS",
        "CONVERSIONS",
        "EVENT_RESPONSES",
        "LEAD_GENERATION",
        "LINK_CLICKS",
        "LOCAL_AWARENESS",
        "MESSAGES",
        "OFFER_CLAIMS",
        "PAGE_LIKES",
        "POST_ENGAGEMENT",
        "PRODUCT_CATALOG_SALES",
        "REACH",
        "VIDEO_VIEWS"
      ]
    }
  },
  methods: {
    changeValue(event) {
      this.$emit("filter_input", event)
    }
  }
}
</script>
