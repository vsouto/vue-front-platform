<template>
  <card
    class="widget"
  >
    <loading
      v-if="!isCreating && (!isReady || isFetching || isInSync)"
      :error="isErrored"
      :in-sync="isInSync"
      :progress="progressValue"
    />
    <slot name="header">
      <el-row
        slot="header"
        type="flex"
        :gutter="10"
      >
        <el-col>
          <summary-icon v-if="type == 'summary'" />
          <panel-summary-icon v-if="type == 'panel-summary'" />
          <chart-icon v-if="type == 'chart'" />
          <table-icon v-if="type == 'table'" />
          <span class="widget-title">{{ title }}</span>
        </el-col>
      </el-row>
    </slot>
    <slot />
  </card>
</template>

<script>
import ChartLineVariantIcon from "icons/ChartLineVariant.vue"
import ChartAreasplineIcon from "icons/ChartAreaspline.vue"
import FinanceIcon from "icons/Finance.vue"
import TableIcon from "icons/Table.vue"

export default {
  components: {
    "summary-icon": ChartLineVariantIcon,
    "panel-summary-icon": FinanceIcon,
    "chart-icon": ChartAreasplineIcon,
    "table-icon": TableIcon
  },
  props: {
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: null // summary, chart, table, panel-summary
    },
    isCreating: {
      type: Boolean,
      default: false
    },
    isReady: {
      type: Boolean,
      default: true
    },
    isFetching: {
      type: Boolean,
      default: false
    },
    isInSync: {
      type: Boolean,
      default: false
    },
    isErrored: {
      type: Boolean,
      default: false
    },
    progressValue: {
      type: Number,
      default: 0
    }
  }
}
</script>
