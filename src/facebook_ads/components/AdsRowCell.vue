<template>
  <el-tooltip
    :content="$t('facebook_ads.see_ads')"
    class="item"
    effect="dark"
    placement="top-start"
  >
    <base-button
      class="btn-link"
      type="info"
      icon
      round
      @click.native="openAds()"
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
    parentAdset: {
      type: Object,
      default: () => {}
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
    adIds() {
      return this.row.facebook_ads_assets && this.row.facebook_ads_assets.map(p => {
        let ad_ids = []
        for (const id in p)
          if (p[id].ad_ids)
            for (const ad_id of p[id].ad_ids)
              ad_ids.push(ad_id)
        return ad_ids
      })
    }
  },
  methods: {
    openAds() {
      this.$router.push({
        name: "FacebookAdsAds",
        params: {
          profileIds: this.profileIds,
          accountId: this.row.account_id,
          campaignId: this.parentCampaign && this.parentCampaign.id,
          adsetId: this.parentAdset && this.parentAdset.id,
          parentAdset: this.parentAdset,
          parentCampaign: this.parentCampaign,
          adIds: this.adIds,
          ads: this.row.ads
        }
      })
    }
  }
}
</script>
