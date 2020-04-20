<template>
  <div body-classes="p-2">
    <view-table-header
      :element="$el"
      :title="$t('facebook_ads.creatives')"
      :can-search="canSearch"
      :search-query="searchQuery"
      @update-search-query="updateSearchQuery"
    />
    <!-- <platforms-filters
      :background-color.sync="sidebarBackground"
      :platform="platform"
      current-view-prefix="CR"
      current-view-name="Criativos"
      @filter="fetch"
    /> -->
    <loading v-if="!isFetched" />
    <div class="creatives-container">
      <card
        v-for="creative in tableData"
        :key="creative.id"
        @click.native="showCreative(creative)"
      >
        <img
          slot="image"
          class="card-img-top"
          :src="creative.thumbnail_url"
        >
        <h4 class="card-title">
          {{ creative.title || creative.name }}
        </h4>
        <p class="card-text">
          {{ creative.body || creative.object_story_spec && creative.object_story_spec.link_data && creative.object_story_spec.link_data.message }}
        </p>
      </card>
    </div>
    <view-table-footer
      :can-paginate="isReady && tableData && tableData.length > pagination.perPage"
      :searched-data="searchedData"
      :total="total"
      :pagination="pagination"
      :from="from"
      :to="to"
    />
    <sweet-modal
      ref="modalCreative"
      overlay-theme="dark"
      modal-theme="dark"
    >
      <card>
        <img
          slot="image"
          class="card-img-top"
          :src="currentCreative.image_url || currentCreative.thumbnail_url"
        >
        <h4 class="card-title">
          {{ currentCreative.title || currentCreative.name }}
        </h4>
        <p class="card-text">
          {{ currentCreative.body || currentCreative.object_story_spec && currentCreative.object_story_spec.link_data && currentCreative.object_story_spec.link_data.message }}
        </p>
        <a
          :href="currentCreative.instagram_permalink_url || 'https://fb.com/'+currentCreative.effective_object_story_id"
          target="_blank"
          class="btn btn-primary"
        >
          ver anúncio
        </a>
      </card>
    </sweet-modal>
  </div>
</template>
<script>
// Mixins
import TableMixin from "@/components/shared/mixins/TableMixin"
import FormattersMixin from "@/components/shared/mixins/FormattersMixin"
import FacebookAdsMixin from "@/components/shared/mixins/FacebookAdsMixin"
import FacebookAdsViewsMixin from "@/components/shared/mixins/FacebookAdsViewsMixin"

import { SweetModal } from "sweet-modal-vue"

export default {
  components: {
    SweetModal
  },
  mixins: [TableMixin, FormattersMixin, FacebookAdsMixin, FacebookAdsViewsMixin],
  props: {
    accountId: {
      type: String,
      default: null
    },
    creativeIds: {
      default: null,
      validator: prop => typeof prop === "string" || prop === null
    },
    creatives: {
      type: Array,
      default: () => []
    }
  },
  data() {
    this.assetsAction = "facebookAds/fetchCreatives"
    this.actionPayload = {
      account_id: this.accountId,
      creative_ids: this.creativeIds
    }
    return {
      currentCreative: {}
    }
  },
  methods: {
    filterNotify() {
      return
    },
    showCreative(creative) {
      this.currentCreative = creative
      this.$refs.modalCreative.open()
    }
  }
}
</script>

<style scoped lang="scss">
.creatives-container {
  display: flex;
  flex-flow: row wrap;
  .card {
    flex: 0 1 15rem;
    margin: .5rem;
    &:hover {
      background: #303133;
      cursor: pointer;
    }
    .card-title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .card-text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin: 0.5rem 0;
    }
  }
}
</style>