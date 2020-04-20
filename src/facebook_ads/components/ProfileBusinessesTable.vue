<template>
  <card body-classes="p-2">
    <view-table-header
      :element="$el"
      :title="$t('facebook_ads.business_accounts')"
      :can-search="canSearch"
      :search-query="searchQuery"
      @update-search-query="updateSearchQuery"
    />
    <loading v-if="!isReady" />
    <el-table
      v-else
      :data="queriedData"
    >
      <el-table-column
        key="id"
        min-width="100"
        prop="id"
        label="id"
      >
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>

      <el-table-column
        key="name"
        :label="$t('common.name')"
        min-width="100"
        prop="name"
      >
        <template slot-scope="scope">
          <img
            v-if="scope.row.profile_picture_uri"
            :src="scope.row.profile_picture_uri"
            height="30"
          >
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column
        key="permitted_roles"
        :min-width="250"
        :label="$t('facebook_ads.permitted_roles')"
        prop="permitted_roles"
      >
        <template slot-scope="props">
          <el-tag
            v-for="p of permittedRoles(props.row.permitted_roles)"
            :key="p"
            type="secondary"
          >
            {{ p }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        key="actions"
        :min-width="isMobile ? 150 : 200"
        :label="$t('facebook_ads.ad_accounts')"
        prop="actions"
      >
        <template
          slot-scope="scope"
        >
          <div class="list-center vertical-center">
            <el-tooltip
              :content="$t('facebook_ads.load_ad_accounts')"
              class="item ml-3 facebook-step-3"
              effect="dark"
              placement="right"
            >
              <base-button
                :icon="isMobile"
                class="mr-2"
                type="primary"
                round
                @click.native="loadBusinessAccounts(scope.row.id, scope.row.owned_ad_account_ids)"
              >
                <progress-download-icon :class="{'icon-2x': isMobile, 'icon-15x mr-1': !isMobile }" />
                <span v-if="!isMobile">
                  Carregar contas de anúncio
                </span>
              </base-button>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <view-table-footer
      :can-paginate="isReady && tableData && tableData.length > pagination.perPage"
      :searched-data="searchedData"
      :total="total"
      :pagination="pagination"
      :from="from"
      :to="to"
    />

    <v-tour
      :name="tourName"
      :steps="steps"
      :callbacks="tourCallbacks"
    />
  </card>
</template>

<script>
// Icons
import ProgressDownloadIcon from "icons/ProgressDownload.vue"

// Mixins
import TableMixin from "@/components/shared/mixins/TableMixin"

import { isArray } from "util"



import TourMixin from "@/components/shared/mixins/TourMixin"

export default {
  name: "ProfileBusinessesTable",
  components: {
    ProgressDownloadIcon
  },
  mixins: [
    TableMixin,
    TourMixin
  ],
  props: {
    businesses: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      tourName: "profileBusinesses",
      isMobile: false,
      steps: [
        {
          target:".facebook-step-3",
          content:"Perfeito! Agora é hora de <b>carregar as contas de anúncio</b> de cada gerenciador que você desejar."
        }
      ],
    }
  },
  computed: {
    computedTableData() {
      return this.businesses
    },
    isReady() {
      return this.$store.getters["isReady"]("facebookAds/profileBusinesses")
    },
  },
  mounted() {
    this.isMobile = !!(window.screen.width < 992)
  },
  methods: {
    permittedRoles(row){
      let roles = []
      if (isArray(row))
        for (const role of row)
          !["email", "public_profile"].includes(role) &&
            roles.push(this.$t(`facebook_ads_roles.${role}`))
      return roles.sort()
    },
    loadBusinessAccounts(business_id, account_ids){
      this.$emit("loadBusinessAccounts", { business_id, account_ids })
    }
  }
}
</script>
