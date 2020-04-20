<template>
  <div class="animated fadeIn">
    <div id="Home">
      <el-row class="mb-3">
        <el-col>
          <h1
            class="mb-0 text-center"
          >
            Oi {{ userName }}!
          </h1>
          <p class="lead text-center">
            Selecione uma plataforma abaixo para configurar.
          </p>
        </el-col>
      </el-row>
      <el-row
        :gutter="20"
        class="d-flex flex-wrap"
      >
        <el-col
          v-for="p of platforms"
          :key="p.id"
          :lg="8"
          :md="8"
          :sm="24"
          :xs="24"
          class="col-12 col-sm-6 col-md-4"
        >
          <card>
            <h2 slot="header">
              <img
                :src="p.icon"
                :alt="`configurar ${p.name}`"
                :height="30"
              >
              {{ p.name }}
              <el-tooltip
                v-if="p.type == 'spend'"
                :content="`Plataforma de Investimento`"
                class="pull-right"
                effect="dark"
                placement="top-start"
              >
                <transfer-right-icon />
              </el-tooltip>
              <el-tooltip
                v-if="p.type == 'earn'"
                :content="`Plataforma de Receita`"
                class="pull-right"
                effect="dark"
                placement="top-start"
              >
                <transfer-left-icon />
              </el-tooltip>
            </h2>
            <base-button
              type="primary"
              :class="p.id"
              @click.native="$router.push({ path: p.home })"
            >
              Configurar
            </base-button>
          </card>
        </el-col>
      </el-row>
    </div>

    <v-tour
      :name="tourName"
      :steps="steps"
      :callbacks="tourCallbacks"
    />
  </div>
</template>

<script>
import { all_platforms } from "@/platforms"

// Icons
import TransferLeftIcon from "icons/TransferLeft.vue"
import TransferRightIcon from "icons/TransferRight.vue"

import TourMixin from "@/components/shared/mixins/TourMixin"

export default {
  name: "Home",
  components: {
    TransferLeftIcon,
    TransferRightIcon
  },
  mixins: [
    TourMixin
  ],
  data() {
    return {
      tourName: "home",
      hover: false,
      loadingBtn: false,
      platforms: all_platforms,
      steps: [
        {
          target: ".google_adwords",
          content: "<b>Olá, seja bem-vindo ao Painel!</b><br>O primeiro passo é integrar suas plataformas." +
            "<br>Para isso, clique no botão <b>(Configurar)</b> correspondente a plataforma que você deseja integrar",
          params:{
            placement: "bottom",
          }
        }
      ]
    }
  },
  computed: {
    userName() {
      return this.$store.getters["account/userName"]
    }
  }
}
</script>
