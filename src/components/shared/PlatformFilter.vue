<template>
  <div
    v-click-outside="closeDropDown"
  >
    <div
      :class="{ show: isOpen }"
      class="dropdown show-dropdown"
    >
      <a
        data-toggle="dropdown"
        class="filter-toggle"
        @click="toggleDropDown"
      >
        <filter-icon
          class="icon-2x text-primary filter-icon"
        />
        {{ $t("common.filters") }}
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
                      :key="filter.field"
                      class=""
                    >
                      <component
                        :is="filter"
                        @filter_input="setFilter(
                          filter.field, $event.target? $event.target.value : $event
                        )"
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
                    <!-- <button
                      type="reset"
                      class="btn btn-simple btn-facebook"
                    >
                      Resetar Filtros
                    </button> -->
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
import Vuelidate from "vuelidate"
Vue.use(Vuelidate)

import FilterIcon from "icons/Filter"
import Filters from "@/plugins/filters/Filters"

export default {
  name: "PlatformsFilters",
  components: {
    FilterIcon
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
      filterModel: new Filters(this.filters),
    }
  },
  computed: {
    form() {
      return this.filterModel.getFormObject()
    }
  },
  created() {
    this.doFilter()
  },
  methods: {
    setFilter(field, value) {
      this.filterModel.setFilterValue(field, value)
    },
    submit() {
      this.doFilter()
    },
    doFilter() {
      this.$emit("filter", this.form)
      this.closeDropDown()
    },
    toggleDropDown() {
      this.isOpen = !this.isOpen
    },
    closeDropDown() {
      this.isOpen = false
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

  .filter-toggle {
    display: inline-block;
    background: #1e1e28;
    padding: 0.7em 0.7em 0.3em;
    margin-right: 1em;
    cursor: pointer;
    &:hover {
      border: 1px solid $primary
    }
    .filter-icon {
      width: 1.5em;
      height: 1.5em;
    }
  }
</style>
