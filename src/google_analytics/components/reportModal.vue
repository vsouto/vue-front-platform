<template>
  <b-modal
    id="google-analytics-report-modal"
    ref="reportModalRef"
    v-model="showModal"
    size="xl"
    hide-footer
    no-close-on-backdrop
    @hidden="showModal=false"
  >
    <card card-body-classes="table-full-width">
      <view-table-header
        :element="$el"
        :can-search="canSearch"
        :search-query="searchQuery"
        :goback="false"
        title="Informações detalhadas sobre o domínio"
      />
      <el-table :data="queriedData">
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
      <base-button
        class="block-right"
        type="success"
        @click="hide($event)"
      >
        fechar
      </base-button>
    </card>
  </b-modal>
</template>

<script>
import TableMixin from "@/components/shared/mixins/TableMixin"
import FormattersMixin from "@/components/shared/mixins/FormattersMixin"

export default {
  name: "GoogleAnalyticsReportModal",
  mixins: [TableMixin, FormattersMixin],
  props: {
    domain: {
      type: String,
      required: true
    },
    report: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showModal: false,
      propsToSearch: ["source", "pagePath", "pageTitle"],
      tableColumns: [
        {
          prop: "referralPath",
          label: this.$t("google_analytics.referralPath"),
          minWidth: 100
        },
        {
          prop: "campaign",
          label: this.$t("google_analytics.campaign"),
          minWidth: 100
        },
        {
          prop: "source",
          label: this.$t("google_analytics.source"),
          minWidth: 100,
          sortable: true
        },
        {
          prop: "medium",
          label: this.$t("google_analytics.medium"),
          minWidth: 100
        },
        {
          prop: "keyword",
          label: this.$t("google_analytics.keyword"),
          minWidth: 100,
          sortable: true
        },
        {
          prop: "pagePath",
          label: this.$t("google_analytics.pagePath"),
          minWidth: 100
        },
        {
          prop: "pageTitle",
          label: this.$t("google_analytics.pageTitle"),
          minWidth: 100
        },
        {
          prop: "activeUsers",
          label: this.$t("google_analytics.active_users"),
          minWidth: 100,
          sortable: true
        }
      ]
    }
  },
  computed: {
    computedTableData() {
      return this.domainsData
    },
    domainsData() {
      if (!this.report.data || !this.domain) {
        return []
      }
      let reportData = this.report.data
      let domainsArray = [...reportData[this.domain]]
      let domainObject = {}

      let domains = domainsArray.map(domain => {
        this.headers.map(header => {
          let index = this.headers.indexOf(header)
          domainObject[header] = domain[index]
        })
        return domainObject
      })
      return domains
    },
    headers() {
      return this.report.headers
        ? this.report.headers.map(
          header => header.split(":")[1]
        )
        : []
    },
  },
  methods: {
    show() {
      this.showModal = true
    },
    hide() {
      this.showModal = false
    }
  }
}
</script>
