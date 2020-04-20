<template>
  <card body-classes="p-2">
    <view-table-header
      :element="$el"
      :title="$t('common.users')"
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
      <!-- table columns -->

      <el-table-column
        :min-width="100"
        :label="$t('common.users')"
        prop="user_metadata"
      >
        <template
          slot-scope="scope"
        >
          <el-tooltip
            :content="scope.row.email_verified ? 'Verificado': 'Aguardando verificação'"
            placement="top-start"
          >
            <div>
              <img
                :src="scope.row.picture"
                :alt="scope.row.name"
                class="mr-2"
                width="30"
              >
              {{ scope.row.user_metadata.firstname + ' ' + scope.row.user_metadata.lastname }}
            </div>
          </el-tooltip>
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
          <edit-button
            class="m-1"
            @click.native="openEditModal(scope.row)"
          />
          <delete-button
            class="m-1"
            @click.native="openDelModal(scope.row)"
          />
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

export default {
  name: "LimitedUsersTable",
  mixins: [TableMixin, FormattersMixin],
  props: {
    users: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      tableColumns: [
        {
          prop: "email",
          label: "Email",
          minWidth: 100,
          sortable: true
        },
        {
          prop: "app_metadata",
          label: "panels",
          minWidth: 100,
          sortable: true,
          formatter: this.panelsFormatter
        },
        {
          prop: "app_metadata",
          label: "widgets",
          minWidth: 100,
          sortable: true,
          formatter: this.widgetsFormatter
        }
      ],
    }
  },
  computed: {
    computedTableData() {
      return this.users
    },
    isReady() {
      return this.$store.getters["isReady"]("limitedUsers")
    }
  },
  methods: {
    panelsFormatter(row) {
      return row.app_metadata.panels
    },
    widgetsFormatter(row) {
      return row.app_metadata.widgets
    },
    openEditModal(row) {
      this.$emit("open-edit-modal", row)
    },
    openDelModal(row) {
      this.$emit("open-del-modal", row)
    }
  }
}
</script>
