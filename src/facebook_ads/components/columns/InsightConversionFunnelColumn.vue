<template>
  <el-table-column
    :fixed="fixed"
    :prop="prop"
    :min-width="200"
    :label="label"
    :show-overflow-tooltip="tooltip"
  >
    <template slot-scope="props">
      <vue-funnel-graph
        v-if="props.row.objective == 'CONVERSIONS'"
        :width="300"
        :height="10"
        :labels="[
          // 'Impressões',
          'Cliques',
          'Checkout',
          'Compras'
        ]"
        :values="[
          // props.row.impressions,
          getOutboundClicks(props.row),
          getActionValue(props.row, 'actions', 'offsite_conversion.fb_pixel_initiate_checkout'),
          getActionValue(props.row, 'actions', 'offsite_conversion.fb_pixel_purchase')
        ]"
        :colors="['#f6f9fc', '#0098f0', '#00f2c3']"
        direction="horizontal"
        gradient-direction="horizontal"
        :animated="false"
        :display-percentage="true"
      />
    </template>
  </el-table-column>
</template>
<script>
import i18n from "@/i18n"
import BaseColumn from "@/facebook_ads/components/columns/BaseColumn"

export default {
  extends: BaseColumn,
  prop: "funnel_conversion",
  label: i18n.tc("metrics.funnel_conversion"),
  methods: {
    getOutboundClicks(row) {
      let obj = row.outbound_clicks || []
      if (obj.length)
        return obj[0].value
    }
  }
}
</script>