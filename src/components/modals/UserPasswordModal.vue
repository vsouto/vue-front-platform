<template>
  <b-modal
    id="user-password-modal"
    ref="UserPasswordModalRef"
    v-model="showModal"
    title=""
    hide-footer
    content-class="user-password-modal-content"
    dialog-class="user-password-modal-dialog"
    @hidden="showModal=false"
  >
    <div class="content">
      <div class="container">
        <form @submit.prevent="onSubmit">
          <div class="card card-login">
            <div class="card-header">
              <h3 class="card-title">
                {{ $t("common.password_change") }}
              </h3>
            </div>
            <div class="card-body">
              <div
                class="form-group has-icon"
                data-vv-id="2"
                aria-required="true"
                aria-invalid="false"
              >
                <h5>
                  {{ $t("common.password_change_please") }}
                </h5>
                <div class="mb-0 input-group">
                  <span class="input-group-prepend">
                    <div class="input-group-text"><i
                      class="tim-icons icon-lock-circle"
                    />
                    </div>
                  </span>
                  <b-form-input
                    v-model.trim="password"
                    :class="{ 'input-error': $v.password.$error }"
                    aria-describedby="addon-right addon-left"
                    name="password"
                    type="password"
                    placeholder="Password"
                    class="form-control modal-password-input"
                    required
                    @blur="$v.password.$touch()"
                  />
                  <div
                    v-if="$v.password.$invalid"
                    class="invalid-password-feedback"
                  >
                    <p v-if="!$v.password.minLength">
                      {{ $t("common.password_length") }}
                    </p>
                    <p v-if="!$v.password.passwordComplexity">
                      {{ $t("common.password_rules") }}
                    </p>
                  </div>
                </div>
              </div>
            </div><!---->
            <div class="card-footer">
              <div>
                <button
                  :disabled="$v.password.$error"
                  class="btn mb-3 btn-block btn-primary btn-lg"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </b-modal>
</template>

<script>

import Vue from "vue"
import { required, minLength } from "vuelidate/lib/validators"
import Vuelidate from "vuelidate"
import passwordComplexity from "../../utils/custom_validators/passwordComplexity"

Vue.use(Vuelidate)

export default {
  name: "UserPasswordModal",
  props: {
    loading: {
      type: Boolean
    },
  },
  data() {
    return {
      showModal: false,
      password: null
    }
  },
  validations: {
    password: {
      required,
      minLength: minLength(6),
      passwordComplexity
    },
  },
  methods: {
    onSubmit() {

      if (!this.password) {
        this.$notify({
          type: "danger",
          message: "Please set a valid password"
        })
        return false
      }

      this.save()
    },
    showWithDelay() {
      setTimeout( this.show, 1500)
    },
    show() {
      this.showModal = true
    },
    hide() {
      this.showModal = false
    },
    save() {

      this.$store.dispatch("account/changePassword", this.password)
        .then(() => {
          this.$notify({
            type: "success",
            message: "Senha alterada!"
          })

          this.hide()
        })
    },
    help() {
      if (typeof Huggy !== "undefined")
        window.Huggy.openChat()

      return false
    }
  }
}
</script>

<style>
  .user-password-modal-dialog{
    transform: translateY(10%) !important;
  }

  .modal-content{
    background-color: #212c3c !important;
  }

  .user-password-modal-content{
    background-color: transparent;
  }
  .close {
    z-index: 999;
  }

  .invalid-password-feedback{
    width: 100%;
    margin-top: .25rem;
    font-size: 80%;
    color: #dc3545 !important;
  }

  .input-error{
    border-color: red !important;
  }

  .card-title{
    /*color:white !important;*/
    /*margin-bottom: 4em !important*/
  }

  .input-group-text{
    color: white !important;
    padding: 0 !important;
  }

  .form-control{
    color: white !important
  }

  .modal-password-input {
    border-color: rgb(209, 197, 197) !important
  }

  .modal-content .modal-body p {
    color: white;
    font-size: 1em;
    margin: 6px;
  }

  .close {
    opacity: 1 !important;
  }
  .close :hover{
    background-color: #0c0a0a52;
  }
</style>
