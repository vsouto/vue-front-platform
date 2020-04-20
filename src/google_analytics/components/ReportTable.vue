<template>
  <card card-body-classes="table-full-width">
    <view-table-header
      :element="$el"
      :can-search="canSearch"
      :search-query="searchQuery"
      title="Relatório"
      @update-search-query="searchQuery=$event"
    />
    <loading v-if="!isReady" />
    <el-table
      v-else
      :data="queriedData"
    >
      <!-- table columns -->
      <el-table-column
        key="name"
        :label="$t('google_analytics.active_page')"
        min-width="100"
        prop="name"
      >
        <template slot-scope="scope">
          <div
            class="item-white cursor-pointer"
            @click="loadDetails(scope.row.name)"
          >
            {{ scope.row.name }}
          </div>
        </template>
      </el-table-column>

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
// Mixins
import TableMixin from "@/components/shared/mixins/TableMixin"
import FormattersMixin from "@/components/shared/mixins/FormattersMixin"

export default {
  name: "ReportTable",
  mixins: [TableMixin, FormattersMixin],
  props: {
    report: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      propsToSearch: ["name", "active_users"],
      tableColumns: [
        {
          prop: "active_users",
          label: this.$t("google_analytics.active_users"),
          minWidth: 100,
          sortable: true
        }
      ]
    }
  },
  computed: {
    computedTableData() {
      return this.domains
    },
    domains() {
      let reportDomains = {
        ...this.report.data
      }
      let keys = Object.keys(reportDomains)
      let domainsArray = []
      domainsArray = keys.map(key => {
        let domainItems = reportDomains[key]
        let activeUsers = 0
        domainItems.map(domain => {
          activeUsers += Number(domain[7])
        })
        return { name: domainItems[0][5], active_users: activeUsers }
      })
      return domainsArray
    },
    activeUsers() {
      return this.report.active_users
    },
    isReady() {
      return this.$store.getters["isReady"]("googleAnalytics/report")
    }
  },
  methods: {
    loadDetails(domain) {
      this.$emit("load-details", domain)
    }
  }
}
</script>
