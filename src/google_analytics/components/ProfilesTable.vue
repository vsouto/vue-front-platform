<template>
  <card card-body-classes="table-full-width">
    <view-table-header
      :element="$el"
      :title="$t('facebook_ads.profiles')"
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

      <el-table-column
        key="name"
        :label="$t('common.name')"
        min-width="150"
        prop="name"
      >
        <template slot-scope="scope">
          <img
            v-if="scope.row.picture"
            :src="scope.row.picture"
            height="30"
          >
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <!-- Actions -->
      <el-table-column
        key="actions"
        :min-width="100"
        prop="actions"
      >
        <template
          slot-scope="scope"
          class="list-center vertical-center"
        >
          <base-button
            type="primary"
            size="sm"
            class="mr-2"
            @click="loadAccounts(scope.row)"
          >
            <progress-download-icon class="icon-2x" />
            Accounts
          </base-button>
          <delete-button @click.native="deleteProfile(scope.row)" />
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
import TableMixin from "@/components/shared/mixins/TableMixin"
import FormattersMixin from "@/components/shared/mixins/FormattersMixin"

import ProgressDownloadIcon from "icons/ProgressDownload.vue"

export default {
  name: "ProfilesTable",
  components: {
    ProgressDownloadIcon
  },
  mixins: [TableMixin, FormattersMixin],
  props: {
    profiles: {
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
      ],
      pagination: {
        perPage: 5
      }
    }
  },
  computed: {
    computedTableData() {
      return this.profiles
    },
    isReady() {
      return this.$store.getters["isReady"]("googleAnalytics/profiles")
    }
  },
  methods: {
    loadAccounts(row){
      this.$emit("load-accounts", row)
    },
    deleteProfile(row) {
      this.$emit("delete-profile", row)
    },
  }
}
</script>
