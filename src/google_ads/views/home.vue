<template>
  <div class="animated fadeIn">
    <div id="GoogleAds">
      <add-button
        :loading="authorizing"
        :title="$t('google_ads.authorize_new_profile')"
        class="mb-4 gads-step-1"
        @click.native="authorizeNewProfile(scope)"
      />

      <profiles-table
        v-loading="!profilesReady"
        :profiles="profiles"
        @deleteProfile="deleteProfile($event)"
        @loadCustomers="loadCustomers($event)"
      />

      <accounts-table
        v-if="haveProfiles"
        v-loading="!accountsReady"
        :accounts="accounts"
        @deleteAccount="deleteAccount($event)"
      />

      <account-delete-modal
        ref="delProfileModal"
        :account="profileDelete"
        :loading="loadingBtn"
        modal-type="profile"
        title="Confirmar remoção"
        @remove="removeProfile($event)"
        @clearAccountDelete="clearProfileDelete($event)"
      />

      <account-delete-modal
        ref="delAccountModal"
        :account="accountDelete"
        :loading="loadingBtn"
        modal-type="account"
        title="Confirmar remoção de conta"
        @remove="removeAccount($event)"
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
import { success, error } from "@/constants/notifications"
import TourMixin from "@/components/shared/mixins/TourMixin"

import AccountDeleteModal from "@/components/modals/AccountDeleteModal"
import ProfilesTable from "@/google_ads/components/ProfilesTable"
import AccountsTable from "@/google_ads/components/AccountsTable"
import GOOGLE_ADS from "@/google_ads"

export default {
  name: "GoogleAds",
  components: {
    AccountDeleteModal,
    ProfilesTable,
    AccountsTable
  },
  mixins: [
    OAuthCallbackMixin,
    TourMixin
  ],
  data() {
    this.platform = GOOGLE_ADS
    return {
      tourName: "googleAdsAuth",
      authorizing: false,
      scope: "adwords",
      profileDelete: {},
      accountDelete: {},
      loadingBtn: false,
      steps: [
        {
          target:".gads-step-1",
          content:"<b>Autorize acesso à sua conta.</b><br>Você pode permitir acesso a quantas contas quiser!"
        }
      ],
    }
  },
  computed: {
    profilesReady() {
      return this.$store.getters["isReady"]("googleAds/profiles")
    },
    profiles() {
      return this.$store.getters["googleAds/getProfiles"]
    },
    accountsReady() {
      return this.$store.getters["isReady"]("googleAds/accounts")
    },
    accounts() {
      return this.$store.getters["googleAds/getAccounts"]
    },
    haveProfiles() {
      return this.profiles && this.profiles.length
    }
  },
  methods: {
    deleteProfile(profile) {
      if (profile && profile.id) {
        this.profileDelete = profile
        this.$refs.delProfileModal.show()
      }
    },
    deleteAccount(account) {
      if (account && account.id) {
        this.accountDelete = account
        this.$refs.delAccountModal.show()
      }
    },
    authorizeNewProfile(scope) {
      this.authorizing = true
      this.$store.dispatch("googleAds/authorizeProfile", {
        scope: scope
      })
        .then((url) => {
          openOAuthDialog(url)
          this.authorizing = false
        })
    },
    async removeProfile({ id }) {
      this.loadingBtn = true
      try {
        await this.$store.dispatch("googleAds/deleteProfile", id)
        this.$refs.delProfileModal.hide()
        this.$notify(success.deleteProfile)
        this.$store.commit("googleAds/DEL_PROFILE", id)
      } catch (err) {
        this.$notify(error.deleteProfile)
      } finally {
        this.loadingBtn = false
      }
    },
    async removeAccount({ id }) {
      this.loadingBtn = true
      this.$store
        .dispatch("googleAds/deleteAccount", id)
        .then(() => {
          this.$notify(success.deleteAccount)
          this.$refs.delAccountModal.hide()
          this.$store.commit("googleAds/DEL_ACCOUNT", id)
        })
        .catch(() => {
          this.$notify(error.deleteAccount)
        })
        .then(() => {
          this.loadingBtn = false
        })
    },
    clearProfileDelete() {
      this.profileDelete = {}
    },
    clearAccountDelete() {
      this.accountDelete = {}
    },
    loadCustomers(profile) {
      this.$router.push({
        name: "GoogleAdsLoadCustomers",
        params: {
          profileId: profile.id
        }
      })
    },
  }
}
</script>
