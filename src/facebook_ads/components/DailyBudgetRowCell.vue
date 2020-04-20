<template>
  <div>
    {{ formattedValue }}
    <el-tooltip
      :content="tooltip"
      class="item"
      effect="dark"
      placement="top-start"
    >
      <base-button
        v-if="row.daily_budget"
        :loading="loading"
        class="btn-link"
        type="primary"
        icon
        round
        @click.native="handleEditDailyBudget(index, row)"
      >
        <pencil-circle-icon class="icon-2x" />
      </base-button>
      <base-button
        v-else
        class="btn-link"
        type="muted"
        size="lg"
        icon
      >
        <pencil-circle-icon class="icon-2x" />
      </base-button>
    </el-tooltip>
  </div>
</template>

<script>
import PencilCircleIcon from "icons/PencilCircle.vue"
import swal from "sweetalert2"
export default {
  components: {
    PencilCircleIcon
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
    formattedValue: {
      type: null,
      required: true
    },
    formatCurrency: {
      type: Function,
      required: true
    },
    callback: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      newValue: this.row.daily_budget,
      loading: false
    }
  },
  computed: {
    tooltip() {
      return this.row.daily_budget
        ? this.$t("facebook_ads.edit_daily_budget")
        : this.$t("facebook_ads.campaign_daily_budget_not_enabled")
    },
    formattedNewValue() {
      const v = (this.newValue && this.newValue / 100) || 0
      return this.formatCurrency(v, this.row)
    }
  },
  methods: {
    handleEditDailyBudget(index, row) {
      swal({
        title: `${this.$t(
          "facebook_ads.daily_budget"
        )}: <span class="ml-2 text-info">${this.formattedValue}</span>`,
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
          this.newValue = res.value

          swal({
            title: `${this.$t("common.new")} ${this.$t(
              "facebook_ads.daily_budget"
            )}`,
            html: `${row.name} <h2 class="text-warning mt-4">${
              this.formattedNewValue
            }</h2>`,
            showCancelButton: true,
            confirmButtonText: this.$t("common.confirm"),
            confirmButtonClass: "btn btn-primary btn-fill",
            cancelButtonText: this.$t("common.cancel"),
            cancelButtonClass: "btn btn-secondary btn-simple btn-fill",
            buttonsStyling: false
          }).then(res => {
            if (res.value) {
              this.loading = true
              this.callback(this.newValue, row, oldValue).then(() => {
                this.loading = false
              })
            }
          })
        }
      })
    }
  }
}
</script>
