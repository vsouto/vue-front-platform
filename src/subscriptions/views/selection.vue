<template>
  <div>
    <div v-if="plans">
      <el-row class="mb-0 mt-0">
        <el-col>
          <h1 class="title text-center mb-1">
            {{ $t("subscription.title") }}
          </h1>
          <h4 class="description text-center">
            {{ $t("subscription.description") }}
          </h4>
        </el-col>
      </el-row>
      <el-row class="text-center mb-5 mt-3">
        <el-col>
          <el-switch
            v-model="annualPlan"
            active-text="Recorrência anual (2 meses grátis)"
            inactive-text="Recorrência mensal"
          />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col
          v-for="plan of selectedPlans"
          :key="plan.code"
          :lg="6"
          :md="6"
          :sm="24"
          :xs="24"
          class="mb-3"
        >
          <card
            :class="plan.class"
            type="pricing"
            footer-classes="text-center mb-3 mt-3"
          >
            <h1 class="card-title">
              {{ plan.title }}
            </h1>
            <img
              :src="`/img/card-${plan.image}.png`"
              class="card-img"
            >
            <ul class="list-group">
              <li class="list-group-item">
                <account-group-icon /> {{ plan.users }} {{ plan.usersText }}
              </li>
              <li class="list-group-item">
                <monitor-dashboard-icon /> {{ plan.panels }} {{ plan.panelsText }}
              </li>
              <li class="list-group-item">
                <account-box-multiple-icon /> {{ plan.accounts }} {{ plan.accountsText }}
              </li>
              <li class="list-group-item">
                <history-icon /> {{ plan.history }}
              </li>
              <li class="list-group-item">
                <settings-outline-icon /> {{ plan.management }}
              </li>
              <li class="list-group-item">
                <progress-clock-icon /> {{ plan.realTime }}
              </li>
              <li class="list-group-item">
                <br>
              </li>
            </ul>
            <div class="card-prices">
              <h3 class="text-on-front">
                <span>R$</span>{{ plan.price }}
              </h3>
              <h5 class="text-on-back">
                {{ plan.price }}
              </h5>
              <p class="plan">
                {{ plan.description }}
              </p>
            </div>
            <base-button
              slot="footer"
              :type="plan.class"
              round
              class="btn-just-icon"
              @click.native="openBilling(plan)"
            >
              {{ trialText }}
            </base-button>
          </card>
        </el-col>
      </el-row>
    </div>
    <div v-else>
      <h3>Ops! Nenhum plano encontrado.</h3>
      <p>Lamentamos o ocorrido. Houve um erro ao buscar os planos disponíveis.</p>
    </div>
  </div>
</template>

<script>
import { Switch } from "element-ui"

// Icons
import MonitorDashboardIcon from "icons/MonitorDashboard.vue"
import AccountGroupIcon from "icons/AccountGroup.vue"
import HistoryIcon from "icons/History.vue"
import SettingsOutlineIcon from "icons/SettingsOutline.vue"
import ProgressClockIcon from "icons/ProgressClock.vue"
import AccountBoxMultipleIcon from "icons/AccountBoxMultiple.vue"
export default {
  name: "Selection",
  components: {
    HistoryIcon,
    SettingsOutlineIcon,
    ProgressClockIcon,
    AccountGroupIcon,
    MonitorDashboardIcon,
    AccountBoxMultipleIcon,
    "el-switch": Switch
  },
  props: {
    plans: {
      type: Array,
      required: true
    },
    trialText: {
      type: String,
      required: true
    },
    openBilling: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      annualPlan: false
    }
  },
  computed: {
    selectedPlans() {
      return this.annualPlan? this.annualPlans : this.monthlyPlans
    },
    monthlyPlans() {

      var plans = this.plans

      return plans.filter(function(obj) {

        return obj.type() === "Mensal"
        //return obj['9d9d740413b42291707c740efc4616f871d241c2'] == '103';
      })
    },
    annualPlans() {

      var plans = this.plans

      return plans.filter(function(obj) {

        return obj.type() === "Anual"
        //return obj['9d9d740413b42291707c740efc4616f871d241c2'] == '104';
      })
    }
  }
}
</script>

