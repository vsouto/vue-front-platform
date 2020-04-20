<template>
  <div
    v-click-outside="closeDropDown"
    class="fixed-plugin"
  >
    <div
      :class="{ show: isOpen }"
      class="dropdown show-dropdown"
    >
      <a
        data-toggle="dropdown"
        class="settings-icon"
      >
        <i
          class="fa fa-cog fa-2x"
          @click="toggleDropDown"
        />
      </a>
      <div
        :class="{ show: isOpen }"
        class="dropdown-menu"
      >
        <div class="container">
          <div class="row">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">
                  Filtros
                </h3>
              </div>
              <div class="card-body">
                <form
                  class="form-horizontal"
                  @submit.prevent="submit"
                >
                  <div>
                    <div
                      v-for="filter in filters"
                      :key="filter"
                      class=""
                    >
                      <component
                        :is="getFilterName(filter)"
                        @filter_input="registerFormValue(
                          getFilterField(filter),$event.target? $event.target.value : $event)"
                      />
                    </div>
                  </div>
                  <div class="text-center">
                    <button
                      class="btn btn-primary"
                      type="submit"
                    >
                      Filtrar
                    </button>
                    <button
                      type="reset"
                      class="btn btn-simple btn-facebook"
                    >
                      Resetar Filtros
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue"

import ObjectivesFilter from "@/plugins/filters/views/ObjectivesFilter"
import SpendFilter from "@/plugins/filters/views/SpendFilter"
import BidStrategyFilter from "@/plugins/filters/views/BidStrategyFilter"
import StatusFilter from "@/plugins/filters/views/StatusFilter"
import ImpressionsFilter from "@/plugins/filters/views/ImpressionsFilter"
import FrequencyFilter from "@/plugins/filters/views/FrequencyFilter"
import DateFilter from "@/plugins/filters/views/DateFilter"
import SegmentFilter from "@/plugins/filters/views/SegmentFilter"
import QualityFilter from "@/plugins/filters/views/QualityFilter"
import PacingFilter from "@/plugins/filters/views/PacingFilter"
import PixelFilter from "@/plugins/filters/views/PixelFilter"
import BalanceFilter from "@/plugins/filters/views/BalanceFilter"
import TargetFilter from "@/plugins/filters/views/TargetFilter"
import IssuesFilter from "@/plugins/filters/views/IssuesFilter"
import AccStatusFilter from "@/plugins/filters/views/AccStatusFilter"

import {
  numeric
} from "vuelidate/lib/validators"

import Vuelidate from "vuelidate"
Vue.use(Vuelidate)

export default {
  name: "PlatformsFilters",
  components: {
    ObjectivesFilter,
    SpendFilter,
    BidStrategyFilter,
    StatusFilter,
    ImpressionsFilter,
    FrequencyFilter,
    SegmentFilter,
    DateFilter,
    QualityFilter,
    PacingFilter,
    PixelFilter,
    BalanceFilter,
    TargetFilter,
    IssuesFilter,
    AccStatusFilter
  },
  props: {
    platform: {
      type: Object,
      required: true,
      default: function () {
      }
    },
    filters: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isOpen: false,
      form: false,
      available_filters: false,
    }
  },
  computed: {
    allFilters() {
      return this.platform.filters
    }
  },
  created() {
    this.form = this.platform.filters
    this.available_filters = this.platform.filters.available_filters
    this.$emit("filter", this.form)
  },
  methods: {
    registerFormValue(field, value) {
      this.form[field] = value
    },
    getFilterName(filter){
      let filter_item = this.available_filters.find(item => item.name === filter)

      return filter_item? filter_item.filter : ""
    },
    getFilterDefaultValue(filter){
      let filter_item = this.available_filters.find(item => item.name === filter)

      return filter_item? filter_item.value : ""
    },
    getFilterField(filter){
      let filter_item = this.available_filters.find(item => item.name === filter)
      return filter_item? filter_item.field : ""
    },
    submit() {

      this.$v.$touch()
      if (this.$v.$invalid || this.form.noFilterSelected() )
        this.$notify({
          type: "warning",
          horizontalAlign: "right",
          verticalAlign: "bottom",
          icon: "tim-icons icon-bell-55",
          message: "Ops! Você deve definir ao menos um filtro!",
          timeout: 10000,
          overlap: true
        })
      else
        this.$emit("filter", this.form)
    },
    toggleDropDown() {
      this.isOpen = !this.isOpen
    },
    closeDropDown() {
      this.isOpen = false
    }
  },
  validations: {
    form: {
      impressions: {
        numeric,
        required: false
      },
      frequency: {
        numeric,
        required: false
      },
      date_start: {
        required: false
      },
      objectives: {
        required: false
      },
      bid_strategy: {
        required: false
      },
      spend: {
        required: false
      },
      status: {
        required: false
      },
      segment: {
        required: false
      },
      target: {
        required: false
      },
      quality: {
        required: false
      },
      pixel: {
        required: false
      },
      effective_status: {
        required: false
      },
      balance: {
        required: false
      },
      pacing: {
        required: false
      },
      acc_status: {
        required: false
      },
    }
  }
}
</script>

<style>
  .form-select option{
    background-color: #2b3553;
  }
</style>

<style scoped lang="scss">

  .settings-icon {
    cursor: pointer
  }

  .badge-vue {
    background-color: $vue
  }

  .fixed-plugin .dropdown-menu {
    width: 780px !important
  }

  .fixed-plugin .dropdown-menu li {
    min-width: 100%
  }

  .card-category{
    font-size: .85em !important
  }
</style>
