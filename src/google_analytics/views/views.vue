
<template>
  <div class="animated fadeIn">
    <div id="GoogleAnalyticsViews">
      <b-card no-body>
        <views-table
          :views="views"
          :active-views="activeViews"
        />
      </b-card>
      <add-button
        v-if="selectedViews.length > 0"
        :loading="loadingBtn"
        :title="$t('common.integrate_selected_ad_accounts')"
        @click.native="addNewViews(selectedViews)"
      />
    </div>
  </div>
</template>

<script>
import ViewsTable from "@/google_analytics/components/ViewsTable"
import { success, error } from "@/constants/notifications"

export default {
  name: "GoogleAnalyticsViews",
  components: {
    ViewsTable
  },
  data() {
    return {
      loadingBtn: false
    }
  },
  computed: {
    views() {
      return this.$store.getters["googleAnalytics/views"]
    },
    activeViews() {
      return this.$store.getters["googleAnalytics/active_views"]
    },
    selectedViews() {
      return this.$store.getters["googleAnalytics/selected_views"]
    }
  },
  watch: {
    $route: {
      handler(route) {
        if(!this.$store.state.googleAnalytics.profile){
          return this.$router.push({name: "GoogleAnalytics"})
        }
        const { property_id } = route.params
        if (property_id !== this.$store.state.googleAnalytics.propertyId) {
          const {
            token,
            refresh_token
          } = this.$store.state.googleAnalytics.profile
          this.$store.commit("googleAnalytics/setPropertyId", property_id)
          this.$store.commit("SET_UNFETCHED", "googleAnalytics/views", { root: true })
          this.$store
            .dispatch("googleAnalytics/fetchViews", {
              id: this.$store.state.googleAnalytics.account.id,
              property_id: this.$store.state.googleAnalytics.web_property.id,
              token,
              refresh_token
            })
            .catch(() => {
              this.$notify(error.fetchViews)
            })
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    addNewViews(views) {
      this.loadingBtn = true
      const {
        profile,
        account,
        web_property
      } = this.$store.state.googleAnalytics

      let viewsExtended = views.map(view => {
        return {
          ...view,
          account_id: account.id,
          account_name: account.name,
          web_property_id: web_property.id,
          web_property_website_url: web_property.website_url,
          web_property_name: web_property.name,
          web_property_industry_vertical: web_property.industry_vertical,
          web_property_level: web_property.level,
          web_property_data_retention_ttl: web_property.data_retention_ttl,
          web_property_permissions: web_property.permissions
        }
      })

      let viewData = {
        credential_id: profile.id,
        view_data: viewsExtended
      }
      this.$store
        .dispatch("googleAnalytics/addActiveViews", viewData)
        .then(() => {
          this.$notify(success.addView)
        })
        .catch(() => {
          this.$notify(error.addView)
        })
        .then(() => {
          this.$store.commit("googleAnalytics/clearSelectedViews")
          this.loadingBtn = false
          this.$router.go(-1)
        })
    }
  }
}
</script>
