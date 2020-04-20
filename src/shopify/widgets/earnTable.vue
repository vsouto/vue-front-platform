<template>
  <el-table
    :data="data"
    :default-sort="{prop: 'earn', order: 'descending'}"
  >
    <!-- Expandable -->
    <el-table-column type="expand">
      <template slot-scope="props">
        <span v-if="props.row.credit_card_sales && props.row.credit_card_sales > 0">
          <el-tag
            class="pull-left"
            type="success"
          >
            Cartão de crédito:
            {{ formatCurrency(props.row.credit_card_earn, props.row.currency_symbol) }}
            ({{ props.row.credit_card_sales }})
          </el-tag>
        </span>
        <span v-if="props.row.billet_sales && props.row.billet_sales > 0">
          <el-tag
            class="pull-left"
            type="success"
          >
            Boletos finalizados:
            {{ formatCurrency(props.row.billet_earn, props.row.currency_symbol) }}
            ({{ props.row.billet_sales }})
          </el-tag>
        </span>
        <span v-if="props.row.cancels_count && props.row.cancels_count > 0">
          <el-tag
            type="secondary"
            class="text-muted pull-left"
          >
            Canceladas:
            {{ props.row.cancels_count }}
          </el-tag>
        </span>
        <span v-if="props.row.disputing_count && props.row.disputing_count > 0">
          <el-tag
            class="pull-left"
            type="warning"
          >
            Bloqueadas:
            {{ props.row.disputing_count }}
          </el-tag>
        </span>
        <span v-if="props.row.refunds_count && props.row.refunds_count > 0">
          <el-tag
            class="pull-left"
            type="danger"
          >
            Devolvidas:
            {{ props.row.refunds_count }}
          </el-tag>
        </span>
      </template>
    </el-table-column>

    <!-- Postback type icon -->
    <el-table-column
      :width="50"
      prop="postback_type_code"
    >
      <template slot="header">
        <el-tooltip
          :content="platform.name"
          class="item"
          effect="dark"
          placement="top-start"
        >
          <img
            :src="platform.icon"
            height="20"
          >
        </el-tooltip>
      </template>
      <template slot-scope="props">
        <el-tooltip
          v-if="props.row.postback_type_code == 1"
          class="item"
          effect="dark"
          placement="top-start"
          content="Sistema"
        >
          <account-icon class="text-info" />
        </el-tooltip>
        <el-tooltip
          v-if="props.row.postback_type_code == 2"
          class="item"
          effect="dark"
          placement="top-start"
          content="Produtor"
        >
          <account-icon class="text-success" />
        </el-tooltip>
        <el-tooltip
          v-else-if="props.row.postback_type_code == 3"
          class="item"
          effect="dark"
          placement="top-start"
          content="Co-Produtor"
        >
          <account-outline-icon class="text-success" />
        </el-tooltip>
        <el-tooltip
          v-else-if="props.row.postback_type_code == 4"
          class="item"
          effect="dark"
          placement="top-start"
          content="Afiliado"
        >
          <account-icon />
        </el-tooltip>
        <el-tooltip
          v-else-if="props.row.postback_type_code == 5"
          class="item"
          effect="dark"
          placement="top-start"
          content="Afiliado Premium"
        >
          <account-star-outline-icon class="text-primary" />
        </el-tooltip>
        <el-tooltip
          v-else-if="props.row.postback_type_code == 6"
          class="item"
          effect="dark"
          placement="top-start"
          content="Gerente de Afiliado"
        >
          <account-group-icon />
        </el-tooltip>
        <el-tooltip
          v-else-if="props.row.postback_type_code == 7"
          class="item"
          effect="dark"
          placement="top-start"
          content="Co-afiliado"
        >
          <account-group-outline-icon />
        </el-tooltip>
      </template>
    </el-table-column>

    <!-- Name -->
    <el-table-column
      prop="name"
    >
      <template slot-scope="props">
        <el-tooltip
          :content="`${props.row.name} (${props.row.id})`"
          class="item"
          effect="dark"
          placement="top-start"
        >
          <span style="white-space: nowrap">{{ props.row.name }}</span>
        </el-tooltip>
      </template>
    </el-table-column>

    <!-- Sales -->
    <el-table-column
      :sortable="true"
      prop="sales"
    >
      <template slot="header">
        <el-tooltip
          :content="$t('shopify.sales')"
          class="item"
          effect="dark"
          placement="top-start"
        >
          <span>
            <cart-icon class="icon-2x text-success" />
          </span>
        </el-tooltip>
      </template>
      <template slot-scope="props">
        {{ props.row.sales }}
      </template>
    </el-table-column>

    <!-- Earn -->
    <earn-table-column />

    <!-- Pending -->
    <el-table-column
      :sortable="true"
      prop="pending"
    >
      <template slot="header">
        <el-tooltip
          :content="$t('shopify.pending')"
          class="item"
          effect="dark"
          placement="top-start"
        >
          <span>
            <cart-icon class="icon-15x text-muted" />
          </span>
        </el-tooltip>
      </template>
      <template slot-scope="props">
        <div v-if="props.row.pending_count">
          {{ formatCurrency(props.row.pending_value, props.row.currency_symbol) }} ({{ props.row.pending_count }})
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import Platform from "@/shopify"

// Icons
import AccountIcon from "icons/Account"
import AccountOutlineIcon from "icons/AccountOutline.vue"
import AccountGroupIcon from "icons/AccountGroup.vue"
import AccountGroupOutlineIcon from "icons/AccountGroupOutline.vue"
import AccountStarOutlineIcon from "icons/AccountStarOutline.vue"
import CartIcon from "icons/Cart.vue"

// Mixins
import FormattersMixin from "@/components/shared/mixins/FormattersMixin"
import BaseTableChildMixin from "@/components/shared/mixins/BaseTableChildMixin"

// Columns
import EarnTableColumn from "@/components/widgets/table-columns/earn"

export default {
  name: "ShopifyEarnTable",
  components: {
    AccountIcon,
    AccountOutlineIcon,
    AccountGroupIcon,
    AccountGroupOutlineIcon,
    AccountStarOutlineIcon,
    CartIcon,

    EarnTableColumn
  },
  mixins: [FormattersMixin, BaseTableChildMixin],
  data() {
    return {
      platform: Platform
    }
  }
}
</script>
