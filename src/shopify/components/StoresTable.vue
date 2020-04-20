<template>
  <card body-classes="p-2">
    <view-table-header
      :element="$el"
      :title="$t('shopify.stores')"
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
        :label="$t('common.actions')"
        min-width="150"
        prop="actions"
      >
        <template slot-scope="props">
          <div class="list-center vertical-center">
            <delete-button @click.native="setAccountToDelete(props.row)" />
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
  </card>
</template>

<script>
// Mixins
import TableMixin from "@/components/shared/mixins/TableMixin"
import FormattersMixin from "@/components/shared/mixins/FormattersMixin"

export default {
  name: "StoresTable",
  mixins: [TableMixin, FormattersMixin],
  props: {
    accounts: {
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
        },
        {
          prop: "email",
          label: this.$t("common.email"),
          minWidth: 100,
          sortable: true
        },
        {
          prop: "domain",
          label: this.$t("shopify.domain"),
          minWidth: 100,
          sortable: true
        },
        {
          prop: "shop_owner",
          label: this.$t("shopify.shopOwner"),
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
      return this.$store.getters["shopify/accounts_fetched"]
    }
  },
  methods: {
    setAccountToDelete(row) {
      this.$emit("set-account-to-delete", row)
    }
  }
}
</script>
