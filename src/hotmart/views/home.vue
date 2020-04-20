<template>
  <div class="animated fadeIn">
    <div id="hot-mart">
      <add-button
        id="hotmart-step-1"
        :loading="authorizing"
        :title="$t('hotmart.authorize_new_account')"
        class="mb-4"
        @click.native="authorizeNewAccount()"
      />
      <accounts-table
        v-loading="!accountsReady"
        :accounts="accounts"
        @deleteAccount="deleteAccount($event)"
      />

      <!-- Deleting Modal -->
      <account-delete-modal
        id="account-delete-modal"
        ref="delModalRef"
        :account="accountDelete"
        :loading="loadingBtn"
        title="Confirmar remoção de conta"
        @remove="remove($event)"
        @clearAccountDelete="clearAccountDelete($event)"
      />
    </div>
    <v-tour
      :name="tourName"
      :steps="steps"
      :callbacks="tourCallbacks"
    />
  </div>
</template>

<script>
import { openOAuthDialog } from "@/utils/o-auth"
import OAuthCallbackMixin from "@/components/shared/mixins/OAuthCallbackMixin"
import TableMixin from "@/components/shared/mixins/TableMixin"
import TourMixin from "@/components/shared/mixins/TourMixin"
import { success, error } from "@/constants/notifications"
import AccountDeleteModal from "@/components/modals/AccountDeleteModal"
import AccountsTable from "@/hotmart/components/AccountsTable"
import HOTMART from "@/hotmart"

export default {
  name: "Hotmart",
  components: {
    AccountDeleteModal,
    AccountsTable
  },
  mixins: [
    TableMixin,
    OAuthCallbackMixin,
    TourMixin
  ],
  data() {
    this.platform = HOTMART
    return {
      tourName: "hotmart",
      authorizing: false,
      accountDelete: {},
      loadingBtn: false,
      propsToSearch: ["name", "id", "email"],
      steps: [
        {
          target:"#hotmart-step-1",
          content:"<b>Autorize acesso à sua conta</b><br>Integrar sua conta de Hotmart é muito simples! Basta clicar em <b>AUTORIZAR NOVA CONTA</b> e autorizar a integração!"
        },
      ]
    }
  },
  computed: {
    accountsReady() {
      return this.$store.getters["isFetched"]("hotmart/accounts")
    },
    accounts() {
      return this.$store.getters["hotmart/getAccounts"]
    }
  },
  created() {
    this.$store.dispatch("hotmart/fetchAccounts")
  },
  methods: {
    deleteAccount(account) {
      if (account && account.id) {
        this.accountDelete = account
        this.$refs.delModalRef.show()
      }
    },
    setAccountToDelete(account) {
      this.accountDelete = account
    },
    authorizeNewAccount() {
      this.authorizing = true
      this.$store.dispatch("hotmart/authorizeAccount", )
        .then((url) => {
          openOAuthDialog(url)
          this.authorizing = false
        })
    },
    async remove({ id }) {
      this.loadingBtn = true
      try {
        await this.$store
          .dispatch("hotmart/deleteAccount", id)
          .then(() => {
            this.$notify(success.deleteAccount)
          })
          .catch(() => {
            this.$notify(error.deleteAccount)
          })

        this.$refs.delModalRef.hide()
      } catch (err) {
        // console.log("Failed to delete account, error: ", err)
      } finally {
        this.loadingBtn = false
      }
    },
    formatterProducts(row, column, cellValue) {
      return cellValue && cellValue.length || "-"
    },
    clearAccountDelete() {
      this.accountDelete = {}
    }
  }
}
</script>
