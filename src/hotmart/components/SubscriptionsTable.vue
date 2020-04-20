<template>
  <card>
    <view-table-header
      :element="$el"
      :can-search="canSearch"
      :search-query="searchQuery"
      title="Subscriptions"
      @update-search-query="updateSearchQuery"
    />
    <el-table
      :data="queriedData"
      :indent="0"
      :empty-text="$t('common.found_nothing')"
      style="width: 100%"
    >
      <el-table-column
        v-for="column in tableColumns"
        :key="column.label"
        :min-width="column.minWidth"
        :prop="column.prop"
        :label="column.label"
        :sortable="column.sortable"
        :formatter="column.formatter"
      />
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
import TableMixin from "@/components/shared/mixins/TableMixin"

export default {
  name: "SubscriptionsTable",
  mixins: [TableMixin],
  props: {
    subscriptions: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      propsToSearch: ["subscription_id", "subscriber"],
      tableColumns: [
        {
          prop: "subscription_id",
          label: "id",
          minWidth: 60,
          sortable: true
        },
        {
          prop: "product",
          label: this.$t("hotmart.products"),
          minWidth: 100,
          sortable: true,
          formatter: this.productFormatter
        },
        {
          prop: "plan_name",
          label: this.$t("hotmart.plan_name"),
          minWidth: 100
        },
        {
          prop: "subscriber",
          label: this.$t("hotmart.subscriber"),
          minWidth: 100,
          sortable: true,
          formatter: this.subscriberFormatter
        },
        {
          prop: "price_value",
          label: this.$t("hotmart.price"),
          minWidth: 60,
          sortable: true
        },
        {
          prop: "price_currency_code",
          label: this.$t("hotmart.price_currency_code"),
          minWidth: 100
        },
        {
          prop: "trial_period",
          label: this.$t("hotmart.trial_period"),
          minWidth: 100,
          sortable: true
        },
        {
          prop: "accession_date",
          label: this.$t("hotmart.accession_date"),
          minWidth: 100
        },
        {
          prop: "end_accession_date",
          label: this.$t("hotmart.end_accession_date"),
          minWidth: 100
        }
      ]
    }
  },
  computed: {
    computedTableData() {
      return this.subscriptions || []
    }
  },
  methods: {
    productFormatter(row, column, cellValue) {
      return cellValue.name
    },
    subscriberFormatter(row, column, cellValue) {
      return cellValue.name
    }
  }
}
</script>
