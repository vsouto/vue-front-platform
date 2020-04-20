<template>
  <div class="animated fadeIn">
    <div id="Hotmart">
      <loading v-show="isLoading || !fetched" />
      <div class="col-12">
        <b-card
          v-if="fetched"
          no-body
          header="Afiliações"
          header-tag="h5"
        >
          <affiliations-table :affiliations="affiliations" />
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import AffiliationsTable from "@/hotmart/components//AffiliationsTable"
import { error } from "@/constants/notifications"

export default {
  name: "HotmartAffiliations",
  components: {
    AffiliationsTable
  },
  computed: {
    
    affiliations() {
      return this.$store.getters["hotmart/affiliations"]
    },
    fetched() {
      return !!this.$store.getters["hotmart/affiliations_fetched_id"]
    }
  },

  created() {
    if (this.$route.params.id != this.$store.getters["hotmart/affiliations_fetched_id"]) {
      this.$store
        .dispatch("hotmart/fetchAffiliations", this.$route.params.id)
        .catch(() => {
          this.$notify(error.fetchAccounts)
        })
    }
  }
}
</script>
