<template>
  <card card-body-classes="table-full-width">
    <view-table-header
      :element="$el"
      :title="$t('google_analytics.views')"
      :can-search="canSearch"
      :search-query="searchQuery"
      :goback="false"
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
            class="mr-2"
            size="sm"
            @click="loadReport(scope.row)"
          >
            <progress-download-icon class="icon-2x" />Report
          </base-button>
          <delete-button @click.native="deleteView(scope.row)" />
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
  name: "ActiveViewsable",
  components: {
    ProgressDownloadIcon
  },
  mixins: [TableMixin, FormattersMixin],
  props: {
    activeViews: {
      type: Array,
      required: true
    }
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
      return this.activeViews
    },
    isReady() {
      return this.$store.getters["isReady"]("googleAnalytics/active_views")
    }
  },
  methods: {
    deleteView(row) {
      this.$emit("delete-view", row)
    },
    loadReport(row) {
      this.$emit("load-report", row)
    }
  }
}
</script>
