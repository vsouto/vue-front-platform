<template>
  <div>
    <base-input v-if="orders && orders.length > 5">
      <el-input
        v-model="searchQuery"
        :placeholder="$t('table.search')"
        type="search"
        class="mb-1 mt-1 search-input"
        clearable
        prefix-icon="el-icon-search"
        aria-controls="datatables"
      />
    </base-input>

    <el-table :data="queriedData">
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
        key="actions"
        :label="$t('common.actions')"
        min-width="100"
        prop="actions"
      >
        <template slot-scope="scope">
          <base-button
            type="primary"
            size="sm"
            @click="loadOrderProducts(scope.row)"
          >
            Load products
          </base-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- footer -->
    <div
      v-if="orders && orders.length > 5"
      slot="footer"
      class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
    >
      <div class>
        <p
          class="card-category"
        >
          {{ $t("table.showing") }} {{ from + 1 }} {{ $t("table.to") }} {{ to }} {{ $t("table.of") }} {{ total }}
        </p>
      </div>
      <el-select
        v-model="pagination.perPage"
        class="select-primary mb-3 pagination-select"
        placeholder="Per page"
      >
        <el-option
          v-for="item in pagination.perPageOptions"
          :key="item"
          :label="item"
          :value="item"
          class="select-primary"
        />
      </el-select>
      <base-pagination
        v-model="pagination.currentPage"
        :per-page="pagination.perPage"
        :total="total"
        class="pagination-no-border"
      />
    </div>
  </div>
</template>

<script>
import { Table, TableColumn, Select, Option } from "element-ui"
import { BasePagination } from "@/components/lib"
import Fuse from "fuse.js"

export default {
  name: "OrdersTable",
  components: {
    BasePagination,
    "el-select": Select,
    "el-option": Option,
    "el-table": Table,
    "el-table-column": TableColumn
  },
  props: {
    orders: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      searchQuery: "",
      propsToSearch: ["id", "email"],
      tableColumns: [
        {
          prop: "id",
          label: "id",
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
          prop: "line_items",
          label: this.$t("monetizze.products"),
          minWidth: 80,
          sortable: true,
          formatter: this.formatProducts
        },
        {
          prop: "total_price",
          label: "Preço, R$",
          minWidth: 80,
          sortable: true
        },
        {
          prop: "total_price_usd",
          label: "Preço, $",
          minWidth: 80,
          sortable: true
        },
      ],
      searchedData: [],
      fuseSearch: null
    }
  },
  computed: {
    queriedData() {
      let result = this.orders
      if (this.searchedData && this.searchedData.length > 0) {
        result = this.searchedData
      }
      return result.slice(this.from, this.to)
    },
    to() {
      let highBound = this.from + this.pagination.perPage
      if (this.total < highBound) {
        highBound = this.total
      }
      return highBound
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1)
    },
    total() {
      return this.searchedData && this.searchedData.length > 0
        ? this.searchedData.length
        : this.orders.length
    }
  },
  watch: {
    searchQuery(value) {
      let result = this.orders
      if (value !== "") {
        result = this.fuseSearch.search(this.searchQuery)
      }
      this.searchedData = result
    }
  },
  mounted() {
    // Fuse search initialization.
    this.fuseSearch = new Fuse(this.orders, {
      keys: this.propsToSearch,
      threshold: 0.3
    })
  },
  methods: {
    formatProducts(row, column, cellValue){
      return cellValue && cellValue.length ? cellValue.length : 0
    },
    loadOrderProducts(order){
      this.$emit("loadOrderProducts", order.id)
    }
  }
}
</script>
