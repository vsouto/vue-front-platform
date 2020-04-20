<template>
  <select-filter
    :title="$t('facebook_ads.filters.campaign_objective')"
    :options="options"
    :current-value="currentValue"
    @change="$emit('filter_input', $event)"
  />
</template>

<script>
import SelectFilter from "@/components/filters/SelectFilter"
const field = "objective",
  defaultValue = null

const options = [
  {name: "APP_INSTALLS", value: "APP_INSTALLS"},
  {name: "BRAND_AWARENESS", value: "BRAND_AWARENESS"},
  {name: "CONVERSIONS", value: "CONVERSIONS"},
  {name: "EVENT_RESPONSES", value: "EVENT_RESPONSES"},
  {name: "LEAD_GENERATION", value: "LEAD_GENERATION"},
  {name: "LINK_CLICKS", value: "LINK_CLICKS"},
  {name: "LOCAL_AWARENESS", value: "LOCAL_AWARENESS"},
  {name: "MESSAGES", value: "MESSAGES"},
  {name: "OFFER_CLAIMS", value: "OFFER_CLAIMS"},
  {name: "PAGE_LIKES", value: "PAGE_LIKES"},
  {name: "POST_ENGAGEMENT", value: "POST_ENGAGEMENT"},
  {name: "PRODUCT_CATALOG_SALES", value: "PRODUCT_CATALOG_SALES"},
  {name: "REACH", value: "REACH"},
  {name: "VIDEO_VIEWS", value: "VIEW_VIEWS"}
]
const customValidator = (value) => options.map(o => o.value).includes(value)

export default {
  field: field,
  defaultValue: defaultValue,
  components: {
    SelectFilter
  },
  props: {
    currentValue: {
      type: String,
      default: defaultValue
    }
  },
  data() {
    return {}
  },
  beforeCreate() {
    this.options = options
    this.validation = {
      required: false,
      customValidator
    }
  },
}
</script>
