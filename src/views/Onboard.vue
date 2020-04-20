<template>
  <div
    class="animated fadeIn home-painel"
  >
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="5">
          <h1 class="text-center text-success">
            1
          </h1>
        </b-col>
        <b-col cols="1" />
        <b-col cols="5">
          <h1 class="text-center text-success">
            2
          </h1>
        </b-col>
      </b-row>
      <b-row>
        <b-col
          cols="5"
          class="shadow-lg p-2 mb-2 rounded text-center"
          :class="getStepClass('1')"
        >
          <img
            src="img/platforms/integrate-step-1.png"
            class="home-step-img"
          >
        </b-col>
        <b-col
          cols="1"
        />
        <b-col
          cols="5"
          class="shadow-lg p-2 mb-2 rounded text-center"
          :class="getStepClass('2')"
        >
          <img
            src="img/platforms/integrate-step-2.png"
            class="home-step-img"
          >
        </b-col>
      </b-row>
      <b-row>
        <b-col
          cols="5"
          class="text-center"
          :class="getStepClass('1')"
        >
          <h3>Integre suas plataformas</h3>
          <p>
            Conecte suas ferramentas de marketing de forma simples e rápida
          </p>
          <router-link
            v-if="currentStep==='1'"
            :to="{name: 'Integration'}"
          >
            <button
              class="btn btn-round btn-primary btn-lg"
            >
              Integrar
            </button>
          </router-link>
          <completed-icon
            v-else
            class="btn-step-completed"
            :size="70"
          />
        </b-col>
        <b-col
          cols="1"
        />
        <b-col
          cols="5"
          :class="getStepClass('2')"
          class="text-center"
        >
          <h3>Crie seu Painel</h3>
          <p>Selecione suas plataformas e organize as informações em painéis personalizados</p>
          <router-link
            v-if="currentStep==='2'"
            :to="{name: 'PanelCreate'}"
          >
            <button
              class="btn btn-round btn-primary btn-lg"
            >
              Criar
            </button>
          </router-link>
        </b-col>
      </b-row>
      <b-row>
        <b-col
          class="text-center"
          cols="5"
        />
        <b-col
          cols="1"
        />
        <b-col
          class="text-center"
          cols="5"
        />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CheckCircleOutlineIcon from "icons/CheckCircleOutline"
import PlatformsStatusMixin from "@/components/shared/mixins/PlatformsStatusMixin"

export default {
  name: "Onboard",
  components: {
    "completed-icon": CheckCircleOutlineIcon
  },
  mixins: [
    PlatformsStatusMixin
  ],
  data() {
    return {
      userHavePanels: false
    }
  },
  computed: {
    currentStep() {

      if (this.noPlatforms)
        return "1"

      if (this.noPanels)
        return "2"

      return "3"
    },
    userName() {
      return this.$store.getters["account/userName"]
    },
    panels() {
      return this.$store.getters["panel/getPanels"]
    },
    noPanels() {
      return this.panels.length == 0
    },
    noPlatforms() {
      return this.activeAccounts.length == 0
    }
  },
  methods: {
    getStepClass(step) {

      // Step 1 never gets faded
      if (step != this.currentStep && step != "1")
        return "bg-faded"
    }
  }
}
</script>

<style scoped>
  .home-painel{
    margin-top: 6%;
  }

  .home-step-img{
    width:320px
  }
  .bg-faded{
    background-color: #1a1b25;
    -webkit-filter: blur(4px);
    -moz-filter: blur(4px);
    -o-filter: blur(4px);
    -ms-filter: blur(4px);
    filter: blur(4px);
    opacity: 0.61;
  }

  .btn-step-completed{
    color: #00f2c3;
    border-color: #00f2c3;
    background: transparent;
    margin: 20px;
  }

  .material-design-icon>.material-design-icon__svg{
    width: 4em !important;
  }
</style>
