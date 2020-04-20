<template>
  <b-modal
    id="google-analytics-modal"
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
export default {
  name: "GoogleAnalyticsModal",
  props: {
    accountName: {
      type: String,
      default: ""
    },
    loading: {
      type: Boolean
    },
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
      this.$emit("clear-delete")
    }
  }
}
</script>
