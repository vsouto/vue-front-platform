<template>
  <b-modal
    :id="id"
    ref="selectPlatformModal"
    v-model="showModal"
    :title="title"
    hide-footer
    no-close-on-esc
    content-class="select-platform-modal-content"
    dialog-class="select-platform-modal-dialog"
    @hidden="showModal=false"
  >
    <div class="card card-user">
      <div class="card-body">
        <p class="card-text" />
        <div class="author">
          <div class="block block-one" />
          <div class="block block-two" />
          <div class="block block-three" />
          <div class="block block-four" />
          <a href="javascript:void(0)">
            <img
              src="img/platforms/monitor-flat-painel.png"
              class="select-platform-board"
            >
            <h5 class="title">Selecione uma plataforma para integrar</h5>
          </a>
        </div>
      </div>
      <div class="card-footer">
        <div class="button-container">
          <button
            type="button"
            class="btn btn-facebook btn-round btn-icon btn-fab btn-default btn-lg"
          >
            <i class="fab fa-facebook fa-2x" />
          </button>
          <button
            type="button"
            class="btn btn-twitter btn-round btn-icon btn-fab btn-default btn-lg"
          >
            <i class="fab fa-twitter fa-2x" />
          </button>
          <button
            type="button"
            class="btn btn-google btn-round btn-icon btn-fab btn-default btn-lg"
          >
            <i class="fab fa-google-plus fa-2x" />
          </button>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>

export default {
  name: "SelectPlatformModal",
  props: {
    id: {
      type: String,
      default: "account-delete-modal"
    },
    title: {
      type: String,
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
#select-platform-modal {
  .modal-content {
    background-color: #212529 !important;
    .modal-title {
      color: $danger;
      font-size: 1.5em
    }
  }
  .account-name {
    margin: 0 auto;
  }
}

.select-platform-modal-dialog{
  transform: translateY(10%) !important;
}

.select-platform-modal-content{
  background-color: transparent;
}
.close {
  z-index: 999;
}

  .select-platform-board{
    max-width: 70%
  }

</style>
