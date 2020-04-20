<template>
  <div>
    <el-row :gutter="20">
      <el-col
        :md="12"
        :lg="12"
        :sm="24"
        :xs="24"
      >
        <card v-if="plan">
          <form
            class="form-horizontal"
            @submit.prevent="validate"
          >
            <el-row :gutter="30">
              <el-col :span="12">
                <label class="col-form-label">Nome</label>
                <base-input
                  v-model="model.cardName"
                  v-validate="modelValidations.cardName"
                  :error="getError('cardName')"
                  data-vv-as="nome no cartão"
                  name="cardName"
                  placeholder="digite o nome como aparece no cartão"
                />
              </el-col>
              <el-col :span="12">
                <label class="col-form-label">Número do cartão</label>
                <base-input
                  v-model="model.cardNumber"
                  v-validate="modelValidations.cardNumber"
                  v-mask="['#### #### #### ####', '#### ###### #####']"
                  :error="getError('cardNumber')"
                  data-vv-as="número do cartão"
                  name="cardNumber"
                  placeholder="xxxx xxxx xxxx xxxx"
                />
              </el-col>
              <el-col :span="12">
                <label class="col-form-label">Data de expiração</label>
                <el-row type="flex">
                  <el-col>
                    <base-input
                      v-model="model.expirationMonth"
                      v-validate="modelValidations.expirationMonth"
                      :error="getError('expirationMonth')"
                      name="expirationMonth"
                      placeholder="MM"
                    />
                  </el-col>
                  <el-col>
                    <base-input
                      v-model="model.expirationYear"
                      v-validate="modelValidations.expirationYear"
                      :error="getError('expirationYear')"
                      name="expirationYear"
                      placeholder="AA"
                    />
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <label class="col-form-label">Código de segurança</label>
                <base-input
                  v-model="model.CVC"
                  v-validate="modelValidations.CVC"
                  :error="getError('cardCVC')"
                  name="cardCVC"
                  placeholder="xxx"
                />
              </el-col>
            </el-row>
            <small>*Nenhum pagamento será feito agora, apenas no final do trial. Cancele a qualquer momento.</small>
            <base-button
              :type="plan.type"
              :loading="isPaying"
              class="mt-3 btn-success"
              native-type="submit"
              block
            >
              <span v-if="!isPaying">Começar meu teste agora mesmo</span>
              <span v-else>Aguarde, verificando transação...</span>
            </base-button>
          </form>
        </card>
      </el-col>
      <el-col
        :span="6"
      >
        <div
          class="card card-primary card-white card-pricing card-princing-billing"
        >
          <div class="card-body card-user">
            <div class="author">
              <div class="block block-one" />
              <div class="block block-two" />
              <div class="block block-three" />
              <div class="block block-four" />
            </div>
            <ul class="list-group my-card-list">
              <li class="list-group-item">
                {{ plan.users }} users
              </li>
              <li class="list-group-item">
                R$ {{ plan.maxSpend }} limite
              </li>
            </ul>
            <div class="card-prices">
              <h3 class="text-on-front">
                R$ {{ plan.price }}
              </h3>
            </div>
            <div class="card-footer text-center mb-3 mt-3">
              <base-button
                type="primary"
                class="mr-4"
                @click="historyBack()"
              >
                Voltar para Planos
              </base-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mask } from "vue-the-mask"

const isProduction = process.env.VUE_APP_ENV == "production"

export default {
  name: "Billing",
  directives: {
    mask
  },
  props: {
    planRef: {
      type: String,
      required: true
    },
    plan: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      model: {
        cardName: !isProduction ? "Teste Barcellos" : "",
        cardNumber: !isProduction ? "4111 1111 1111 1111" : "",
        expirationMonth: !isProduction ? "10" : "",
        expirationYear: !isProduction ? "2019" : "",
        CVC: !isProduction ? "737" : "",
        price: this.plan.price
      },
      modelValidations: {
        cardName: {
          required: true,
          alpha_spaces: true
        },
        cardNumber: {
          required: true,
          credit_card: true
        },
        expirationMonth: {
          required: true,
          digits: 2
        },
        expirationYear: {
          required: true,
          digits: 4
        },
        CVC: {
          required: true,
          max: 4,
          min: 3
        }
      },
      isPaying: false
    }
  },
  computed: {
    isReady() {
      return this.plan ? true : false
    },
    user() {
      return this.$store.getters["account/user"]
    },
    userEmail() {
      return this.user && this.user.email
    },
    userName() {
      return this.$store.getters["account/userName"]
    },
    paymentStatus() {
      return this.$store.state.payment
    },
    chaveCheckout() {
      return window.chave_checkout
    },
    checkoutUrlJs() {
      //return Monetizze.checkoutUrlJs
      return "https://homolog.monetizze.com.br/checkout/transparente/js?ctk=N7nx66kvE4eTUFi7emvZTepeoP46yRzB&referencia="
    },
    checkoutReference() {
      return this.checkoutUrlJs.indexOf("homolog.") > -1 ? "KVC26443" : this.plan.ref
    }
  },
  watch: {
    paymentStatus(value) {
      if (value === true) {
        this.$notify({
          type: "success",
          message: "Transação confirmada! Seja muito bem vindo!",
          timeout: 10000
        })
        this.$router.push({ name: "Home" })
      } else if (value !== null) {
        this.$notify({
          type: "warning",
          message: value,
          timeout: 10000
        })
      }
    }
  },
  beforeCreate() {
    if (!this.$options.propsData.plan)
      this.$router.push({ name: "Subscriptions" })
  },
  beforeDestroy() {
    let existingScript = document.getElementById("checkout")
    if (existingScript) existingScript.remove()
  },
  mounted() {
    this.loadScripts()
  },
  methods: {
    historyBack() {
      this.$router.go(-1)
    },
    getError(fieldName) {
      return this.errors.first(fieldName)
    },
    validate() {
      this.$validator.validateAll().then(isValid => {
        if (isValid)
          this.pay()
      })
    },
    loadScripts() {
      let checkoutScript = document.createElement("script")
      checkoutScript.setAttribute("src", this.checkoutUrlJs + this.checkoutReference)
      checkoutScript.setAttribute("id", "checkout")
      document.head.appendChild(checkoutScript)
    },
    pay() {
      this.isPaying = true

      const data = this.model
      data.name = this.userName
      data.email = this.userEmail
      data.crmTag = this.plan.crmTag
      this.$store.dispatch("processPayment", {
        key: this.chaveCheckout,
        ref: this.checkoutReference,
        data: data
      })
        .then(() => {
          this.isPaying = false
        })
    }
  }
}
</script>

<style scoped>
  /*.card-pricing {
    min-height: 220px !important;
    height: 220px !important
  }
  .card-pricing .card-img {
    height: 200px !important;
    width: auto !important
  }
  .form-horizontal .col-form-label {
    max-width: auto !important
  }*/

  ul.my-card-list li{
    text-align: center !important;
    margin: auto;
  }

  .card-pricing .card-body .card-prices .plan{
    margin: 1em;
  }

  .card-pricing .card-body .card-title{
    font-size: 2em !important;
    margin: 2em;
    height: 3em;
    overflow: hidden;
    color: #212c3c;
    text-align: center

  }

  .card-princing-billing {
    overflow: hidden;
    min-width: 25em;
  }

  .card-pricing .card-body img {
    top: -2rem !important
  }
  .mr-4 {
    margin-right: 0 !important
  }
</style>
