<template>
  <card body-classes="p-2">
    <view-table-header
      :element="$el"
      :title="$t('google_ads.profiles')"
      :can-search="canSearch"
      :search-query="searchQuery"
      :goback="false"
      @update-search-query="updateSearchQuery"
    />
    <loading v-if="!isReady" />
    <el-table
      v-else
      :data="queriedData"
    >
      <!-- <el-table-column
        key="status"
        :width="50"
        prop="status"
      >
        <template slot-scope="props">
          <el-tooltip
            v-if="props.row.impediment"
            :content="props.row.impediment_reason"
          >
            <minus-circle-icon :title="props.row.impediment_reason" />
          </el-tooltip>
        </template>
      </el-table-column> -->

      <el-table-column
        key="id"
        prop="id"
        label="ID"
      />

      <el-table-column
        key="name"
        :label="$t('common.name')"
        prop="name"
      />

      <!-- Actions -->
      <el-table-column
        key="actions"
        :min-width="isMobile ? 100 : 150"
        prop="actions"
      >
        <template slot-scope="scope">
          <div class="list-center vertical-center">
            <el-tooltip
              v-if="!scope.row.impediment"
              :content="$t('google_ads.load_mcc')"
              class="item"
              effect="dark"
              placement="top-start"
            >
              <base-button
                :icon="isMobile"
                class="mr-2 gads-step-2"
                type="primary"
                round
                @click.native="$emit('loadCustomers', scope.row)"
              >
                <progress-download-icon :class="{'icon-2x': isMobile, 'icon-15x mr-1': !isMobile }" />
                <span v-if="!isMobile">
                  {{ $t('google_ads.load_mcc') }}
                </span>
              </base-button>
            </el-tooltip>
            <base-button
              v-else
              class="mr-2"
              type="warning"
              round
              link
              disabled
            >
              Sem acesso, necessário autorizar novamente.
            </base-button>
            <delete-button @click.native="deleteProfile(scope.row)" />
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
// import MinusCircleIcon from "icons/MinusCircle.vue"

// Mixins
import TableMixin from "@/components/shared/mixins/TableMixin"

import { isArray } from "util"

import TourMixin from "@/components/shared/mixins/TourMixin"

export default {
  name: "ProfilesTable",
  components: {
    ProgressDownloadIcon,
    // MinusCircleIcon
  },
  mixins: [
    TableMixin,
    TourMixin
  ],
  props: {
    profiles: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      tourName: "googleAdsProfiles",
      pagination: {
        perPage: 5
      },
      isMobile: false,
      steps: [
        {
          target:".gads-step-2",
          content:"<b>Carregue suas contas de anúncio</b><br>Clique no botão acima para carregar suas contas de anúncio do Google Ads.",
        }
      ],
    }
  },
  computed: {
    computedTableData() {
      return this.profiles
    },
    isReady() {
      return this.$store.getters["isReady"]("googleAds/profiles")
    }
  },
  mounted() {
    this.isMobile = !!(window.screen.width < 992)
  },
  methods: {
    deleteProfile(row) {
      this.$emit("deleteProfile", row)
    },
    allowedPermissions(row) {
      let permissions = []
      if (isArray(row))
        for (const permission of row)
          !["email", "public_profile"].includes(permission) &&
            permissions.push(this.$t(`google_ads.${permission}`))
      return permissions.sort()
    }
  }
}
</script>
