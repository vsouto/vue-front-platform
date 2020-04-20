<template>
  <div class="animated fadeIn">
    <div id="Adsense">
      <add-button
        :loading="authorizing"
        :title="$t('common.authorize_new_account')"
        class="mb-4 adsense-step-1"
        @click.native="authorizeNewAccount(scope)"
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
import AccountDeleteModal from "@/components/modals/AccountDeleteModal"
import AccountsTable from "@/google_adsense/components//AccountsTable"
import { success, error } from "@/constants/notifications"
import TourMixin from "@/components/shared/mixins/TourMixin"
import GOOGLE_ADSENSE from "@/google_adsense"

export default {
  name: "GoogleAdsense",
  components: {
    AccountDeleteModal,
    AccountsTable
  },
  mixins: [
    OAuthCallbackMixin,
    TourMixin
  ],
  data() {
    this.platform = GOOGLE_ADSENSE
    this.steps = [
      {
        target:".adsense-step-1",
        content:"<b>Autorize acesso à sua conta</b><br>Integrar sua conta Adsense é muito simples, basta clicar em <b>AUTORIZAR NOVA CONTA</b> e autorizar a integração!"
      },
    ]
    this.tourName = "googleAdsense"
    this.scope = "adsense.readonly"
    return {
      accountDelete: {},
      loadingBtn: false,
      authorizing: false
    }
  },
  computed: {
    accountsReady() {
      return this.$store.getters["isReady"]("googleAdsense/accounts")
    },
    accounts() {
      return this.$store.getters["googleAdsense/getAccounts"]
    },
  },
  methods: {
    deleteAccount(account) {
      if (account && account.id) {
        this.accountDelete = account
        this.$refs.delModalRef.show()
      }
    },
    authorizeNewAccount(scope) {

      this.authorizing = true
      this.$store.dispatch("googleAdsense/authorizeAccount", {
        scope: scope
      })
        .then((url) => {
          openOAuthDialog(url)
          this.authorizing = false
        })
    },
    async remove({ id }) {
      this.loadingBtn = true
      try {
        await this.$store.dispatch("googleAdsense/deleteAccount", id)
        this.$refs.delModalRef.hide()
        this.$notify(success.deleteAccount)
      } catch (err) {
        this.$notify(error.deleteAccount)
      } finally {
        this.loadingBtn = false
      }
    },
    clearAccountDelete() {
      this.accountDelete = {}
    }
  }
}
</script>
