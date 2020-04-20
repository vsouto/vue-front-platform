<template>
  <div
    id="Panel"
    class="animated fadeIn"
  >
    <v-tour
      v-if="creating"
      :name="tourName"
      :steps="steps"
      :callbacks="tourCallbacks"
    />
    <loading
      v-if="!panelLoaded"
      :title="$t('panel.loading')"
    />
    <panel-header
      v-else
      :creating="creating"
      :is-modified="isModified"
      :can-save="canSave"
      :saving="savingPanel"
      :selected-date="selectedDate"
      :is-ready="panelLoaded && isStatsLoaded"
      :is-fetching="fetchingStats"
      :refreshed-datetime="refreshedDatetime"
      :in-sync="statsInSync"
      @onRefresh="refreshData()"
      @onDateChange="setSelectedDate"
      @addWidget="addWidget"
      @addWidgets="addWidgets"
      @removeAllWidgets="removeAllWidgets"
      @savePanel="savePanel"
    />
    <div
      v-loading="!isStatsLoaded"
      class="panel-layout"
    >
      <!-- TODO: move this to panel header with progress -->
      <div
        v-if="creating && panelLoaded"
        class="creating-panel-info"
      >
        <base-alert
          v-if="$store.getters['panel/canShowExamplePanelDisclaimer']"
          type="success"
          class="random-data-disclaimer"
          dismissible
          @dismiss="dismissExample()"
        >
          <h4>Um exemplo de configuração de painel, com dados gerados aleatoriamente:</h4>
        </base-alert>
      </div>
      <grid-layout
        v-if="panelLoaded && isStatsLoaded"
        :layout.sync="panel.layout.gridList"
        :col-num="layoutColumns"
        :row-height="layoutRowHeight"
        :margin="layoutMargin"
        :is-draggable="true"
        :is-resizable="true"
        :prevent-collision="false"
        :vertical-compact="true"
        :use-css-transforms="true"
        :auto-size="true"
        :responsive="true"
        @layout-ready="layoutReady = true"
      >
        <grid-item
          v-for="(item, idx) in panel.layout.gridList"
          :key="`grid-item-${idx}`"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :min-w="item.minW"
          :h="item.h"
          :min-h="item.minH"
          :i="item.i"
          drag-allow-from=".card-header, .drag-widget"
          drag-ignore-from="a, button, .btn"
        >
          <keep-alive>
            <component
              :is="panel.getWidget(item.i).component"
              :key="id+item.i"
              :panel-id="id"
              :widget="panel.getWidget(item.i)"
              :row-height="layoutRowHeight"
              :is-fetching-panel-stats="fetchingStats"
              :is-creating="creating"
            />
          </keep-alive>
          <drag-icon class="drag-widget" />
          <edit-button
            :tooltip-disabled="true"
            class="edit-widget"
            icon
            @click.native="editWidget(panel.getWidget(item.i))"
          />
          <delete-button
            :tooltip-disabled="true"
            class="remove-widget"
            icon="close"
            @click.native="removeWidget(item.i)"
          />
        </grid-item>
      </grid-layout>
      <sweet-modal
        ref="widgetModal"
        overlay-theme="dark"
        modal-theme="dark"
        @open="onOpenEditWidget"
        @close="onCloseEditWidget"
      >
        {{ editingWidget }}
        <base-button
          slot="button"
          type="primary"
        >
          {{ $t("common.save") }}
        </base-button>
      </sweet-modal>
    </div>
  </div>
</template>

<script>
import VueGridLayout from "vue-grid-layout"
import FORMATS from "@/constants/formats"
import { CancelToken } from "@/api"
import { CANCELLED_BY_USER } from "@/constants/api_status"

// Icons
import DragIcon from "icons/DragVariant"

// Models
import PanelModel from "@/models/panel"
import PanelStatsModel from "@/models/panelStats"
import WidgetStatsModel from "@/models/widgetStats"

// Tour
import TourMixin from "@/components/shared/mixins/TourMixin"

// Components
import CheckCircleOutlineIcon from "icons/CheckCircleOutline"
import { BaseAlert } from "@/components/lib"
import { SweetModal } from "sweet-modal-vue"
import PanelHeader from "@/components/panel/PanelHeader"
import PanelLayout from "@/models/panel/layout"

export default {
  name: "Panel",
  components: {
    SweetModal,
    PanelHeader,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    BaseAlert,
    "completed-icon": CheckCircleOutlineIcon,
    "drag-icon": DragIcon
  },
  mixins: [TourMixin],
  props: {
    id: {
      type: String,
      required: true
    },
    creating: {
      type: Boolean,
      default: false
    }
  },
  data() {
    this.fetchStatsInterval = 3000
    this.locale =  "pt-br"
    this.cancelSource = CancelToken.source()
    this.timeout = {}
    this.originalModel = null

    // Layout Grid Config
    this.layoutColumns = PanelLayout.columns
    this.layoutRowHeight = PanelLayout.rowHeight
    this.layoutMargin = PanelLayout.margin

    // Widgets loaded
    this.widgetsLoaded = false

    // Tour
    this.tourName = "createPanel"
    this.steps = [
      {
        target:".panel-name",
        content:"Escolha um nome para seu novo painel"
      },
      {
        target:".select-platforms",
        content:"Selecione as contas das plataformas que deseja acompanhar"
      },
      {
        target:".vue-grid-item:nth-of-type(5)",
        content:"Reposicione as widgets onde quiser e no tamanho que quiser."
      },
      {
        target:".vue-grid-item:nth-of-type(6)",
        content:"Personalize cada widget ou simplesmente remova"
      },
      {
        target:".select-widgets",
        content:"Adicione novas widgets em seu painel aqui"
      }
    ]
    return {
      selectedDate: this.$store.getters["panel/selectedDate"],
      panel: null,
      panelStats: null,
      layoutReady: false,
      refreshedDatetime: null,
      editingWidget: null,
    }
  },
  computed: {
    panelLoaded() {
      return this.panel instanceof PanelModel
    },
    isStatsLoaded() {
      return this.panelStats instanceof PanelStatsModel
    },
    isModified() {
      return this.panel && !this.panel.isEqual(this.originalModel)
    },
    canSave() {
      return this.isModified && this.panel.canSave() && this.errors.items.length == 0
    },
    statsInSync() {
      if (!this.panelLoaded || !this.isStatsLoaded) return false
      return this.panelStats.percent_ready < 1
    },
    percentReady() {
      if (!this.panelLoaded || !this.isStatsLoaded)
        return 0
      return this.panelStats.percent_ready * 100
    },
    dateStart() {
      return this.$moment(this.selectedDate[0]).format(FORMATS.date)
    },
    dateEnd() {
      return this.$moment(this.selectedDate[1]).format(FORMATS.date)
    },
    fetchingStats() {
      const fetchAttr = `panel/fetchPanelStats/${this.id}`
      return this.$store.getters["isFetching"](fetchAttr)
    },
    savingPanel() {
      const fetchAttr = this.creating ? "panel/createPanel" : "panel/updatePanel"
      return this.$store.getters["isFetching"](fetchAttr)
    }
  },
  watch: {
    percentReady(newVal, oldVal) {
      // eslint-disable-next-line no-console
      console.debug("percentReady", newVal, oldVal)
      if (newVal > 90) {
        if (this.widgetsLoaded) return
        let panelStats = this.panelStats
        this.panel.widgets.map(widget => {
          let widgetStats = this.$store.getters["panel/getWidgetStatsByIds"](this.panel.id, widget.id)
          if (!(widgetStats instanceof WidgetStatsModel)) {
            widgetStats = new WidgetStatsModel(widget, { panelStats })
          } else {
            widgetStats.setupFromPanelStats(widget, { panelStats })
          }
          const panelId = this.panel.id,
            widgetId = widget.id
          this.$store.commit("panel/SET_PANEL_WIDGET_STATS", {
            panelId, widgetId, widgetStats
          })
          if (!this.creating && !widget.customDate && !widgetStats.percent_ready)
            this.fetchSingleWidgetStats(widget)
        })
        this.widgetsLoaded = true
      }
    },
    selectedDate(newDate, oldDate) {
      if ((newDate && !oldDate) || (newDate.toString() != oldDate.toString()))
        this.fetchPanelStats()
    }
  },
  beforeDestroy() {
    this.resetView()
  },
  activated() {
    this.loadView()
  },
  deactivated() {
    this.resetView()
  },
  created() {
    this.loadView()
  },
  methods: {
    async loadView() {
      this.$sidebar.hide = false
      this.widgetsLoaded = false
      let currentPanel
      if (!this.creating) {
        currentPanel = this.$store.getters["panel/getPanelById"](this.id)
        if (!currentPanel)
          await this.$store.dispatch("panel/fetchPanel", this.id)
            .then(panel => {
              currentPanel = panel
            })
        currentPanel = new PanelModel(currentPanel)
      } else {
        currentPanel = new PanelModel({creating: this.creating})
      }
      this.setCurrentPanel(currentPanel)
    },
    setCurrentPanel(currentPanel) {
      this.$store.commit("panel/SET_CURRENT_PANEL", currentPanel)
      this.$nextTick().then(() => {
        this.panel = currentPanel
        this.originalModel = Object.freeze(currentPanel.clone())
        this.fetchPanelStats()
      })
    },
    fetchPanelStats() {
      let currentPanelStats = this.$store.getters["panel/getPanelStatsById"](this.id)
      if (this.creating)
        return this.setCurrentPanelStats(
          new PanelStatsModel({
            id: this.panel.id,
            creating: this.creating
          })
        )
      if (currentPanelStats)
        this.setCurrentPanelStats(new PanelStatsModel(currentPanelStats))
      if (this.fetchingStats)
        return
      this.$store.dispatch("panel/fetchPanelStats", {
        id: this.id,
        data: {
          date_start: this.dateStart,
          date_end: this.dateEnd
        },
        cancelSource: this.cancelSource.token
      })
        .then((response) => {
          if (!response || response.error)
            return this.fetchStatsError()
          const panelStats = response
          if (panelStats.percent_ready < 1)
            this.startPolling(this.id)
          this.setCurrentPanelStats(new PanelStatsModel(panelStats))
        })

    },
    setCurrentPanelStats(currentPanelStats) {
      this.$store.commit("panel/SET_CURRENT_PANEL_STATS", currentPanelStats)
      this.$nextTick().then(() => {
        this.panelStats = currentPanelStats
      })
    },
    fetchStatsError() {
      const message = {
        type: "danger",
        message: `Erro ao recuperar métricas para o painel ${this.panel.name}`
      }
      this.$notify(message)
    },
    startPolling(panelId) {
      this.$nextTick().then(() => {
        let self = this
        this.timeout[panelId] = setTimeout(() => {
          self.fetchPanelStats()
        }, self.fetchStatsInterval)
        this.fetchStatsInterval += 1000
      })
    },
    fetchSingleWidgetStats(widget) {
      const fetchAttr = `panel/fetchSingleWidgetStats/${this.id}/${widget.id}`
      if (this.$store.getters["isFetching"](fetchAttr))
        return
      const panelId = this.id,
        widgetId = widget.id,
        cancelToken = this.cancelSource.token,
        data = {
          date_start: this.dateStart,
          date_end: this.dateEnd
        }
      this.$store.dispatch("panel/fetchSingleWidgetStats", {
        panelId, widgetId, data, cancelToken
      })
        .then((widgetStats) => {
          if (!widgetStats) return
          if (widgetStats.percent_ready < 1) {
            let self = this
            this.timeout[widget.id] = setTimeout(() => {
              self.fetchSingleWidgetStats(widget)
            }, self.fetchStatsInterval)
            this.fetchStatsInterval += 500
          }
          widgetStats = new WidgetStatsModel(widget, {widgetStats})
          this.$store.commit("panel/SET_PANEL_WIDGET_STATS", {
            panelId, widgetId, widgetStats
          })
        })
    },
    resetView() {
      this.fetchStatsInterval = 3000
      this.clearTimeouts()
      this.generateNewCancelToken()
    },
    async clearTimeouts() {
      for (let timeoutId in this.timeout)
        if (this.timeout[timeoutId] !== null) {
          clearTimeout(this.timeout[timeoutId])
          this.$nextTick().then(() => {
            this.timeout[timeoutId] = null
          })
        }
    },
    generateNewCancelToken() {
      this.cancelSource.cancel(CANCELLED_BY_USER)
      this.cancelSource = CancelToken.source()
    },
    setSelectedDate(date) {
      this.selectedDate = date
      this.$store.commit("panel/SET_SELECTED_DATE", date)
    },
    addWidget(widget) {
      this.panel.layout.addWidget(widget)
      this.layout = this.panel.layout.get()
    },
    addWidgets(widgets) {
      widgets.map(widget => {
        this.panel.layout.addWidget(widget)
      })
      this.layout = this.panel.layout.get()
    },
    editWidget(widget) {
      this.editingWidget = widget
      this.$refs.widgetModal.open()
    },
    onOpenEditWidget() {
      this.$sidebar.autoZIndex = true
    },
    onCloseEditWidget() {
      this.$sidebar.autoZIndex = false
    },
    removeWidget(i) {
      this.panel.layout.removeWidget(i)
    },
    removeAllWidgets() {
      this.panel.layout.removeAllWidgets()
    },
    savePanel() {
      try {
        let action
        if (this.creating)
          action = "panel/createPanel"
        else
          action = "panel/updatePanel"
        return this.$store.dispatch(action, this.panel)
          .then((newPanel) => {
            if (!newPanel)
              this.savePanelError()
            else {
              this.savePanelSuccess()
              if (this.creating)
                this.$router.push({
                  name: "Panel",
                  params: {
                    id: newPanel.id,
                    creating: false
                  }
                })
            }
          })
      } catch (err) {
        this.savePanelError()
      }
    },
    savePanelSuccess() {
      let message
      if (this.creating)
        message = this.$t("panel_editor.panelCreated")
      else
        message = this.$t("panel_editor.panelEdited")
      this.$notify({
        type: "success",
        message: message
      })
    },
    savePanelError() {
      let message
      if (this.creating)
        message = this.$t("panel_editor.errorCreatingPanel")
      else
        message = this.$t("panel_editor.errorEditingPanel")
      this.$notify({
        type: "danger",
        message: message
      })
    },
    dismissExample() {
      this.$store.commit("panel/SET_USER_SETTINGS", {
        name: "example_create_panel",
        value: false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-progress-bar__inner {
  background-color: $secondary !important
}
.el-progress-bar__outer {
  background-color: $black !important
}
.panel-top-bar {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  margin-bottom: 1rem;
  .left {
    flex: 1 1 auto;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start
  }
  .right {
    flex: 1 1 auto;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
  }
  > .stats-progress {
    align-self: center
  }
  > .el-date-editor {
    align-self: center;
    flex-basis: 250px
  }
}
.panel-layout {
  .vue-grid-item {
    &:hover {
      .remove-widget, .edit-widget, .drag-widget {
        display: block
      }
      /deep/ .vue-resizable-handle {
        display: block
      }
    }
    .remove-widget, .edit-widget, .drag-widget {
      position: absolute;
      top: 0.2rem;
      right: 0;
      width: 1.3rem;
      height: 1.3rem;
      padding: 0;
      margin: 0;
      min-width: 1rem;
      min-height: 1rem;
      display: none;
      z-index: 5
    }

    .edit-widget {
      right: 2rem;
    }

    .drag-widget {
      right: 4rem;
      top: 0.4rem;
      color: $white
    }

    /deep/ .vue-resizable-handle {
      display:none;
      background: url("/img/resize.png");
      width: 24px;
      height: 24px;
    }
  }
}
.random-data-disclaimer {
  margin: 1rem 0;
  padding: .5rem 1rem;
  text-align: center;
  h4 {
    margin: 0;
    padding: 0;
    font-weight: bold;
  }
}
</style>
