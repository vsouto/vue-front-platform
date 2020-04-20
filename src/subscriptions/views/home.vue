<template>
  <div class="animated fadeIn">
    <div id="Subscriptions">
      <div class="card card-testimonial">
        <!---->
        <div class="card-header card-header-avatar">
          <img
            src="./../../../public/img/icons/subscriptions.png"
            alt="Card image"
            class="img img-raised"
          >
        </div>
        <div class="card-body">
          <div class="card-title pricing-tittle">
            Escolha o melhor plano
          </div>
          <p class="card-description">
            baseado em quanto você investe em anúncios
          </p>
        </div>
        <div class="pricingtoggle">
          <a class="pricing-tab"> Mensal</a>
          <label class="toggle">
            <input
              v-model="isAnnual"
              type="checkbox"
            >
            <span class="slider round" />
          </label>
          <a class="pricing-tab"> Anual</a>
          <span class="pricing-tab-anualdisc">2 meses grátis!</span>
        </div>
        <b-row>
          <b-col :cols="12">
            <div id="pricing">
              <el-slider
                v-model="sliderValue"
                :min="1"
                :max="14"
                :format-tooltip="formatTooltip"
                :show-tooltip="false"
                class="header-margin-left header-margin-right"
                tooltip-class="plan-tooltip"
                input-size="large"
                label="Planos"
              />
            </div>
          </b-col>
        </b-row>
        <div class="card-title text-white">
          <b>{{ planValue }}</b> <span class="card-description"> por mês</span>
        </div>
        <div class="maxadspend">
          <span class="card-description">Invista até </span>
          <b>{{ planMaxSpend }}</b> <span class="card-description"> mês em anúncios, tenha até </span>
          <b>{{ planUsers }}</b> <span class="card-description"> usuários grátis!</span>
        </div>

        <div class="sliderctarow">
          <div class="slidercta">
            <button
              type="button"
              class="btn btn-round btn-plan-select btn-primary"
              @click="openBilling"
            >
              Selecionar plano
            </button>
          </div>
          <div class="slidercta">
            <a
              class="btn btn-simple btn-round btn-info book-demo"
              href="https://painel.live/demo"
              target="_blank"
            >
              Agendar demonstração
            </a>
          </div>
          <div class="sliderctarow nocreditcard">
            Fale com nossos especialistas e sane suas dúvidas
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Slider } from "element-ui"

// Model
// var Plan = require("./../models/plan")

// Data
import plans from "./../data/plans_monthly"
import plans_yearly from "./../data/plans_yearly"
import toFixed from "@/utils/accounting/toFixed"

export default {
  name: "Subscriptions",
  components:{
    "el-slider": Slider
  },
  data() {
    return {
      isAnnual: false,
      plansYearlyList: plans,
      plansMonthlyList: plans_yearly,
      sliderValue: 1,
      scheduleLink: "https://pipedrivewebforms.com/form/a75f3ca4df4687ae98615074fd498c1d6366965"
    }
  },
  computed: {
    plan() {
      if (this.isAnnual)
        return this.planYearly

      return this.planMonthly
    },
    planYearly() {
      return this.plansYearlyList[this.sliderValue - 1]
    },
    planMonthly() {
      return this.plansMonthlyList[this.sliderValue - 1]
    },
    planPrice() {
      let price = parseFloat(this.plan.price)
      if (this.isAnnual)
        price = price * 0.83
      return toFixed(price, 0)
    },
    planValue() {
      return "R$ " + this.planPrice.replace(/\d(?=(\d{3})+\.)/g, "$&,")
    },
    planMaxSpend() {
      return "R$ " + this.plan.maxSpend
    },
    planUsers() {
      return this.plan.users
    },
  },
  created() {
  },
  methods: {
    formatTooltip() {
      return ""
    },
    openBilling() {
      const planSelected = this.plan

      // TODO: fix plan value

      planSelected.price = this.planPrice

      this.$router.push({
        name: "CheckoutSubscription",
        params: {
          planRef: planSelected.ref,
          plan: planSelected
        }
      })
    }
  }
}
</script>

<style scoped>
  /* <SLIDER PRICING/> */
  #pricing {
    margin: 1em 13em;

  }
  .containerpricingslider {
    max-width: 100%;
    margin: auto;
    text-align: center;
    position: relative;
    font-size: 1em;
  }
  .pricing-tittle {
    max-width: 100%;
    margin-right: auto;
    margin-left: auto;
    color: #212c3c;
    margin-top: 0;
    margin-bottom: 0.35em;
    font-size: 3em;
    font-weight: 550;
  }
  .pricingtoggle {
    width: 100%;
    margin-bottom: 1em;
    margin-top: 4em;
    align-content: center;
    display: block;
    color: white;
  }
  .pricing-tab {
    font-size: 1.5rem;
    margin-right: 0.3em;
    margin-left: 0.3rem;
    padding: 0.5rem;
    color: black;
    display: inline-block;
    vertical-align: middle;
    color: #212c3c;
  }
  pricing-tab.active {
    color: #E14ECA;
  }
  .pricing-tab-anualdisc {
    position: relative;
    display: inline;
    font-size: 0.8em;
    font-weight: 700;
    top: -1em;
    left: -1em;

  }
  .pricingresult {
    margin: 0.3em;
    margin-bottom: 0em;
    display: block;
    color: #212c3c;
    font-size: 3em;
    font-weight: 550;
  }
  .maxadspend {
    margin-bottom: 1em;
    font-size: 1.3em;
    color: white;
  }
  .maxadspend b{
    font-size: 1.7em;
    color: white;
  }
  .toggle {
    position: relative;
    display: inline-block;
    width: 3.75em;
    height: 2.125em;
    vertical-align: middle;

  }
  .toggle input {
    opacity: 0;
    width: 0;
    height: 0;

  }
  .round {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #E14ECA;
    -webkit-transition: .4s;
    transition: .4s;
    border: 3px solid #212c3c
  }
  .round:before {
    position: absolute;
    content: "";
    height: 1.5em;
    width: 1.5em;
    left: -0.02em;
    bottom: 0.09em;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    border: 3px solid #212c3c
  }
  input:checked + .slider {
    background-color: #E14ECA;
    color: red;
  }
  input:focus + .slider {
    box-shadow: 0 0 1px #E14ECA;
  }
  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
  /* Rounded sliders */
  .round {
    border-radius: 2rem;
  }
  .round:before {
    border-radius: 50%;
  }
  .book-demo {
    font-size: 1.2rem;
    color: white;
    border-color: white;
    float: right;
    height: 2.5em;
    width: 40%;
    padding: 10px !important

  }
  .sliderctarow {
    margin: 0.3rem auto;
    width: 40%;
  }
  .sliderctatrial, .sliderctaadv {
    padding: 0rem;
   /* height: 5rem;*/
    border-radius: 2rem;
    text-align: center !important;
    transition: all .15s ease;
    border-color: transparent;
    cursor: pointer;
    transition: all .15s ease;
    transition: background-color .2s ease;
  }
  .sliderctatrial {
    float: left;
    background-color: #e14eca !important;
    background-image: linear-gradient(to bottom left, #e14eca, #ba54f5, #e14eca) !important;
    background-size: 210% 210% !important;
    background-position: 100% 0 !important;
    color: white !important;
  }
  .sliderctatrial:hover {
    background-color: #ba54f5;
    background-image: linear-gradient(to bottom left, #e14eca, #ba54f5, #e14eca) !important;
    transition: background-color .2s ease;
  }
  .btn-plan-select{
    float: left;
    height: 2.5em;
    width: 40%;
    font-size: 1.2rem;
    background: #1d8cf8;
  }
  .sliderctaadv {
    float: right;
    background: white;
    color: #212c3c;
    border-color: #212c3c;
    line-height: 2.3em;
  }
  .sliderctaadv:hover {
    border-color: #e14eca;
    transition: background-color .2s ease;
  }
  .nocreditcard {
    margin: 1.8rem;
    position: relative;
    font-size: 1.6em;
    display: inline-block;
    width: auto;
    color: gray;
    font-weight: 550;
  }
  .el-slider {
    border: 3px solid #212c3c;
    border-radius: 2rem;
    background: white;
    color: black;
    position: relative;
    margin: 0 auto;
  }
  .el-slider >>> .el-slider__runway {
    width: 100%;
    height: 0.5rem;
    margin: 0.3rem;
    background-color: transparent;
    border-radius: 6px;
    position: relative;
    cursor: pointer;
    vertical-align: middle;
  }
  .el-slider >>> .el-slider__bar {
    height: 1rem;
    position: relative;
    border-radius: 6px;
    background-color: rgba(25, 169, 135, 0.2);
    margin-top: -0.3rem;
  }
  .el-slider >>> .el-slider__button-wrapper {
    height: 2.6rem;
    top: -16px;
  }
  .el-slider >>> .el-slider__button-wrapper::before {
    height: 2.6rem;
    width: 2.6rem;
  }
  .el-slider >>> .el-slider__stop {
    height: 2.6rem;
    width: 0.26em;
    border-radius: 0%;
    background-color: transparent;
  }
  .el-slider >>> .el-tooltip {
    background-color: #E14ECA;
    width: 2.6rem;
    height: 2.6rem;
    position: relative;
    border: 3px solid #212c3c;
  }

  /* <SLIDER PRICING/> */

  .card-title b {
    font-size: 5em;
    color: white;
  }

/* <MOBILE/> */

  @media only screen and (min-width: 360px) and (max-width: 1024px) {
    #pricing {
    margin: 5%;
  }

    .btn-plan-select {
      width: 100%;
    }
    .sliderctarow {
      width: 80%
    }
    .nocreditcard {
      font-size: 1.2em
    }

  .pricingtoggle{
    margin-bottom: 1em;
    margin-top: 2em;
    margin-right: 10%;
    margin-left: 10%;
    width: 80%;
  }

    .card .card-body .card-category, .card .card-body .card-description {
      font-size: 1.5em
    }

    .pricing-tab-anualdisc{
      visibility: hidden;
    }
    .book-demo {
    width: 100%
    }

  }

    @media only screen and (min-width: 320px) and (max-width: 359px) {

  #pricing {
    margin: 5%;
  }

    .btn-plan-select {
      width: 100%;
    }
    .sliderctarow {
      width: 80%
    }
    .nocreditcard {
      font-size: 1.2em
    }
    .card .card-body .card-category, .card .card-body .card-description {
      font-size: 1.5em
    }
    .btn-plan-select {
      font-size: 1em
    }
    .pricing-tittle {
      font-size: 2.5em;
    }

    .pricingtoggle{
      margin-top: 0em;
    }

    .pricing-tab-anualdisc{
          visibility: hidden;

    }
    .card-title b{
      font-size: 2em;
    }

    .maxadspend b{
      font-size: 1em;
         }

    .book-demo {
      width: 100%;
      font-size: 1em
    }


    }

</style>



