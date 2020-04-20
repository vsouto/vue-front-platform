<template>
  <card card-body-classes="table-full-width">
    <view-table-header
      :element="$el"
      :can-search="canSearch"
      :search-query="searchQuery"
      title="Contas"
      @update-search-query="searchQuery=$event"
    />
    <loading v-if="!isReady" />
    <el-table
      v-else
      :data="queriedData"
    >
      <!-- table columns -->
      <el-table-column
        v-for="column in tableColumns"
        :key="column.label"
        :min-width="column.minWidth"
        :prop="column.prop"
        :label="column.label"
        :sortable="column.sortable"
        :formatter="column.formatter"
      />

      <!-- Actions -->
      <el-table-column
        key="actions"
        :min-width="100"
        :label="$t('common.actions')"
        prop="actions"
      >
        <template
          slot-scope="scope"
          class="list-center vertical-center"
        >
          <base-button
            type="primary"
            size="sm"
            @click="loadProperties(scope.row)"
          >
            <progress-download-icon class="icon-2x" />
            Properties
          </base-button>
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
  </card>
</template>

<script>
// Mixins
import TableMixin from "@/components/shared/mixins/TableMixin"
import FormattersMixin from "@/components/shared/mixins/FormattersMixin"

import ProgressDownloadIcon from "icons/ProgressDownload.vue"

export default {
  name: "AccountsTable",
  components: {
    ProgressDownloadIcon
  },
  mixins: [TableMixin, FormattersMixin],
  props: {
    accounts: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      tableColumns: [
        {
          prop: "id",
          label: "id",
          minWidth: 100,
          sortable: true
        },
        {
          prop: "name",
          label: this.$t("common.name"),
          minWidth: 100,
          sortable: true
        }
      ],
      pagination: {
        perPage: 5
      }
    }
  },
  computed: {
    computedTableData() {
      return this.accounts
    },
    isReady() {
      return this.$store.getters["isReady"]("googleAnalytics/getAccounts")
    }
  },
  methods: {
    loadProperties(row){
      this.$emit("load-properties", row)
    }
  }
}
</script>
