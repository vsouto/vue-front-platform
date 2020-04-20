<template>
  <div
    class="header-wizard-container"
  >
    <card
      class="panel-header-card-body"
    >
      <div class="stats-view-container">
        <div class="stats-view-title header-wizard-tab">
          <tab-label
            :active="panel.name.length>2"
            :label="'panel_editor.panel_name'"
          />
          <panel-name
            ref="panelName"
            v-model="panel.name"
          />
          <el-tooltip
            :content="$t('panel.tooltip_panel_name')"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <alert-icon
              v-if="panel.name.length<3"
              class="icon-2x panel-header-alert-icon"
              style="vertical-align: sub"
            />
          </el-tooltip>
        </div>
        <img
          src="/img/template/wizard-progress-division.png"
          class="header-division-bar"
        >
        <slot />
        <select-platforms
          v-if="isReady"
          :model="panel"
          @open="modalOpened = true"
          @close="modalOpened = false"
        />
        <img
          src="/img/template/wizard-progress-division.png"
          class="header-division-bar"
        >
        <select-widgets
          v-if="isReady"
          :layout="panel.layout.get()"
          @addWidget="$emit('addWidget', $event)"
          @addWidgets="$emit('addWidgets', $event)"
          @removeAllWidgets="$emit('removeAllWidgets')"
        />
        <div class="asset-metrics-container">
          <platform-refreshed-datetime
            v-if="refreshedDatetime"
            :refreshed-datetime="refreshedDatetime"
            :can-be-refreshed="canBeRefreshed(refreshedDatetime)"
            :is-refreshing="inSync"
            class="tool-refreshed"
            @onRefresh="$emit('onRefresh')"
          />
        </div>
        <date-picker
          v-if="!creating"
          class="stats-view-datepicker"
          :selected-date="selectedDate"
          :is-ready="isReady"
          :is-fetching="isFetching"
          :is-creating="creating"
          size="large"
          type="daterange"
          @change="onDateChange"
        />
      </div>
    </card>
    <div
      class="panel-header-actions"
    >
      <base-button
        v-if="creating && canSave"
        :loading="saving"
        type="success"
        class="create-panel-button"
        @click.native="$emit('savePanel')"
      >
        {{ $t("panel_editor.createPanel") }}
      </base-button>
      <base-button
        v-else-if="isModified && canSave"
        :loading="saving"
        type="success"
        class="update-panel-button"
        @click.native="$emit('savePanel')"
      >
        {{ $t("panel_editor.savePanel") }}
      </base-button>
    </div>
  </div>
</template>
<script>
import AlertIcon from "icons/Alert"
import PlatformRefreshedDatetime from "@/components/shared/PlatformRefreshedDatetime"
import PanelName from "@/components/panel-editor/PanelName"
import SelectPlatforms from "@/components/panel-editor/SelectPlatforms"
import SelectWidgets from "@/components/panel-editor/SelectWidgets"
import DatePicker from "@/components/shared/DatePicker"
import TabLabel from "@/components/panel-editor/TabLabel"

export default {
  components: {
    AlertIcon,
    PanelName,
    SelectPlatforms,
    SelectWidgets,
    DatePicker,
    PlatformRefreshedDatetime,
    TabLabel
  },
  props: {
    creating: {
      type: Boolean,
      default: false
    },
    saving: {
      type: Boolean,
      default: false
    },
    isModified: {
      type: Boolean,
      default: false
    },
    canSave: {
      type: Boolean,
      default: false
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
    inSync: {
      type: Boolean,
      default: false
    },
    refreshedDatetime: {
      type: null,
      default: null
    }
  },
  data() {
    return {}
  },
  computed: {
    title() {
      return this.panel && this.panel.name
    },
    panel() {
      return this.$store.getters["panel/getCurrentPanel"]
    }
  },
  methods: {
    onDateChange(date) {
      this.$emit("onDateChange", date)
      this.$store.commit("panel/SET_SELECTED_DATE", date)
    },
    canBeRefreshed(datetime, threshold=1) {
      if (this.fetching) return false
      return Math.abs(this.$moment.duration(this.$moment(datetime) - this.$moment.now()).minutes()) > threshold
    }
  }
}
</script>

<style scoped lang="scss">
  .header-wizard-container{
    position: relative;
    min-height: 66px;
  }
.card {
  margin-bottom: 1.2rem;
  /deep/ .card-body {
    /*padding: 0.5rem 1rem;*/
    /*border-radius: 1rem;*/
    padding: 0;
  }
}
.stats-view-container {
  margin-left: 10px;
  margin-right: 5px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-content: baseline;
  .stats-view-title {
    flex: 1 1 auto;
    justify-self: flex-start;
    align-self: center;
    img {
      height: 25px;
      vertical-align: bottom
    }
    span {
      width: 2rem !important;
      height: 2rem !important;
      display: inline-block;
      svg {
        width: 2rem !important;
        height: 2rem !important;
      }
    }
    .create-panel-button {
      margin: 0 0.5rem;
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

  .header-wizard-tab{
    position: relative;
  }
  .header-wizard-tab-platforms{
    min-width: 41%;
    position: relative;
  }
  .header-wizard-tab-widgets{
    min-width: 19%;
    position: relative;
  }
  .header-division-bar{
    border: 0;
  }
  .panel-header-card-body{
    float: left;
    height: 59px;
    max-height: 62px;
    max-width: 86%;
  }
  .panel-header-actions{
    float: left;
    margin: 6px;
    padding-left: 6px;
  }
.panel-header-alert-icon{
  position: absolute;
  top: 8%;
  right: 1%;
  color: $yellow;
}
.stats-view-container .el-date-editor{
  margin-top: 10px !important;
}
</style>
