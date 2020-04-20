<template>
  <el-tooltip
    :content="$t('facebook_ads.see_campaigns')"
    class="item"
    effect="dark"
    placement="top-start"
  >
    <base-button
      class="btn-link"
      type="info"
      icon
      round
      @click.native="openCampaigns()"
    >
      <eye-icon class="icon-2x" />
    </base-button>
  </el-tooltip>
</template>

<script>
import EyeIcon from "icons/Eye.vue"
export default {
  components: {
    EyeIcon
  },
  props: {
    row: {
      type: Object,
      required: true
    }
  },
  computed: {
    profileIds() {
      return (
        this.row.profile_ids || (this.row.profile_id && [this.row.profile_id]) ||
        this.row.facebook_ads_assets && this.row.facebook_ads_assets.map(p => {
          let profiles = []
          for (const profile in p)
            profiles.push(profile)
          return profiles
        })
      )
    },
    accountIds() {
      return this.row.facebook_ads_assets && this.row.facebook_ads_assets.map(p => {
        let account_ids = []
        for (const id in p)
          if (p[id].account_ids)
            for (const account_id of p[id].account_ids)
              account_ids.push(account_id)
        return account_ids
      }) || this.row.account_id && [this.row.account_id]
    }
  },
  methods: {
    openCampaigns() {
      this.$router.push({
        name: "FacebookAdsCampaigns",
        params: {
          profileIds: this.profileIds,
          accountIds: this.accountIds,
          campaigns: this.row.campaigns
        }
      })
    }
  }
}
</script>
