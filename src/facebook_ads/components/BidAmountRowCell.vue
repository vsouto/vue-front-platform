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
        v-if="canEdit"
        :loading="loading"
        class="btn-link"
        type="primary"
        icon
        round
        @click.native="handleEditBidAmount(index, row)"
      >
        <pencil-circle-icon class="icon-2x" />
      </base-button>
      <!-- <base-button v-else class="btn-link" type="muted" round icon>
        <pencil-circle-icon class="icon-2x"/>
      </base-button>-->
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
      newValue: this.row.bid_amount,
      loading: false
    }
  },
  computed: {
    tooltip() {
      return this.row.bid_amount
        ? this.$t("common.edit") + " " + this.$t("facebook_ads.bid_amount")
        : this.row.bid_strategy == "LOWEST_COST_WITHOUT_CAP"
          ? this.$t("facebook_ads.auto_bid")
          : this.$t("facebook_ads.campaign_bid_amount_enabled")
    },
    canEdit() {
      return (
        this.row.bid_amount &&
        this.row.bid_strategy != "LOWEST_COST_WITHOUT_CAP"
      )
    },
    formattedBidAmount() {
      if (this.row.bid_strategy == "LOWEST_COST_WITHOUT_CAP")
        return this.$t("facebook_ads.auto_bid")
      return this.formattedValue
    },
    formattedNewValue() {
      const v = (this.newValue && this.newValue / 100) || 0
      return this.formatCurrency(v, this.row.currency_symbol)
    }
  },
  methods: {
    handleEditBidAmount(index, row) {
      swal({
        title: `${this.$t(
          "facebook_ads.bid_amount"
        )}: <span class="ml-2 text-info">${this.formattedBidAmount}</span>`,
        html: `${row.name}`,
        input: "number",
        inputValue: row.bid_amount,
        inputAttributes: {
          min: 1
        },
        inputValidator: value => {
          return new Promise(resolve => {
            if (value == row.bid_amount) {
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
        confirmButtonText: this.$t("facebook_ads.edit_bid_amount"),
        confirmButtonClass: "btn btn-info btn-simple btn-fill",
        cancelButtonText: this.$t("common.cancel"),
        cancelButtonClass: "btn btn-secondary btn-simple btn-fill",
        buttonsStyling: false
      }).then(res => {
        if (res.value) {
          let oldValue = row.bid_amount
          this.newValue = res.value

          swal({
            title: `${this.$t("common.new")} ${this.$t(
              "facebook_ads.bid_amount"
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
