<template>
  <div class="animated fadeIn">
    <div id="FacebookAdsLoadBusinesses">
      <profile-businesses-table
        :businesses="businesses"
        @loadBusinessAccounts="loadBusinessAccounts($event)"
      />
    </div>
  </div>
</template>

<script>
import ProfileBusinessesTable from "@/facebook_ads/components/ProfileBusinessesTable"
import { error } from "@/constants/notifications"

export default {
  name: "FacebookAdsLoadBusinesses",
  components: {
    ProfileBusinessesTable
  },
  props: {
    profileId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      businesses: []
    }
  },
  computed: {
    profile() {
      return this.$store.getters["facebookAds/getProfileById"](this.profileId)
    },
    profileBusinesses() {
      return this.$store.getters["facebookAds/getProfileBusinessesById"](this.profileId)
    }
  },
  created() {
    if (!this.profile)
      this.$router.push({ name: "FacebookAds" })
    if (this.profileBusinesses && this.profileBusinesses.length)
      this.businesses = this.profileBusinesses
    else
      this.$store
        .dispatch("facebookAds/fetchProfileBusinesses", this.profile)
        .then(res => {
          this.businesses = res.data.response
        })
        .catch(() => {
          this.$notify(error.fetchProfileBusinesses)
        })
  },
  methods: {
    loadBusinessAccounts({ business_id }) {
      this.$router.push({
        name: "FacebookAdsLoadAccounts",
        params: {
          profileId: this.profileId,
          businessId: business_id
        }
      })
    }
  }
}
</script>
