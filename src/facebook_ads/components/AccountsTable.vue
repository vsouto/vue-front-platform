<template>
  <card>
    <slot name="header">
      <div class="title">
        {{ $t("facebook_ads.accounts") }}
      </div>
    </slot>
    <data-tables
      :data="tableData"
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
export default {
  name: "FacebookAdsAccountsTable",
  props: {
    accounts: {
      type: Array,
      required: true
    },
  },
  data() {
    this.tableColumns = [
      () => import(/* webpackChunkName: "facebook-ads" */ "@/facebook_ads/components/columns/IdColumn"),
      () => import(/* webpackChunkName: "facebook-ads" */ "@/facebook_ads/components/columns/NameColumn"),
    ]
    return {}
  },
  computed: {
    tableData() {
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
