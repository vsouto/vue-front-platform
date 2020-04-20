<template>
  <card body-classes="p-2">
    <slot name="header">
      <div class="title">
        {{ $t("google_adsense.accounts") }}
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

import CheckCircleIcon from "icons/CheckCircle.vue"
import MinusCircleIcon from "icons/MinusCircle.vue"

export default {
  name: "AccountsTable",
  components: {
    CheckCircleIcon,
    MinusCircleIcon
  },
  mixins: [TableMixin, FormattersMixin],
  props: {
    accounts: {
      type: Array,
      required: true,
    },
  },
  data() {
    this.tableColumns = [
      () => import(/* webpackChunkName: "google_adsense" */ "@/google_adsense/components/columns/IdColumn"),
      () => import(/* webpackChunkName: "google_adsense" */ "@/google_adsense/components/columns/NameColumn"),
      () => import(/* webpackChunkName: "google_adsense" */ "@/google_adsense/components/columns/StatusColumn"),
    ]
    return {
      pagination: {
        perPage: 5,
      },
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
    },
  },
}
</script>
