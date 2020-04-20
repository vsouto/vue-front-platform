<template>
  <div class="animated fadeIn">
    <div id="FacebookAdsLoadAccounts">
      <profile-accounts-table
        :business-accounts="businessAccounts"
        :accounts="accounts"
        :business-id="businessId"
      />
      <add-button
        v-if="haveChanges"
        :title="$t('facebook_ads.integrate_selected_ad_accounts')"
        :loading="loadingBtn"
        @click.native="addNewAccounts(selectedAccounts)"
      />
    </div>
  </div>
</template>

<script>
import ProfileAccountsTable from "@/facebook_ads/components//ProfileAccountsTable"
import { success, error } from "@/constants/notifications"

export default {
  name: "FacebookAdsLoadAccounts",
  components: {
    ProfileAccountsTable
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    businessId: {
      type: String,
      required: true
    },
    accountIds: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loadingBtn: false,
      polling: null,
      tries: 0
    }
  },
  computed: {
    selectedAccounts() {
      return this.$store.state.facebookAds.selected_accounts
    },
    selectedAccountsLength() {
      let _len = 0
      for (const acc of this.selectedAccounts) {
        if (this.accounts.findIndex(o => o.id === acc.id) == -1)
          _len += 1
      }
      return _len
    },
    haveChanges() {
      for (const acc of this.selectedAccounts) {
        if (this.accounts.findIndex(o => o.id === acc.id) == -1)
          return true
      }
      return false
    },
    businessAccounts() {
      return this.$store.getters["facebookAds/getProfileBusinessAccountsById"](
        this.profileId,
        this.businessId
      )
    },
    profile() {
      return this.$store.getters["facebookAds/getProfileById"](this.profileId)
    },
    accounts() {
      return this.$store.getters["facebookAds/getAccounts"]
    },
  },
  beforeDestroy() {
    clearInterval(this.polling)
    this.polling = null
  },
  created() {
    if (!this.profile || !this.profile.id) {
      this.$router.push({ name: "FacebookAds" })
    } else {
      this.loadAccounts()
    }
  },
  methods: {
    addNewAccounts(accounts) {
      this.loadingBtn = true
      this.$store
        .dispatch("facebookAds/addAccounts", {
          profile_id: this.profile.id,
          accounts: accounts
        })
        .then((res) => {
          if (res)
            this.$notify(success.addAccounts)
        })
        .catch(() => {
          this.$notify(error.addAccounts)
        })
        .then(() => {
          this.loadingBtn = false
          this.$router.push({ name: "FacebookAds" })
        })
    },
    loadAccounts() {
      this.tries += 1
      if (this.tries >= 10)
        return
      this.$store
        .dispatch("facebookAds/fetchBusinessAccounts", {
          id: this.profileId,
          business_id: this.businessId
        })
        .then(() => {
          // ! TODO: fetch business account service polling
          // if (res) {
          //   if (res.status == 202 && this.polling == null)
          //     this.polling = setInterval(() => {
          //       this.loadAccounts()
          //     }, 5000)
          //   if (res.status == 200) {
          //     clearInterval(this.polling)
          //     this.polling = null
          //   }
          // } else {
          //   clearInterval(this.polling)
          //   this.polling = null
          // }
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error)
          this.$notify(error.fetchAccounts)
        })
    }
  }
}
</script>
