<template>
  <card body-classes="p-2">
    <slot name="header">
      <div class="title">
        {{ $t("google_ads.ad_accounts") }}
      </div>
    </slot>
    <data-tables
      :data="queriedData"
      :current-page="1"
      :page-size="10"
      :pagination-props="{ background: true, pageSizes: [5,10,25] }"
    >
      <!-- Custom Columns -->
      <component
        :is="column"
        v-for="column in tableColumns"
        :key="column.prop"
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
          <delete-button @click.native="deleteAccount(scope.row)" />
        </template>
      </el-table-column>
    </data-tables>
  </card>
</template>

<script>
// Mixins
import TableMixin from "@/components/shared/mixins/TableMixin"
import FormattersMixin from "@/components/shared/mixins/FormattersMixin"

export default {
  name: "AccountsTable",
  components: {},
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
        () => import(/* webpackChunkName: "google_ads" */ "@/google_ads/components/columns/IdColumn"),
        () => import(/* webpackChunkName: "google_ads" */ "@/google_ads/components/columns/NameColumn"),
        // () => import(/* webpackChunkName: "google_ads" */ "@/google_ads/components/columns/StatusColumn"),
        /*{
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
          prop: "currency",
          label: this.$t("common.currency")
        },
        {
          prop: "timezone",
          label: this.$t("common.timezone")
        },*/
      ],
      pagination: {
        perPage: 5
      }
    }
  },
  computed: {
    computedTableData() {
      return this.accounts
    }
  },
  methods: {
    deleteAccount(row) {
      this.$emit("deleteAccount", row)
    }
  }
}
</script>
