<template>
  <div
    :class="{
      'is-editing': isEditing
    }"
    :gutter="10"
    class="animated fadeIn panel-row"
  >
    <slot v-on="$listeners" />
    <delete-button
      v-if="isEditing"
      class="btn-del-container"
      size="sm"
      @click.native="deleteRow()"
    />
    <add-button
      v-if="isEditing"
      :disabled="spaceLeft <= 0"
      :tooltip="spaceLeft <= 0 ? 'Sem espaço neste container' : null"
      class="btn-add-widget"
      round
      size="sm"
      title="Widget"
      type="info"
      @click.native="$emit('selectWidgetToAdd', $event, rowIndex)"
    />
  </div>
</template>

<script>
import { Row } from "@/models/panel"
import swal from "sweetalert2"
export default {
  props: {
    isEditing: {
      type: Boolean,
      default: false
    },
    row: {
      type: Row,
      required: true
    },
    rowIndex: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      span: 24
    }
  },
  computed: {
    spaceLeft() {
      let span = this.span
      this.row.columns.map(column => {
        span -= column.widget.span.xl
      })
      return span
    }
  },
  methods: {
    deleteRow() {
      const _rowIndex = this.rowIndex
      swal({
        title: "Tem certeza?",
        html: "Todas as widgets deste container também serão removidas.",
        showCancelButton: true,
        confirmButtonText: this.$t("common.confirm"),
        confirmButtonClass: "btn btn-primary btn-fill",
        cancelButtonText: this.$t("common.cancel"),
        cancelButtonClass: "btn btn-secondary btn-simple btn-fill",
        buttonsStyling: false
      }).then(res => {
        if (res.value) {
          this.$emit("removeRowByIndex", _rowIndex)
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
// .panel-row {
//   display: flex;
//   flex-flow: row wrap;
//   justify-content: flex-start;
//   align-items: stretch
// }

.panel-row.is-editing {
  padding: 3em 0 2em;
  margin: 1em 0 2em;
  border: 0.1em dashed #2b3553;
  position: relative
}

.panel-row.is-editing::before {
  content: "container";
  position: absolute;
  top: -0.8em;
  left: 1rem;
  width: 5rem;
}

.btn-del-container {
  position: absolute !important;
  top: -1.3rem;
  left: 13rem;
}

.btn-add-widget {
  position: absolute !important;
  top: -1.3rem;
  left: 6rem;
  width: 6rem;
}
</style>