<template>
  <div class="animated fadeIn">
    <div id="FacebookAds">
      <add-button
        :loading="authorizing"
        :title="$t('facebook_ads.authorize_new_profile')"
        class="mb-4"
        @click.native="authorizeNewProfile(scope)"
      />
      <profiles-table
        :profiles="profiles"
        @loadProfileBusinesses="loadProfileBusinesses($event)"
        @deleteProfile="deleteProfile($event)"
      />

      <accounts-table
        v-if="haveProfiles"
        :accounts="accounts"
        @deleteAccount="deleteAccount($event)"
      />

      <!-- Deleting Modal Profile -->
      <facebook-ads-delete-modal
        id="delModal"
        ref="delModal"
        :account="profileDelete"
        :loading="loadingBtn"
        modal-type="profile"
        title="Confirmar remoção"
        @remove="remove($event)"
        @clearAccountDelete="clearProfileDelete($event)"
      />

      <!-- Deleting Modal Account -->
      <account-delete-modal
        id="facebook-delete-modal"
        ref="delAccountModal"
        :account="accountDelete"
        :loading="loadingBtn"
        modal-type="account"
        title="Confirmar remoção de conta"
        @remove="removeAccount($event)"
        @clearAccountDelete="clearAccountDelete($event)"
      />
    </div>
  </div>
</template>

<script>
import { openOAuthDialog } from "@/utils/o-auth"
import OAuthCallbackMixin from "@/components/shared/mixins/OAuthCallbackMixin"
import { success, error } from "@/constants/notifications"

import AccountDeleteModal from "@/components/modals/AccountDeleteModal"
import FacebookAdsDeleteModal from "@/facebook_ads/components/deleteModal"
import ProfilesTable from "@/facebook_ads/components//ProfilesTable"
import AccountsTable from "@/facebook_ads/components//AccountsTable"

export default {
  name: "FacebookAds",
  components: {
    AccountDeleteModal,
    FacebookAdsDeleteModal,
    ProfilesTable,
    AccountsTable
  },
  mixins: [
    OAuthCallbackMixin
  ],
  data() {
    return {
      authorizing: false,
      scope: ["ads_read", "ads_management", "business_management"],
      profileDelete: {},
      profileLoad: {},
      loadingBtn: false,
      accountDelete: {}
    }
  },
  computed: {
    
    profiles() {
      return this.$store.getters["facebookAds/getProfiles"]
    },
    accounts() {
      return this.$store.getters["facebookAds/getAccounts"]
    },
    haveProfiles() {
      return this.profiles && this.profiles.length
    }
  },
  created() {
    this.$store.dispatch("facebookAds/fetchProfiles").catch(() => {
      this.$notify(error.getProfiles)
    })
    this.$store.dispatch("facebookAds/fetchAccounts").catch(() => {
      this.$notify(error.fetchAccounts)
    })
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
          openOAuthDialog(url)
          this.authorizing = false
        })
    },
    async remove({ id }) {
      this.loadingBtn = true
      try {
        await this.$store.dispatch("facebookAds/deleteProfile", id)
        this.$refs.delModal.hide()
        this.$notify(success.deleteProfile)
      } catch (err) {
        this.$notify(error.deleteProfile)
      } finally {
        this.loadingBtn = false
      }
    },
    removeAccount({ account_id, profile_id }) {
      //get id from table
      this.loadingBtn = true
      this.$store
        .dispatch("facebookAds/deleteAccount", { account_id, profile_id })
        .then(() => {
          this.$notify(success.deleteAccount)
          this.$refs.delAccountModal.hide()
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
