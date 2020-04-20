<template>
  <div
    class="panel-column"
  >
    <slot name="left" />
    <slot>
      <div
        v-if="!isEmpty"
        :class="{
          'card-dragging': isDragging,
        }"
      >
        <keep-alive>
          <component
            :is="widget.component"
            v-if="isStatsReady && widget.component && widget.isEnabled(enabledPlatforms)"
            :ref="widget.id"
            :key="widget.id"
            :child-component="widget.childComponent"
            :widget-stats="widgetStats"
            :widget="widget"
            :is-editing="isCreating"
            :percent-ready="percentReady"
          />
        </keep-alive>
        <refresh-button
          v-if="isEditing"
          class="refresh-widget"
          size="sm"
          @click.native="refreshStats(widget)"
        />
        <delete-button
          v-if="isEditing"
          class="del-widget"
          size="sm"
          icon="close"
          @click.native="deleteColumn()"
        />
      </div>
      <div
        v-else
        :class="{
          'card-placeholder': canDrop
        }"
        class="card-widget empty-widget"
      >
        <div class="placeholder" />
      </div>
    </slot>
    <slot name="right" />
  </div>
</template>

<script>
import WidgetStatsModel from "@/models/widgetStats"
import { Column } from "@/models/panel"
import swal from "sweetalert2"
export default {
  props: {
    isEditing: {
      type: Boolean,
      default: false
    },
    isDragging: {
      type: Boolean,
      default: false
    },
    canDrop: {
      type: Boolean,
      default: false
    },
    column: {
      type: Column,
      required: true
    },
    colIndex: {
      type: Number,
      required: true
    },
    rowIndex: {
      type: Number,
      required: true
    },
    enabledPlatforms: {
      type: Array,
      default: () => []
    },
    widgetStats: {
      type: WidgetStatsModel,
      default: () => null
    },
    percentReady: {
      type: Number,
      default: 0
    }
  },
  computed: {
    isStatsReady() {
      return this.widgetStats instanceof WidgetStatsModel
    },
    widget() {
      return this.column.widget
    },
    isEmpty() {
      return this.widget && !this.widget.id
    },
    span() {
      return this.widget.span
    }
  },
  methods: {
    deleteColumn() {
      const _rowIndex = this.rowIndex,
        _colIndex = this.colIndex
      swal({
        title: "Tem certeza?",
        html: "",
        showCancelButton: true,
        confirmButtonText: this.$t("common.confirm"),
        confirmButtonClass: "btn btn-primary btn-fill",
        cancelButtonText: this.$t("common.cancel"),
        cancelButtonClass: "btn btn-secondary btn-simple btn-fill",
        buttonsStyling: false
      }).then(res => {
        if (res.value) {
          this.$emit("removeRowByIndex", _rowIndex)
          this.$emit("removeColumnByIndex", _rowIndex, _colIndex)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-column {
  /*flex: 1 1 auto;*/
  position: relative;
  padding: 0;
  margin: 0;
}
.panel-column:hover /deep/ .del-widget, .panel-column:hover /deep/ .refresh-widget {
  visibility: visible !important
}
.card {
  position: relative;
  z-index: 0;
  padding: 0;
  margin: 0
}
.drag-widget {
  background: red;
  width: 100px;
  height: 100px
}
.del-widget {
  visibility: hidden;
  position: absolute!important;
  top: -1em;
  right: 0em;
  margin: 0;
  padding: 0;
  height: auto !important;
  width: auto !important;
}
.refresh-widget {
  visibility: hidden;
  position: absolute!important;
  top: -1em;
  right: 2em;
  margin: 0;
  padding: 0;
  height: auto !important;
  width: auto !important;
}
.empty-widget {
  opacity: 0.5
}
</style>