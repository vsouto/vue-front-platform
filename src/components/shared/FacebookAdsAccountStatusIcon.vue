<template>
  <el-tooltip
    class="item"
    effect="dark"
    placement="top-start"
    :content="tooltipContent"
  >
    <play-icon
      v-if="accountStatus == 1"
      class="text-success"
    />
    <cancel-icon
      v-else-if="accountStatus == 2"
      class="text-danger"
    />
    <currency-usd-off-icon
      v-else-if="accountStatus == 3"
      class="text-danger"
    />
    <cancel-icon
      v-else-if="accountStatus == 7"
      class="text-warning"
    />
    <currency-usd-off-icon
      v-else-if="accountStatus == 8"
      class="text-warning"
    />
    <play-icon
      v-else-if="accountStatus == 9"
      class="text-warning"
    />
    <cancel-icon
      v-else
      class="text-muted"
    />
  </el-tooltip>
</template>

<script>
import CurrencyUsdOffIcon from "icons/CurrencyUsdOff.vue"
import PlayIcon from "icons/Play.vue"
import CancelIcon from "icons/Cancel.vue"
export default {
  components: {
    CurrencyUsdOffIcon,
    PlayIcon,
    CancelIcon
  },
  props: {
    accountStatus: {
      default: null,
      validator: prop => typeof prop === "number" || typeof prop === "string"
    },
    disableReason: {
      default: null,
      validator: prop => typeof prop === "number" || typeof prop === "string" || prop === null
    }
  },
  computed: {
    disableReasonMessage() {
      switch (this.disableReason) {
      case 1:
        return "Desativada por políticas"
      case 2:
        return "Desativada por flag de IP"
      case 3:
        return "Desativada por pagamento de risco"
      default:
        return "Desativada"
      }
    },
    accountStatusMessage() {
      switch (this.accountStatus) {
      case 1:
        return "Ativa"
      case 2:
        return "Desabilitada"
      case 3:
        return "Desabilitada por pagamento pendente"
      case 7:
        return "Aguardando revisão de risco"
      case 8:
        return "Pagamento pendente"
      case 9:
        return "Desabilitará em breve"
      default:
        return "Desativada"
      }
    },
    tooltipContent() {
      if (this.accountStatus == 2)
        return this.disableReasonMessage
      else if (this.accountStatus == 1)
        return this.accountStatusMessage
      return this.accountStatusMessage
    }
  }
}
</script>
