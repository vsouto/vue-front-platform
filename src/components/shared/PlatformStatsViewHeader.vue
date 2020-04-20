<template>
  <card>
    <div class="stats-view-container">
      <div class="stats-view-title">
        <h1>
          <img :src="platform.icon">
          <span>{{ title || platform.name }}</span>
        </h1>
      </div>
      <div class="asset-metrics-container">
        <select
          class="form-control form-select asset-metrics-toggle"
          @change="$emit('onViewToggle', $event.target.value)"
        >
          <option
            :selected="viewType == 'metrics'"
            value="metrics"
          >
            {{ $t("common.metrics") }}
          </option>
          <option
            :selected="viewType == 'info'"
            value="info"
          >
            {{ $t("common.config") }}
          </option>
        </select>
        <platform-refreshed-datetime
          v-if="refreshedDatetime"
          :refreshed-datetime="refreshedDatetime"
          :can-be-refreshed="canBeRefreshed(refreshedDatetime)"
          :is-refreshing="isRefreshing"
          class="tool-refreshed"
          @onRefresh="$emit('onRefresh')"
        />
      </div>
      <platform-column-config
        :platform="platform"
        :view-id="viewId"
        :columns="viewColumns"
        :selected="selectedViewColumns"
        class="tool-column-config"
        @onSetColumns="onSetColumns"
      />
      <platform-filter
        v-if="viewFilters.length"
        :platform="platform"
        :filters="viewFilters"
        class="tool-filter"
        @filter="onFilter"
      />
      <date-picker
        v-if="viewType == 'metrics'"
        class="stats-view-datepicker"
        :selected-date="selectedDate"
        :is-ready="isReady"
        :is-fetching="isFetching"
        size="large"
        type="daterange"
        @change="onDateChange"
      />
    </div>
  </card>
</template>
<script>
import PlatformModel from "@/models/platform"
import PlatformFilter from "@/components/shared/PlatformFilter"
import PlatformRefreshedDatetime from "@/components/shared/PlatformRefreshedDatetime"
import PlatformColumnConfig from "@/components/shared/PlatformColumnConfig"
import DatePicker from "@/components/shared/DatePicker"


export default {
  components: {
    DatePicker,
    PlatformColumnConfig,
    PlatformFilter,
    PlatformRefreshedDatetime
  },
  props: {
    viewId: {
      type: String,
      required: true
    },
    selectedDate: {
      type: Array,
      required: true
    },
    isReady: {
      type: Boolean,
      default: false
    },
    isFetching: {
      type: Boolean,
      default: false
    },
    isFetchingInsights: {
      type: Boolean,
      default: false
    },
    platform: {
      type: PlatformModel,
      required: true
    },
    title: {
      type: String,
      default: null
    },
    viewFilters: {
      type: Array,
      default: () => []
    },
    viewColumns: {
      type: Array,
      default: () => []
    },
    selectedViewColumns: {
      type: Array,
      default: () => []
    },
    defaultFilterValues: {
      type: Array,
      default: () => []
    },
    refreshedDatetime: {
      type: null,
      default: null
    },
    isRefreshing: {
      type: Boolean,
      default: false
    },
    viewType: {
      type: String,
      default: "info"
    }
  },
  data() {
    return {
      infoOrMetrics: this.viewType == "metrics" || false
    }
  },
  methods: {
    onFilter(selectedFilters) {
      this.$emit("onFilter", selectedFilters)
    },
    onDateChange(date) {
      this.$emit("onDateChange", date)
      this.$store.commit("panel/SET_SELECTED_DATE", date)
    },
    onSetColumns(columns) {
      this.$emit("onSetColumns", columns)
      this.$store.commit(`${this.platform.module}/SET_VIEW_COLUMNS`, {
        view: this.viewId,
        columns: columns.map(c => c.prop)
      })
    },
    canBeRefreshed(datetime, threshold=1) {
      if (this.fetching) return false
      return Math.abs(this.$moment.duration(this.$moment(datetime) - this.$moment.now()).minutes()) > threshold
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  margin-bottom: 2rem;
  /deep/ .card-body {
    padding: 0.5rem 1rem;
  }
}
.stats-view-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-content: baseline;
  .stats-view-title {
    flex: 1 1 auto;
    justify-self: flex-start;
    align-self: center;
    h1 {
      margin: 0;
      padding: 0;
      font-size: 1.5rem;
      img {
        height: 25px;
        vertical-align: bottom
      }
      span {
        margin-left: 0.5rem
      }
    }
  }
  .asset-metrics-container {
    background: #1e1e28;
    display: flex;
    flex-flow: row nowrap;
    flex: 0 1 auto;
    align-items: center;
    margin: 0 0.25rem;
    .asset-metrics-toggle {
      flex: 0 1 12rem;
      border: none;
    }
    .tool-refreshed {
      flex: 0 1 auto;
      font-size: 0.8em;
      white-space: nowrap;
      padding: 0 0.5rem;
    }
  }
  .tool-column-config {
    background: #1e1e28;
    flex: 0 1 auto;
    margin: 0 0.25rem;
  }
  .tool-filter {
    background: #1e1e28;
    flex: 0 1 auto;
    margin: 0 0.25rem;
    /deep/ .filter-toggle {
      color: $white;
      .filter-icon {
        vertical-align: middle
      }
    }
  }
  /deep/ .dropdown.show {
    .dropdown-menu.show {
      color: #525f7f !important;
      background-color: #26283d !important;
      left: -27.5rem !important;
      top: 3rem !important;
      width: 30rem !important;
      &:before {
        color: #222a42;
        width: 0.5rem;
        height: 0.5rem;
        top: -8px;
        right: 0;
        left: auto
      }
    }
  }
  .stats-view-datepicker {
    flex: 0 1 15rem;
    margin: 0 0.25rem;
    background: #1e1e28 !important
  }
}
</style>