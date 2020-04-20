<template>
  <b-modal
    :id="id"
    v-model="showModal"
    :title="title"
    hide-footer
    no-close-on-backdrop
    no-close-on-esc
    @hidden="showModal=false"
  >
    <b-form @submit.prevent="remove(panel.id)">
      <div class="form-row">
        <h3 class="text-white">
          {{ panel.name }}
        </h3>
        <base-alert
          type="info"
        >
          <div class="text-white">
            <alert-icon class="icon-15x" />
            <strong> Atenção! </strong> <br>
            <p class="text-white">
              Todas as <strong>métricas</strong> e histórico de métricas existentes deste painel serão também removidas.
            </p>
          </div>
        </base-alert>
      </div>
      <base-button
        :loading="loading"
        class="w-100"
        native-type="submit"
        type="danger"
      >
        <i
          class="fa fa-close"
          aria-hidden="true"
        />
        {{ buttonText }}
      </base-button>
    </b-form>
  </b-modal>
</template>

<script>
import { BaseAlert } from "@/components/lib"

export default {
  name: "PanelListModal",
  components: {
    BaseAlert
  },
  props: {
    id: {
      type: String,
      default: "panel-list-modal"
    },
    title: {
      type: String,
      required: true
    },
    panel: {
      type: Object,
      required: true
    },
    buttonText: {
      type: String,
      default: "Sim, quero remover"
    },
    loading: {
      type: Boolean,
      required: true
    },
  },
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    remove(id) {
      this.$emit("remove", id)
    },
    show() {
      this.showModal = true
    },
    hide() {
      this.showModal = false
    }
  }
}
</script>

<style lang="scss">
#panel-list-modal {
  .modal-content {
    background: linear-gradient(#222a42,#1d253b) !important;
    .modal-title {
      color: white;
      font-size: 1.5em
    }
  }
  .account-name {
    margin: 0 auto;
  }
}
</style>
