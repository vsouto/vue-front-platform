<template>
  <b-modal
    :id="id"
    v-model="showModal"
    :title="title"
    hide-footer
    no-close-on-backdrop
    no-close-on-esc
    @hidden="hide($event)"
  >
    <b-form @submit.prevent="remove(account)">
      <div class="form-row">
        <h3 class="account-name mt-0 mb-3">
          {{ account.name }}
        </h3>
        <base-alert
          v-if="modalType == 'account'"
          type="info"
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
        <base-alert
          v-if="modalType == 'profile'"
          type="info"
        >
          <div class="text-white">
            <alert-icon class="icon-15x" />
            <strong> Atenção! </strong> <br>
            <p class="text-white">
              Todas as contas integradas que este perfil tem acesso também serão <strong>removidas</strong>
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
// Icons
import AlertIcon from "icons/Alert.vue"
import { BaseAlert } from "@/components/lib"

export default {
  name: "FacebookAdsDeleteModal",
  components: {
    AlertIcon,
    BaseAlert
  },
  props: {
    id: {
      type: String,
      default: "facebook-delete-modal"
    },
    modalType: {
      type: String,
      default: "account"
    },
    title: {
      type: String,
      required: true
    },
    account: {
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
    remove(account) {
      this.$emit("remove", account)
    },
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

<style lang="scss">
#facebook-delete-modal {
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
