<template>
  <card>
    <view-table-header
      :element="$el"
      :can-search="canSearch"
      :search-query="searchQuery"
      title="Affiliations"
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
  name: "AffiliationsTable",
  mixins: [TableMixin],
  props: {
    affiliations: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      propsToSearch: ["affiliation_id", "product"],
      tableColumns: [
        {
          prop: "affiliation_id",
          label: "id",
          minWidth: 100,
          sortable: true
        },
        {
          prop: "product",
          label: this.$t("hotmart.product"),
          minWidth: 100,
          sortable: true
        },
        {
          prop: "hotlinks",
          label: "hotlinks",
          minWidth: 100,
          sortable: true,
          formatter: this.hotlinksFormatter
        },
        {
          prop: "old_hotlinks",
          label: this.$t("hotmart.old_hotlinks"),
          minWidth: 100,
          sortable: true,
          formatter: this.hotlinksFormatter
        }
      ]
    }
  },
  computed: {
    computedTableData() {
      return this.affiliations || []
    }
  },
  methods:{
    hotlinksFormatter(row, column, cellValue) {
      return cellValue.alternative_pages.length
    }
  }
}
</script>
