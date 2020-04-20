<template>
  <div>
    <generic-button
      :is-expanded="isExpanded"
      :tooltip="$t('common.delete')"
      :link="confirm"
      :icon="icon"
      :btn-class="btnClass"
      :small-button="true"
    />
    <!-- Deleting Modal -->
    <panel-list-modal
      id="panel-list-modal"
      ref="delPanelsModal"
      :panel="panelDelete"
      :loading="loadingBtn"
      title="Confirmar remoção do painel"
      @remove="remove($event)"
    />
  </div>
</template>

<script>
import GenericButton from "@/components/shared/GenericButton"
import TrashCanOutline from "icons/TrashCanOutline"
import PanelListModal from "@/components/modals/PanelListModal"
import { success, error } from "@/constants/notifications"

export default {
  components: {
    GenericButton,
    PanelListModal
  },
  props: {
    isExpanded: {
      type: Boolean,
      default: true
    },
    panel: {
      type: Object,
      required: true
    },
  },
  data() {
    this.btnClass = "btn-pinterest"
    this.icon = TrashCanOutline
    this.loadingBtn = false
    return {
      panelDelete: {}
    }
  },
  mounted() {
    this.panelDelete = this.panel
  },
  methods: {
    confirm() {
      this.$refs.delPanelsModal.show()
    },
    remove(id) {
      this.loadingBtn = true
      this.$store
        .dispatch("panel/deletePanel", id)
        .then(() => {
          this.$notify(success.deletePanel)
        })
        .catch(() => {
          this.$notify(error.deletePanel)
        })
        .then(() => {
          this.$refs.delPanelsModal.hide()
          this.loadingBtn = false
        })
    }
  }
}

</script>
