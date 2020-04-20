<template>
  <card>
    <slot name="header">
      <div class="title">
        {{ $t("facebook_ads.accounts") }}
      </div>
    </slot>
    <data-tables
      v-loading="!isReady"
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
        :label="$t('common.actions')"
        min-width="100"
        prop="actions"
      >
        <template slot-scope="scope">
          <base-switch
            v-if="!isAccountSelected(scope.row.id)"
            v-model="businessAccountsSwitches[scope.row.id]"
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
    </data-tables>
    <v-tour
      :name="tourName"
      :steps="steps"
      :callbacks="tourCallbacks"
    />
  </card>
</template>

<script>
import { BaseSwitch } from "@/components/lib"
import TourMixin from "@/components/shared/mixins/TourMixin"
import FacebookAds from "@/facebook_ads"

export default {
  name: "FacebookAdsProfileAccountsTable",
  components: {
    BaseSwitch
  },
  mixins: [
    TourMixin
  ],
  props: {
    businessAccounts: {
      type: Array,
      required: true
    },
    accounts: {
      type: Array,
      required: true
    },
    businessId: {
      type: String,
      required: true
    }
  },
  data() {
    this.tourName = "profileAccounts"
    this.steps = [
      {
        target: ".bootstrap-switch-container",
        content: "Selecione as contas de anúncio que você quer integrar."
      }
    ]
    this.tableColumns = FacebookAds.tableColumns.accounts
    return {
      businessAccountsSwitches: {},
    }
  },
  computed: {
    tableData() {
      return this.businessAccounts
    },
    isReady() {
      return this.$store.getters["isReady"](`facebookAds/businessAccounts/${this.businessId}`)
    }
  },
  watch: {
    accounts: {
      handler(accounts) {
        if (this.ready)
          this.businessAccounts.map(account => {
            this.businessAccountsSwitches[account.id] =
              accounts.findIndex(o => o.id === account.id) !=
              -1
          })
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    for (const acc in this.businessAccounts) {
      this.businessAccountsSwitches[acc.id] = this.isAccountAdded(
        acc.id
      )
    }
  },
  methods: {
    selectAccount(row, $event) {
      // this.$emit("selectAccount", row, $event);
      this.$store.dispatch("facebookAds/selectAccountToAdd", {
        acc: row,
        toggle: $event
      })
      let obj = {}
      obj[row.id] = $event
      let switches = { ...this.businessAccountsSwitches, obj }
      this.businessAccountsSwitches = { ...switches }
    },
    isAccountAdded(id) {
      return this.accounts.findIndex(o => o.id === id) != -1
    },
    isAccountSelected(id) {
      return this.accounts.findIndex(o => o.id === id) != -1
    }
  }
}
</script>
