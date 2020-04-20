<template>
  <div>
    <add-button
      :loading="loading"
      :title="title"
      @click.native="showModal = !showModal"
    />
    <modal
      id="panel-editor-add-widget"
      ref="panelEditorAddWidget"
      :show.sync="showModal"
      :scroll-to-bottom="false"
      modal-classes="panel-editor-add-widget"
    >
      <div>
        <div
          v-for="widgetType in all_widgets"
          :key="widgetType.id"
          class="widget-type"
        >
          <h3>{{ widgetType.name }}</h3>
          <el-row :gutter="20">
            <el-col
              v-for="widget in widgetType.widgets"
              :key="widget.id"
              :span="8"
            >
              <div class="widget-item">
                <base-switch
                  v-model="widget.enabled"
                  class="mr-3"
                />
                <span>{{ widget.name }}</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import WIDGETS from "@/widgets"
import PanelModel from "@/models/panel"

import { BaseSwitch } from "@/components/lib/index"
import { Modal } from "@/components/lib"

const all_widgets = {}
WIDGETS.map(w => {
  if (all_widgets[w.type] === undefined)
    all_widgets[w.type] = {
      id: w.type,
      name: w.typeName,
      widgets: []
    }
  all_widgets[w.type].widgets.push(w)
})

export default {
  components: {
    BaseSwitch,
    Modal
  },
  props: {
    model: {
      type: PanelModel,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      title: this.$t("panel.add_new_widget"),
      showModal: false,
      all_widgets: all_widgets
    }
  },
  methods: {
    openWidgetModal() {

    }
  },
}
</script>

<style>
.panel-editor-add-widget {
  max-width: 90% !important;
}

.panel-editor-add-widget .modal-body {
  background: #222a42 !important
}

.modal.show .panel-editor-add-widget {
  transform: translate(0, 0%) !important;
}

.panel-editor-add-widget .widget-type {
  margin-bottom: 3em
}
.panel-editor-add-widget .widget-item {
  height: 50px
}
</style>