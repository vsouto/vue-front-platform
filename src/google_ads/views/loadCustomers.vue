<template>
  <div class="animated fadeIn">
    <div id="GoogleAdsLoadCustomers">
      <customers-table
        :profile-id="profileId"
        :customers="customers"
        @loadCustomerAccounts="loadCustomerAccounts($event)"
      />
    </div>
  </div>
</template>

<script>
import CustomersTable from "@/google_ads/components/CustomersTable"

export default {
  name: "GoogleAdsLoadBusinesses",
  components: {
    CustomersTable
  },
  props: {
    profileId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      customers: []
    }
  },
  created() {
    this.$store.dispatch("googleAds/fetchProfileCustomers", {id: this.profileId})
      .then(customers => {
        this.customers = customers
      })
  },
  methods: {
    loadCustomerAccounts({profileId, customerId}) {
      this.$router.push({
        name: "GoogleAdsLoadCustomerAccounts",
        params: {
          profileId: profileId,
          customerId: customerId
        }
      })
    }
  }
}
</script>
