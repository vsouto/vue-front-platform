<template>
  <div class="animated fadeIn">
    <div id="GoogleAnalytics">
      <div class="col-12 huhu">
        <add-button
          class="mb-4"
          title="Autorizar nova conta"
          @click.native="authorizeNewAccount(scope)"
        />
      </div>

      <b-card no-body>
        <profiles-table
          :profiles="profiles"
          @load-accounts="loadAccounts($event)"
          @delete-profile="deleteProfile($event)"
        />
      </b-card>

      <b-card no-body>
        <active-views-table
          :active-views="activeViews"
          @delete-view="deleteView($event)"
          @load-report="loadReport($event)"
        />
      </b-card>
    </div>

    <!-- Deleting Modals -->
    <google-analytics-modal
      ref="analyticsRemoveView"
      :account-name="viewDelete.name"
      :loading="loadingBtn"
      @submit="removeView(viewDelete.id)"
      @clear-delete="clearViewDelete($event)"
    />
    <google-analytics-modal
      ref="analyticsRemoveProfile"
      :account-name="profileDelete.name"
      :loading="loadingBtn"
      @submit="removeProfile(profileDelete.id)"
      @clear-delete="clearProfileDelete($event)"
    />
  </div>
</template>

<script>
import OAuthCallbackMixin from "@/components/shared/mixins/OAuthCallbackMixin"
import ProfilesTable from "@/google_analytics/components/ProfilesTable"
import ActiveViewsTable from "@/google_analytics/components/ActiveViewsTable"
import GoogleAnalyticsModal from "@/google_analytics/components/modal"
import { success, error } from "@/constants/notifications"

export default {
  name: "GoogleAnalytics",
  components: {
    ProfilesTable,
    ActiveViewsTable,
    GoogleAnalyticsModal
  },
  mixins: [
    OAuthCallbackMixin
  ],
  data() {
    return {
      scope: "analytics.readonly",
      viewDelete: {},
      loadingBtn: false,
      profileDelete: {}
    }
  },
  computed: {
    
    profiles() {
      return this.$store.getters["googleAnalytics/profiles"]
    },
    activeViews() {
      return this.$store.getters["googleAnalytics/active_views"]
    },
  },
  watch: {
    viewDelete(view) {
      if (view && view.id) this.$refs.analyticsRemoveView.show()
    },
    profileDelete(profile) {
      if (profile && profile.id) this.$refs.analyticsRemoveProfile.show()
    }
  },
  created() {
    this.$store.dispatch("googleAnalytics/fetchProfiles").catch(() => {
      this.$notify(error.fetchProfiles)
    })
    this.$store.dispatch("googleAnalytics/fetchActiveViews").catch(() => {
      this.$notify(error.fetchViews)
    })
  },
  methods: {
    authorizeNewAccount(scope) {
      this.$store.dispatch("googleAnalytics/authorizeAccount", {
        token: this.$store.getters["account/token"],
        scope: scope
      })
    },
    loadAccounts(profile) {
      this.$router.push({
        name: "GoogleAnalyticsAccounts",
        params: { profile_id: profile.id }
      })
      this.$store.commit("googleAnalytics/setProfile", profile)
    },
    async removeView(id) {
      this.loadingBtn = true
      try {
        await this.$store
          .dispatch("googleAnalytics/deleteActiveView", id)
          .then(() => {
            this.$notify(success.deleteView)
          })
          .catch(() => {
            this.$notify(error.deleteView)
          })
        this.$refs.analyticsRemoveView.hide()
      } catch (err) {
        this.$notify(error.deleteProfile)
      } finally {
        this.loadingBtn = false
      }
    },
    async removeProfile(id) {
      this.loadingBtn = true
      try {
        await this.$store
          .dispatch("googleAnalytics/deleteProfile", id)
          .then(() => {
            this.$notify(success.deleteProfile)
          })
          .catch(() => {
            this.$notify(error.deleteViewyy)
          })
        this.$refs.analyticsRemoveProfile.hide()
      } catch (err) {
        this.$notify(error.deleteProfile)
      } finally {
        this.loadingBtn = false
      }
    },
    clearViewDelete() {
      this.viewDelete = {}
    },
    clearProfileDelete() {
      this.profileDelete = {}
    },
    deleteView(view) {
      this.viewDelete = view
    },
    deleteProfile(profile) {
      this.profileDelete = profile
    },
    loadReport(view) {
      this.$router.push({
        name: "GoogleAnalyticsReport",
        params: { view_id: view.id }
      })
    }
  }
}
</script>
