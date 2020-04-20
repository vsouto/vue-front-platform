<template>
  <card
    body-classes="spend-table facebook-ads pt-0 pb-2"
    header-classes="pt-2"
  >
    <view-table-header
      :element="$el"
      :title="$t('facebook_ads.ad_accounts')"
      :platforms="platformObjectList"
      :can-search="canSearch"
      :search-query="searchQuery"
      :goback="false"
      @update-search-query="updateSearchQuery"
    />
    <loading v-if="!ready" />
    <el-table
      v-else
      :data="queriedData"
      :show-summary="true"
      :summary-method="getSummaries"
    >
      <!-- Account status icon -->
      <el-table-column
        :min-width="30"
        align="left"
        label
      >
        <template slot-scope="scope">
          <facebook-ads-account-status-icon
            :account-status="scope.row.account_status"
            :disable-reason="scope.row.disable_reason"
          />
        </template>
      </el-table-column>

      <!-- Table columns -->
      <el-table-column
        v-for="column in tableColumns"
        :key="column.label"
        :min-width="column.minWidth"
        :prop="column.prop"
        :label="column.label"
        :sortable="column.sortable"
        :formatter="column.formatter"
      />

      <!-- Campaigns -->
      <el-table-column
        :min-width="40"
        :label="$t('facebook_ads.campaigns')"
      >
        <template slot-scope="props">
          {{ props.row.campaigns.length }}
          <campaigns-row-cell :row="props.row" />
        </template>
      </el-table-column>

      <!-- Adsets -->
      <!-- <el-table-column :min-width="40" label="AS">
        <template slot-scope="props">
          <adsets-row-cell :row="props.row" :parent-campaign="props.row"/>
        </template>
      </el-table-column>-->

      <!-- Ads -->
      <!-- <el-table-column :min-width="40" label="A">
        <template slot-scope="props">
          <ads-row-cell :row="props.row" :parent-campaign="props.row"/>
        </template>
      </el-table-column>-->
    </el-table>
    <view-table-footer
      :can-paginate="isReady && tableData && tableData.length > pagination.perPage"
      :searched-data="searchedData"
      :total="total"
      :pagination="pagination"
      :from="from"
      :to="to"
    />
  </card>
</template>
<script>

// Mixins
import TableMixin from "@/components/shared/mixins/TableMixin"
import FormattersMixin from "@/components/shared/mixins/FormattersMixin"


export default {
  name: "WidgetTable",
  mixins: [TableMixin, FormattersMixin],
  props: {
    name: {
      type: String,
      required: true
    },
    perPage: {
      type: Number,
      default: 3
    },
    columns: {
      type: Array,
      required: true
    },
    platforms: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tableName: this.name,
      pagination: {
        perPage: this.perPage
      },
      tableColumns: this.columns
    }
  },
  computed: {
    platformObjectList() {
      return this.platforms.map((p) => {
        return {
          img: p.icon,
          name: p.name
        }
      })
    }
  },
  created() {
    this.$store
      .dispatch("panel/fetchWidget", {
        id: this.$route.params.id,
        name: this.tableName
      })
      .then(res => {
        const accounts = res.data.response
        this.tableData = accounts
        if (accounts) {
          for (const a of accounts) {
            if (a.campaigns) {
              this.$store.commit("facebookAds/SET_CAMPAIGNS", a.campaigns)
            }
          }
        }
      })
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 1) {
          sums[index] = "Total"
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          const summedValue = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          if (column.formatter) {
            sums[index] = column.formatter(data[index], column, summedValue)
          } else {
            sums[index] = summedValue
          }
        } else {
          sums[index] = ""
        }
      })

      return sums
    }
  }
}
</script>
<style>
.pagination-select,
.search-input {
  width: 200px;
}
</style>
