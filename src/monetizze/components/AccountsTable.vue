<template>
  <card card-body-classes="table-full-width">
    <slot name="header">
      <div class="title">
        {{ $t("monetizze.accounts") }}
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

    <!-- Tour -->
    <v-tour
      :name="tourName"
      :steps="steps"
      :is-big="true"
      :callbacks="tourCallbacks"
    />
  </card>
</template>

<script>
// Mixins
import TableMixin from "@/components/shared/mixins/TableMixin"
import FormattersMixin from "@/components/shared/mixins/FormattersMixin"
import CheckCircleIcon from "icons/CheckCircle.vue"
import MinusCircleIcon from "icons/MinusCircle.vue"
import TourMixin from "@/components/shared/mixins/TourMixin"

export default {
  name: "AccountsTable",
  components: {
    CheckCircleIcon,
    MinusCircleIcon
  },
  mixins: [TableMixin, FormattersMixin, TourMixin],
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
    this.tableColumns = [
      () => import(/* webpackChunkName: "monetizze" */ "@/monetizze/components/columns/IdColumn"),
      () => import(/* webpackChunkName: "monetizze" */ "@/monetizze/components/columns/NameColumn"),
      // () => import(/* webpackChunkName: "monetizze" */ "@/monetizze/components/columns/StatusColumn"),
    ]
    return {
      pagination: {
        perPage: 5
      },
      tourName: "monetizzeCallback",
      steps: [
        {
          target:".el-input__inner",
          content:"<b>A conexão com a Monetizze é aprovada na hora!</b><br> Assim que fizer os passos anteriores, iremos" +
            " gerar uma <b>URL DE POSTBACK</b> pra você, aí é copiar e colar no Postback da Monetizze. <br> Pra isso," +
            " é só clicar <a href='https://app.monetizze.com.br/ferramentas/postback' target='_blank'> <blue>" +
            "<u>AQUI</u></blue></a>",
          params:{
            placement: "bottom",
          }
        }
      ],
    }
  },
  computed: {
    computedTableData() {
      return this.accounts
    }
  },
  methods: {
    setAccountToDelete(row) {
      this.$emit("set-account-to-delete", row)
    },
    deleteAccount(row) {
      this.$emit("deleteAccount", row)
    }
  }
}
</script>
<style scoped>
.postback-url-input >>> .el-input {
  width: 80%
}
</style>

