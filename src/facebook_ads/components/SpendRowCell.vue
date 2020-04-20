<template>
  <div>
    <el-tooltip
      v-if="parseInt(row.budget_remaining)"
      :content="`${$t('facebook_ads.budget_remaining')}: ${formattedBudgetRemaining}`"
      class="item"
      effect="dark"
      placement="top-start"
    >
      <base-progress
        :label="formatCurrency(spend, row.currency_symbol)"
        :value="baseProgressValue"
        value-position="right"
        type="warning"
      />
    </el-tooltip>
    <span v-else>{{ formattedSpend }}</span>
  </div>
</template>

<script>
import swal from "sweetalert2"
import { BaseProgress } from "@/components/lib"
export default {
  components: {
    BaseProgress
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    row: {
      type: Object,
      required: true
    },
    getRowInsights: {
      type: Function,
      required: true
    },
    formatCurrency: {
      type: Function,
      required: true
    }
  },
  computed: {
    spend() {
      return parseFloat(this.getRowInsights(this.row).spend)
    },
    formattedSpend() {
      return this.formatCurrency(this.spend, this.row.currency_symbol)
    },
    budgetRemaining() {
      return (
        parseFloat(
          this.row.budget_remaining && this.row.budget_remaining / 100
        ) || 0
      )
    },
    formattedBudgetRemaining() {
      return this.formatCurrency(this.budgetRemaining, this.row.currency_symbol)
    },
    dailyBudget() {
      return (
        parseFloat(this.row.daily_budget && this.row.daily_budget / 100) || 0
      )
    },
    baseProgressValue() {
      let v = 0,
        total = 0
      if (this.budgetRemaining) {
        total = this.spend + this.budgetRemaining
      } else if (this.dailyBudget) {
        total = this.dailyBudget
      } else {
        total = 0
      }
      if (total > 0) {
        v = (this.spend / total) * 100
      }
      return parseInt(v)
    }
  },
  methods: {
    handleEditDailyBudget(index, row) {
      swal({
        title: `${this.$t(
          "facebook_ads.daily_budget"
        )}: <span class="ml-2 text-info">${this.formattedDailyBudget}</span>`,
        html: `${row.name}`,
        input: "number",
        inputValue: row.daily_budget,
        inputAttributes: {
          min: 1
        },
        inputValidator: value => {
          return new Promise(resolve => {
            if (value == row.daily_budget) {
              resolve("Informe um valor diferente")
            } else if (value < 1) {
              resolve("Mínimo valor: 1")
            } else if (!value) {
              resolve("É necessário um valor")
            } else {
              resolve()
            }
          })
        },
        showCancelButton: true,
        confirmButtonText: this.$t("facebook_ads.edit_daily_budget"),
        confirmButtonClass: "btn btn-info btn-simple btn-fill",
        cancelButtonText: this.$t("common.cancel"),
        cancelButtonClass: "btn btn-secondary btn-simple btn-fill",
        buttonsStyling: false
      }).then(res => {
        if (res.value) {
          let oldValue = row.daily_budget
          let newValue = res.value

          swal({
            title: `${this.$t("common.new")} ${this.$t(
              "facebook_ads.daily_budget"
            )}`,
            html: `${
              row.name
            } <h2 class="text-warning mt-4">${this.formatCurrency(
              newValue
            )}</h2>`,
            showCancelButton: true,
            confirmButtonText: this.$t("common.confirm"),
            confirmButtonClass: "btn btn-primary btn-fill",
            cancelButtonText: this.$t("common.cancel"),
            cancelButtonClass: "btn btn-secondary btn-simple btn-fill",
            buttonsStyling: false
          }).then(res => {
            if (res.value) this.callback(newValue, row, oldValue)
          })
        }
      })
    }
  }
}
</script>
