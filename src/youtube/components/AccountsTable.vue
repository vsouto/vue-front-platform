<template>
  <card card-body-classes="table-full-width">
    <view-table-header
      :element="$el"
      :can-search="canSearch"
      :search-query="searchQuery"
      :goback="false"
      title="Contas"
      @update-search-query="searchQuery=$event"
    />
    <loading v-if="!isReady" />
    <el-table
      v-else
      :data="queriedData"
    >
      <el-table-column
        type="expand"
      >
        <template slot-scope="props">
          <el-table :data="props.row.products">
            <el-table-column
              key="name"
              :label="$t('common.name')"
              prop="name"
              sortable
            >
              <template slot-scope="child">
                <img
                  v-if="child.row.thumbnail"
                  :src="child.row.thumbnail"
                  height="30"
                >
                {{ child.row.name }}
              </template>
            </el-table-column>
            <el-table-column
              key="code"
              :label="$t('youtube.code')"
              prop="code"
              sortable
            >
              <template slot-scope="child">
                {{ child.row.code }}
              </template>
            </el-table-column>
            <el-table-column
              key="key"
              :label="$t('youtube.key')"
              prop="key"
              sortable
            >
              <template slot-scope="child">
                {{ child.row.key }}
              </template>
            </el-table-column>
            <el-table-column
              key="status"
              prop="status"
              label="Status"
              sortable
            >
              <template slot-scope="child">
                {{ parseInt(child.row.status) == 2 ? "Aprovado" : "Em aprovação" }}
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>

      <el-table-column
        key="status"
        :width="50"
        prop="status"
      >
        <template slot-scope="props">
          <el-tooltip
            :content="$t(`credentials.${props.row.status || 'ok'}`)"
          >
            <check-circle-icon
              v-if="!props.row.status || props.row.status === 'ok'"
            />
            <minus-circle-icon
              v-else
            />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        key="id"
        :sortable="true"
        :width="200"
        prop="id"
        label="ID"
      />
      <el-table-column
        key="name"
        :label="$t('common.name')"
        :sortable="true"
        :width="200"
        prop="name"
      />

      <el-table-column
        key="products"
        :label="$t('youtube.products')"
        prop="products"
        sortable="true"
      >
        <template slot-scope="props">
          {{ props.row.products.length || '-' }}
        </template>
      </el-table-column>
      <el-table-column
        key="postback_url"
        :min-width="200"
        :label="$t('youtube.postback_url')"
        prop="postback_url"
      >
        <template slot-scope="props">
          <base-input class="postback-url-input">
            <el-input
              :value="props.row.postback_url"
              readonly
              class="pull-left"
            />
            <copy-clipboard-button
              :value="props.row.postback_url"
              class="ml-2"
            />
          </base-input>
        </template>
      </el-table-column>
      <el-table-column
        key="actions"
        :label="$t('common.actions')"
        prop="actions"
      >
        <template slot-scope="props">
          <delete-button @click.native="setAccountToDelete(props.row)" />
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
      required: true
    },
    tableFieldsProducts: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
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
      return this.$store.getters["isReady"]("youtube/getAccounts")
    }
  },
  methods: {
    setAccountToDelete(row) {
      this.$emit("set-account-to-delete", row)
    }
  }
}
</script>
<style scoped>
.postback-url-input >>> .el-input {
  width: 80%
}
</style>

