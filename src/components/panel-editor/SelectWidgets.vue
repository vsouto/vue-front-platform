<template>
  <div class="select-widgets header-wizard-tab-widgets">
    <base-button
      type="primary"
      link
      simple
      block
      @click.native="openModal()"
    >
      <tab-label
        :label="'sidebar.widgets'"
        :icon="icon"
        :active="hasWidgetSetup"
      />
    </base-button>
    <sweet-modal
      ref="modalWidget"
      overlay-theme="dark"
      modal-theme="dark"
      width="100%"
      @open="onModalOpen"
      @close="onModalClose"
    >
      <!-- Modal Title -->
      <div
        slot="title"
        class="sweet-title"
      >
        <h2>{{ $t("panel_editor.selectWidgets") }}</h2>
      </div>
      <div class="actions">
        <base-button
          type="info"
          simple
          @click.native="addAllWidgets()"
        >
          {{ $t("panel_editor.addAllAvailable") }}
        </base-button>
        <base-button
          type="warning"
          simple
          @click.native="removeAllWidgets()"
        >
          {{ $t("panel_editor.removeAll") }}
        </base-button>
      </div>
      <tabs
        type="primary"
        tab-nav-wrapper-classes="select-widgets-tabs"
        tab-content-classes="select-widgets-content"
        vertical
        square
        class="select-widgets-container"
      >
        <tab-pane
          v-for="widgetType in widgetsByType"
          :key="widgetType.id"
        >
          <span slot="label">
            <summary-icon v-if="widgetType.id == 'summary'" />
            <table-icon v-if="widgetType.id == 'table'" />
            <chart-icon v-else-if="widgetType.id == 'chart'" />
            {{ widgetType.name }}
          </span>
          <div
            v-for="widget in widgetType.widgets"
            :key="widget.id"
            :ref="`widget-${widget.id}`"
            class="widget-item"
            :class="`type-${widgetType.id} ${isWidgetAdded(widget.id) && 'added'} ${!panel.isWidgetEnabled(widget) && 'widget-disabled'}`"
          >
            <div class="widget-item-top">
              <add-button
                v-if="isWidgetAdded(widget.id)"
                round
                simple
                size="sm"
                type="secondary"
                title="Adicionado"
              />
              <add-button
                v-else-if="!panel.isWidgetEnabled(widget)"
                round
                simple
                size="sm"
                :title="'Indisponível: '+ $t(`widgets_unavailable.${widget.unavailable_reason}`)"
                type="warning"
              />
              <add-button
                v-else
                round
                size="sm"
                title="Adicionar"
                type="info"
                @click.native="addWidget(widget)"
              />
              <span
                v-if="widget.platforms.length"
                class="platforms"
              >
                <small>{{ $t("common.platforms") }}</small>
                <img
                  v-for="name in widget.platforms"
                  :key="name"
                  :src="platforms[name].icon"
                  :width="30"
                  :height="30"
                >
              </span>
            </div>
            <keep-alive>
              <component
                :is="widget.component"
                :key="panel.id+widget.id"
                :panel-id="panel.id"
                :widget="widget"
                :row-height="layoutRowHeight"
                :is-fetching-panel-stats="false"
                :is-creating="true"
              />
            </keep-alive>
            <div class="widget-item-bottom">
              <span class="description">{{ widget.description }}</span>
            </div>
          </div>
        </tab-pane>
      </tabs>
    </sweet-modal>
    <el-tooltip
      :content="$t('panel.tooltip_panel_widgets')"
      class="item"
      effect="dark"
      placement="top-start"
    >
      <alert-icon
        v-if="!hasWidgetSetup"
        class="icon-2x panel-header-alert-icon"
        style="vertical-align: sub"
      />
    </el-tooltip>
  </div>
</template>
<script>
import AlertIcon from "icons/Alert"
import TableIcon from "icons/Table"
import SummaryIcon from "icons/ChartLineVariant"
import ChartIcon from "icons/ChartAreaspline"
import { SweetModal } from "sweet-modal-vue"
import { TabPane, Tabs } from "src/components/lib"
import { BaseAlert } from "@/components/lib"
import PanelLayout from "@/models/panel/layout"
import WidgetModel from "@/models/widget"
import { all_platforms } from "@/platforms"
import TabLabel from "@/components/panel-editor/TabLabel"

const mapped_platforms = {}
all_platforms.map(p => {
  mapped_platforms[p.id] = p
})

export default {
  components: {
    AlertIcon,
    TableIcon,
    SummaryIcon,
    ChartIcon,
    SweetModal,
    TabPane,
    Tabs,
    BaseAlert,
    TabLabel
  },
  props: {
    layout: {
      type: Array,
      required: true
    }
  },
  data() {
    this.layoutColumns = PanelLayout.columns
    this.layoutRowHeight = PanelLayout.rowHeight
    this.layoutMargin = PanelLayout.margin
    this.platforms = mapped_platforms

    this.widgetsByType = WidgetModel.byType
    this.title = this.$t("panel.add_new_widget")
    return {
      currentWidgetType: "summary"
    }
  },
  computed: {
    panel() {
      return this.$store.getters["panel/getCurrentPanel"]
    },
    icon() {
      return "icon-atom"
    },
    hasWidgetSetup() {
      /*console.log('panel widgets are', this.panel.widgets); // eslint-disable-line
      console.log('layout is', this.layout); // eslint-disable-line
      console.log('layout widgets is', this.layout.widgets); // eslint-disable-line
      return this.panel.widgets.length>0*/
      return this.layout && this.layout.length>0
    },
  },
  beforeDestroy() {
    this.$sidebar.autoZIndex = false
  },
  methods: {
    openModal() {
      this.$refs.modalWidget.open()
    },
    onModalOpen() {
      this.$sidebar.autoZIndex = true
    },
    onModalClose() {
      this.$sidebar.autoZIndex = false
    },
    openWidgetModal(type) {
      this.currentWidgetType = type
      this.$refs.modalWidget.open()
    },
    addWidget(widget) {
      if (this.isWidgetAdded(widget.id)) {
        this.$notify({
          type: "warning",
          message: "Widget já adicionada ao painel"
        })
        return
      }
      if (!this.panel.isWidgetEnabled(widget)) {
        this.$notify({
          type: "warning",
          message: "Configure a plataforma desta widget primeiro."
        })
        return
      }
      this.$emit("addWidget", widget)
      this.$refs.modalWidget.close()
    },
    addAllWidgets() {
      let widgets = []
      for (let widgetType in this.widgetsByType)
        this.widgetsByType[widgetType].widgets.map(widget => {
          if (!this.isWidgetAdded(widget.id) && this.panel.isWidgetEnabled(widget))
            widgets.push(widget)
        })
      this.$emit("addWidgets", widgets)
      this.$refs.modalWidget.close()
    },
    removeAllWidgets() {
      this.$emit("removeAllWidgets")
      this.$refs.modalWidget.close()
    },
    isWidgetAdded(widgetId) {
      return this.layout.findIndex(item => item.i == widgetId) > -1
    },
    dismissRandomDataDisclaimer() {
      this.$store.commit("panel/SET_USER_SETTINGS", {
        name: "random_data_disclaimer",
        value: false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.select-widgets {
  color: $white;
  .config-title {
    font-size: 1rem
  }
  /deep/ .widgets-container {
    display: flex;
    flex-flow: row wrap;
    .widget-item {
      flex: .5 1 auto;
      margin: 1rem;
      text-align: left;
      .widget-component {
        min-height: auto;
        width: auto;
      }
    }
  }
  /deep/ .select-widgets-container {
    display: flex;
    flex-flow: row nowrap;

    .select-widgets-tabs {
      flex: 0 1 7rem;
      margin-right: 1rem;
    }

    .select-widgets-content {
      flex: 1 1 100%;
      .tab-pane {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        .widget-item {
          flex: 0 1 auto;
          margin: 1rem;
          text-align: left;
          .widget {
            min-height: auto
          }
          &.added, &.widget-disabled {
            order: 1;
            .card {
              opacity: 0.8;
            }
          }
          &.type-summary {
            flex: 0 1 20rem;
          }
          &.type-chart {
            flex: 0 1 45%;
          }
          &.type-table {
            flex: 0 1 45%;
          }
          .el-tooltip, .btn {
            display: inline-block
          }
          &.not-available {
            opacity: 0.1
          }
          .widget-item-top {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
          }
          .widget-item-bottom {
            display: flex;
            flex-flow: row wrap;
            .name {
              color: white;
              display: inline-block;
              margin-left: 1rem
            }
            .description {
              font-size: 0.8em;
              line-height: 1.2em;
              margin-top: 0.5em;
              flex: 1 1 100%;
              height: 3em;
              overflow: hidden
            }
            .platforms {
              flex: 1 1 auto;
            }
            .add-button {
              flex: 0 1 auto;
            }
          }
        }
      }
    }
  }
}
.sweet-modal .actions {
  justify-content: center;
  margin: -0.5rem 0 0;
}
.sweet-modal-overlay {
  /deep/ .sweet-content-content {
    height: 100vh;
  }
  /deep/ .sweet-title {
    h2 {
      margin: 1rem 0
    }
  }
}

  .panel-header-alert-icon{
    position: absolute;
    top: 8%;
    right: 1%;
    color: $yellow;
  }
</style>
