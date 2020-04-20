<template>
  <div class="animated fadeIn">
    <div id="Monetizze">
      <add-button
        :loading="authorizing"
        :title="$t('monetizze.authorize_new_account')"
        class="mb-4 monetizze-step-1"
        @click.native="openModal()"
      />

      <accounts-table
        v-loading="!accountsReady"
        :accounts="accounts"
        :table-fields-products="tableFieldsProducts"
        @set-account-to-delete="setAccountToDelete($event)"
        @deleteAccount="deleteAccount($event)"
      />
    </div>

    <!-- Deleting Modal -->
    <account-delete-modal
      id="account-delete-modal"
      ref="MonetizzeDelModalRef"
      :account="accountDelete"
      :loading="loadingBtn"
      modal-type="profile"
      title="Confirmar remoção de conta"
      @remove="remove($event)"
      @clearAccountDelete="clearAccountDelete($event)"
    />
    <!-- Add account Modal -->
    <sweet-modal
      ref="modal"
      overlay-theme="dark"
      modal-theme="dark"
    >
      <card class="mb-4">
        <h3>{{ $t('monetizze.authorize_new_account') }}</h3>
        <base-input
          v-model="form.api_key"
          v-validate="formValidations.api_key"
          :error="getError('api_key')"
          label="Chave da API"
          name="api_key"
          placeholder="Consumer key"
        />
        <add-button
          :loading="loadingBtn"
          title="Adicionar nova conta"
          @click.native="submit"
        />
      </card>
      <base-button
        slot="button"
        round
        simple
        type="success"
        @click.native="$refs.modal.close()"
      >
        Fechar
      </base-button>
    </sweet-modal>
    <!-- Tour -->
    <v-tour
      :name="tourName"
      :steps="steps"
      :callbacks="tourCallbacks"
    />
  </div>
</template>

<script>
import AccountDeleteModal from "@/components/modals/AccountDeleteModal"
import AccountsTable from "@/monetizze/components/AccountsTable"
import AccountModel from "@/monetizze/models/account"
import TourMixin from "@/components/shared/mixins/TourMixin"

import { SweetModal } from "sweet-modal-vue"
import { success, error } from "@/constants/notifications"

export default {
  name: "Monetizze",
  components: {
    SweetModal,
    AccountDeleteModal,
    AccountsTable,
  },
  mixins: [
    TourMixin
  ],
  data() {
    this.formValidations = {
      api_key: {
        required: true,
        min: 32
      }
    }
    this.tableFieldsProducts = [
      {
        key: "picture",
        label: "Imagem",
        class: "text-center"
      },
      {
        key: "name",
        label: "Nome"
      }
    ]
    this.steps = [
      {
        target:".monetizze-step-1",
        content:"<b>Vamos fazer a integração dos seus produtos?</b><br>Integrar a Monetizze é simples. O primeiro passo é você<br><a href='https://app.monetizze.com.br/ferramentas/api' target='_blank'> <blue><u>Criar uma Chave de API na Monetizze</u></blue></a>",
        params:{
          placement: "right",
        }
      },
      {
        target:".monetizze-step-1",
        content:"Clique em <b>Autorizar nova conta</b> no botão ao lado e insira a chave de API que você acabou de gerar na Monetizze",
        params:{
          placement: "right",
        }
      },
    ]
    this.tourName = "monetizze"
    return {
      accountDelete: {},
      loadingBtn: false,
      form: new AccountModel(),
      authorizing: false
    }
  },
  computed: {
    accountsReady() {
      return this.$store.getters["isReady"]("monetizze/accounts")
    },
    accounts() {
      return this.$store.getters["monetizze/getAccounts"]
    }
  },
  methods: {
    deleteAccount(account) {
      if (account && account.id) {
        this.accountDelete = account
        this.$refs.MonetizzeDelModalRef.show()
      }
    },
    openModal() {
      if (this.$tours["monetizze"].currentStep == "-1")
        this.$refs.modal.open()
    },
    setAccountToDelete(account) {
      this.accountDelete = account
    },
    remove({ id }) {
      this.loadingBtn = true
      this.$store
        .dispatch("monetizze/deleteAccount", id)
        .then(() => {
          this.$notify(success.deleteAccount)
          this.$refs.MonetizzeDelModalRef.hide()
        })
        .catch((error) => {
          this.$notify(error.deleteAccount)
        })
        .then(() => {
          this.loadingBtn = false
        })
    },
    clearForm() {
      this.form = new AccountModel()
      this.loadingBtn = false
    },
    submit() {
      this.$validator.validate().then(valid => {
        if (valid)
          this.newAccount()
      })
    },
    async newAccount() {
      this.loadingBtn = this.authorizing = true
      this.$store
        .dispatch(
          "monetizze/newAccount",
          this.form.api_key
        )
        .then(res => {

          this.loadingBtn = this.authorizing = false
          this.$refs.modal.close()
          this.clearForm()

          if (!res || res === false)
            this.$notify(error.addAccount)
        })
    },
    clearAccountDelete() {
      this.accountDelete = {}
    },
    getError(fieldName) {
      return this.errors.first(fieldName)
    },
  }
}
</script>

<style lang="scss" scoped>
.add-account {
  width: 20rem;
}
</style>
