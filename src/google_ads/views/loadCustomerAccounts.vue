<template>
  <div class="animated fadeIn">
    <div id="GoogleAdsLoadCustomerAccounts">
      <customer-accounts-table
        :profile-id="profileId"
        :customer-id="customerId"
        :added-accounts="addedAccounts"
        :accounts="accounts"
        @change="selectedAccounts = $event"
      />
      <add-button
        v-if="haveChanges"
        :title="$t('google_ads.integrate_selected_ad_accounts')"
        :loading="loadingBtn"
        @click.native="addNewAccounts(selectedAccounts)"
      />
    </div>
  </div>
</template>

<script>
import CustomerAccountsTable from "@/google_ads/components/CustomerAccountsTable"
import { success, error } from "@/constants/notifications"

export default {
  name: "GoogleAdsLoadCustomerAccounts",
  components: {
    CustomerAccountsTable
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    customerId: {
      type: String,
      required: true
    }
  },
  data() {
    this.actionName = "googleAds/fetchProfileCustomerAccounts"
    return {
      loadingBtn: false,
      accounts: [],
      selectedAccounts: []
    }
  },
  computed: {
    haveChanges() {
      for (const acc of this.selectedAccounts) {
        if (this.addedAccounts.findIndex(o => o.id === acc.id) == -1)
          return true
      }
      return false
    },
    isLoading() {
      return this.$store.getters["isFetching"](this.actionName)
    },
    addedAccounts() {
      return this.$store.getters["googleAds/getAccounts"]
    }
  },
  beforeDestroy() {
    clearInterval(this.polling)
    this.polling = null
  },
  created() {
    if (!this.customerId || !this.profileId) {
      this.$router.push({ name: "GoogleAds" })
    } else {
      this.loadCustomerAccounts()
    }
  },
  methods: {
    addNewAccounts(selectedAccounts) {
      this.loadingBtn = true
      this.$store
        .dispatch("googleAds/addAccounts", {
          profileId: this.profileId,
          customerId: this.customerId,
          accounts: selectedAccounts
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
          this.$router.push({ name: "GoogleAds" })
        })
    },
    loadCustomerAccounts() {
      this.$store
        .dispatch(this.actionName, {
          id: this.profileId,
          customerId: this.customerId
        })
        .then((accounts) => {
          this.accounts = accounts
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
