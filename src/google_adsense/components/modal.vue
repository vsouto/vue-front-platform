<template>
  <b-modal
    id="google-adsense-modal"
    ref="delModalRef"
    v-model="showModal"
    title="Confirmar remoção de conta"
    hide-footer
    no-close-on-backdrop
    no-close-on-esc
    @hidden="hide($event)"
  >
    <b-form @submit.prevent="$emit('submit')">
      <div class="form-row">
        <h3 class="text-black">
          {{ accountName }}
        </h3>
        <base-alert
          type="danger"
        >
          <div class="text-white">
            <alert-icon class="icon-15x" />
            <strong> Atenção! </strong> <br>
            <p class="text-white">
              A conta será também <strong>removida</strong> de todos os painéis.
            </p>
            <p class="text-white ml-3">
              Caso não haja mais contas de investimento no painel após a remoção da conta, o painel será <strong>removido</strong>.
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
        Sim, quero remover
      </base-button>
    </b-form>
  </b-modal>
</template>
<script>
// Icons
import AlertIcon from "icons/Alert.vue"
import { BaseAlert } from "@/components/lib"

export default {
  name: "GoogleAdsenseModal",
  components: {
    AlertIcon,
    BaseAlert
  },
  props: {
    accountName: {
      type: String,
      default: ""
    },
    loading: {
      type: Boolean
    }
  },
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    show() {
      this.showModal = true
    },
    hide() {
      this.showModal = false
      this.$emit("clearAccountDelete")
    }
  }
}
</script>
