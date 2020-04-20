<template>
  <card body-classes="p-2">
    <view-table-header
      :element="$el"
      :title="$t('google_ads.ad_accounts')"
      :can-search="canSearch"
      :search-query="searchQuery"
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
      <el-table-column
        key="actions"
        :label="$t('common.actions')"
        min-width="100"
        prop="actions"
      >
        <template slot-scope="scope">
          <base-switch
            v-if="!isAccountAdded(scope.row.id)"
            v-model="accountsSwitches[scope.row.id]"
            @input="selectAccount(scope.row, $event)"
          />
          <el-tooltip
            v-else
            :content="$t('common.account_integrated')"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <base-switch :value="true" />
          </el-tooltip>
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
    <v-tour
      :name="tourName"
      :steps="steps"
      :callbacks="tourCallbacks"
    />
  </card>
</template>

<script>
// Mixins
import TableMixin from "@/components/shared/mixins/TableMixin"
import FormattersMixin from "@/components/shared/mixins/FormattersMixin"

import { BaseSwitch } from "@/components/lib"

import TourMixin from "@/components/shared/mixins/TourMixin"


export default {
  name: "CustomerAccountsTable",
  components: {
    BaseSwitch,
  },
  mixins: [
    TableMixin,
    FormattersMixin,
    TourMixin
  ],
  props: {
    profileId: {
      type: String,
      required: true
    },
    customerId: {
      type: String,
      required: true
    },
    addedAccounts: {
      type: Array,
      required: true
    },
    accounts: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      tourName: "customerAccounts",
      selected: [],
      accountsSwitches: {},
      tableColumns: [
        {
          prop: "id",
          label: "id",
          sortable: true
        },
        {
          prop: "name",
          label: this.$t("common.name"),
          sortable: true
        },
        {
          prop: "currency",
          label: this.$t("common.currency"),
        },
        {
          prop: "timezone",
          label: this.$t("common.timezone"),
        }
      ],
      steps: [
        {
          target:".bootstrap-switch-container",
          content:"<b>Autorize acesso à sua conta.</b><br>Você pode permitir acesso a quantas contas quiser!",
          params:{
            placement: "bottom",
          }
        },
      ],
    }
  },
  computed: {
    computedTableData() {
      return this.accounts
    },
    isReady() {
      return this.$store.getters["isReady"](`googleAds/fetchProfileCustomerAccounts/${this.profileId}/${this.customerId}`)
    }
  },
  watch: {
    accounts: {
      handler(accounts) {
        if (this.ready)
          this.addedAccounts.map(account => {
            this.accountsSwitches[account.id] =
              accounts.findIndex(o => o.id === account.id) !=
              -1
          })
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    for (const acc in this.addedAccounts) {
      this.accountsSwitches[acc.id] = this.isAccountAdded(
        acc.id
      )
    }
  },
  methods: {
    selectAccount(row, enabled) {
      if (enabled)
        if (this.selected.toString().indexOf(row.id) === -1) this.selected.push(row)
      if (!enabled)
        this.selected = this.selected.filter(acc => acc.id != row.id)
      this.$emit("change", this.selected)
      let obj = {}
      obj[row.id] = enabled
      let switches = { ...this.accountsSwitches, obj }
      this.accountsSwitches = { ...switches }
    },
    isAccountAdded(id) {
      return this.addedAccounts.findIndex(o => o.id === id) != -1
    },
    isAccountSelected(id) {
      return this.selected.findIndex(o => o.id === id) != -1
    }
  }
}
</script>
