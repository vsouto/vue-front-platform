<template>
  <card body-classes="p-2">
    <view-table-header
      :element="$el"
      :title="$t('google_ads.customers')"
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
        key="customerId"
        min-width="100"
        prop="customerId"
        label="id"
      >
        <template slot-scope="scope">
          {{ scope.row.customerId }}
        </template>
      </el-table-column>

      <el-table-column
        key="descriptiveName"
        :label="$t('common.name')"
        min-width="100"
        prop="descriptiveName"
      >
        <template slot-scope="scope">
          {{ scope.row.descriptiveName }}
        </template>
      </el-table-column>

      <el-table-column
        key="currencyCode"
        :label="$t('common.currency')"
        min-width="100"
        prop="currencyCode"
      >
        <template slot-scope="scope">
          {{ scope.row.currencyCode }}
        </template>
      </el-table-column>

      <el-table-column
        key="actions"
        :min-width="isMobile ? 150 : 200"
        :label="$t('google_ads.ad_accounts')"
        prop="actions"
      >
        <template
          slot-scope="scope"
        >
          <div class="list-center vertical-center">
            <el-tooltip
              id="gads-tour-3"
              :content="$t('google_ads.load_accounts')"
              class="item ml-3"
              effect="dark"
              placement="right"
            >
              <base-button
                :icon="isMobile"
                class="mr-2"
                type="primary"
                round
                @click.native="loadCustomerAccounts(profileId, scope.row.customerId)"
              >
                <progress-download-icon :class="{'icon-2x': isMobile, 'icon-15x mr-1': !isMobile }" />
                <span v-if="!isMobile">
                  {{ $t('google_ads.load_accounts') }}
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

import TourMixin from "@/components/shared/mixins/TourMixin"

export default {
  name: "CustomersTable",
  components: {
    ProgressDownloadIcon
  },
  mixins: [
    TableMixin,
    TourMixin
  ],
  props: {
    customers: {
      type: Array,
      required: true
    },
    profileId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      tourName: "customers",
      isMobile: false,
      steps: [
        {
          target: "#gads-tour-3",
          content:"<b>Escolha sua conta de anúncio!</b><br>Você poderá acessar quantas contas quiser ou escolher.",
          params:{
            placement: "bottom",
          }
        }
      ]
    }
  },
  computed: {
    computedTableData() {
      return this.customers
    },
    isReady() {
      return this.$store.getters["isReady"]("googleAds/fetchProfileCustomers")
    },
  },
  mounted() {
    this.isMobile = !!(window.screen.width < 992)
  },
  methods: {
    loadCustomerAccounts(profileId, customerId){
      this.$emit("loadCustomerAccounts", { profileId, customerId })
    }
  }
}
</script>
