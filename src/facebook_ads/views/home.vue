<template>
  <div class="animated fadeIn">
    <div id="FacebookAds">
      <add-button
        :loading="authorizing"
        :title="$t('facebook_ads.authorize_new_profile')"
        class="mb-4 facebook-step-1"
        @click.native="authorizeNewProfile(scope)"
      />

      <profiles-table
        v-loading="!profilesReady"
        :profiles="profiles"
        @loadProfileBusinesses="loadProfileBusinesses($event)"
        @deleteProfile="deleteProfile($event)"
      />

      <accounts-table
        v-if="haveProfiles"
        v-loading="!accountsReady"
        :accounts="accounts"
        @deleteAccount="deleteAccount($event)"
      />

      <!-- Deleting Modal Profile -->
      <facebook-ads-delete-modal
        ref="delModal"
        :account="profileDelete"
        :loading="loadingBtn"
        modal-type="profile"
        title="Confirmar remoção"
        @remove="removeProfile($event)"
        @clearAccountDelete="clearProfileDelete($event)"
      />

      <!-- Deleting Modal Account -->
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
import OAuthCallbackMixin from "@/components/shared/mixins/OAuthCallbackMixin"
import TourMixin from "@/components/shared/mixins/TourMixin"
import { success, error } from "@/constants/notifications"

import AccountDeleteModal from "@/components/modals/AccountDeleteModal"
import FacebookAdsDeleteModal from "@/facebook_ads/components/deleteModal"
import ProfilesTable from "@/facebook_ads/components/ProfilesTable"
import AccountsTable from "@/facebook_ads/components/AccountsTable"
import FACEBOOK_ADS from "@/facebook_ads"

export default {
  name: "FacebookAds",
  components: {
    AccountDeleteModal,
    FacebookAdsDeleteModal,
    ProfilesTable,
    AccountsTable
  },
  mixins: [
    OAuthCallbackMixin,
    TourMixin
  ],
  data() {
    this.platform = FACEBOOK_ADS
    this.steps = [
      {
        target:".facebook-step-1",
        content:"<b>Autorize acesso ao seu perfil.</b><br>Você pode autorizar quantos perfis quiser!"
      }
    ]
    this.tourName = "facebookAuth"
    this.scope = "ads_read,ads_management,business_management"
    return {
      authorizing: false,
      profileDelete: {},
      profileLoad: {},
      loadingBtn: false,
      accountDelete: {}
    }
  },
  computed: {
    profilesReady() {
      return this.$store.getters["isReady"]("facebookAds/profiles")
    },
    profiles() {
      return this.$store.getters["facebookAds/getProfiles"]
    },
    accountsReady() {
      return this.$store.getters["isReady"]("facebookAds/accounts")
    },
    accounts() {
      return this.$store.getters["facebookAds/getAccounts"]
    },
    haveProfiles() {
      return this.profiles && this.profiles.length
    }
  },
  methods: {
    deleteProfile(profile) {
      if (profile && profile.id) {
        this.profileDelete = profile
        this.$refs.delModal.show()
      }
    },
    deleteAccount(account) {
      if (account && account.id) {
        this.accountDelete = account
        this.$refs.delAccountModal.show()
      }
    },
    loadProfileBusinesses(profile) {
      this.$router.push({
        name: "FacebookAdsLoadBusinesses",
        params: {
          profileId: profile.id
        }
      })
    },
    authorizeNewProfile(scope) {
      this.authorizing = true
      this.$store.dispatch("facebookAds/authorizeProfile", {
        scope: scope
      })
        .then((url) => {
          this.openOAuth(url)
          this.authorizing = false
        })
    },
    async removeProfile({ id }) {
      this.loadingBtn = true
      try {
        await this.$store.dispatch("facebookAds/deleteProfile", id)
        this.$refs.delModal.hide()
        this.$notify(success.deleteProfile)
        this.$store.commit("facebookAds/DEL_PROFILE", id)
      } catch (err) {
        this.$notify(error.deleteProfile)
      } finally {
        this.loadingBtn = false
      }
    },
    async removeAccount({ id, profile_id }) {
      this.loadingBtn = true
      this.$store
        .dispatch("facebookAds/deleteAccount", { id, profile_id })
        .then(() => {
          this.$notify(success.deleteAccount)
          this.$refs.delAccountModal.hide()
          this.$store.commit("facebookAds/DEL_ACCOUNT", id)
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
    }
  }
}
</script>

