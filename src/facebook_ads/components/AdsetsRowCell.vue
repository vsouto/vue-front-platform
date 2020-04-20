<template>
  <el-tooltip
    :content="$t('facebook_ads.see_adsets')"
    class="item"
    effect="dark"
    placement="top-start"
  >
    <base-button
      class="btn-link"
      type="info"
      icon
      round
      @click.native="openAdsets()"
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
    },
    parentCampaign: {
      type: Object,
      default: () => {}
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
    adsetIds() {
      return this.row.facebook_ads_assets && this.row.facebook_ads_assets.map(p => {
        let adset_ids = []
        for (const id in p)
          if (p[id].adset_ids)
            for (const adset_id of p[id].adset_ids)
              adset_ids.push(adset_id)
        return adset_ids
      })
    }
  },
  methods: {
    openAdsets() {
      this.$router.push({
        name: "FacebookAdsAdsets",
        params: {
          profileIds: this.profileIds,
          accountId: this.row.account_id,
          campaignId: this.parentCampaign && this.parentCampaign.id,
          parentCampaign: this.parentCampaign,
          adsetIds: this.adsetIds,
          adsets: this.row.adsets
        }
      })
    }
  }
}
</script>
