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
        class="column-toggle"
        @click="toggleDropDown"
      >
        <tune-icon
          class="icon-2x text-primary tune-icon"
        />
        {{ $t("tables.columns") }}
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
                  {{ $t("tables.customize_columns") }}
                </h3>
              </div>
              <div class="card-body">
                <form
                  class="form-horizontal"
                  @submit.prevent="submit"
                >
                  <el-tree
                    :data="treeData"
                    node-key="id"
                    :default-checked-keys="selectedData"
                    :allow-drop="allowDrop"
                    :allow-drag="allowDrag"
                    show-checkbox
                    @check-change="handleCheckChange"
                  />
                  <div class="text-center">
                    <button
                      class="btn btn-primary"
                      type="submit"
                    >
                      {{ $t("common.save") }}
                    </button>
                    <!-- <button
                      type="reset"
                      class="btn btn-simple btn-facebook"
                    >
                      {{ $t("common.reset") }}
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

import TuneIcon from "icons/Tune"
import Columns from "@/plugins/tables/columns"
import { Tree } from "element-ui"

export default {
  name: "PlatformColumnConfig",
  components: {
    TuneIcon,
    "el-tree": Tree
  },
  props: {
    platform: {
      type: Object,
      required: true,
    },
    viewId: {
      type: String,
      required: true,
    },
    columns: {
      type: Array,
      required: true
    },
    selected: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isOpen: false,
      columnModel: new Columns(this.columns, this.selected),
      treeData: [],
      selectedData: []
    }
  },
  created() {
    this.setTreeData()
  },
  methods: {
    submit() {
      this.setTreeData()
    },
    setTreeData() {
      this.treeData = this.columnModel.getTreeData()
      this.selectedData = this.columnModel.selectedProps
      this.$emit("onSetColumns", this.columnModel.getSelected())
      this.closeDropDown()
    },
    toggleDropDown() {
      this.isOpen = !this.isOpen
    },
    closeDropDown() {
      this.isOpen = false
    },
    allowDrop() {
      // TODO: draggable, set order of columns
      return true
    },
    allowDrag() {
      // TODO: draggable, set order of columns
      return true
    },
    handleCheckChange(data, checked) {
      if (checked)
        this.columnModel.select(data.id)
      else
        this.columnModel.unselect(data.id)
    }
  }
}
</script>

<style scoped lang="scss">
  .card-category{
    font-size: .85em !important
  }

  .column-toggle {
    display: inline-block;
    background: #1e1e28;
    padding: 0.7em 0.7em 0.3em;
    margin-right: 1em;
    cursor: pointer;
    &:hover {
      border: 1px solid $primary
    }
    .tune-icon {
      width: 1.5em;
      height: 1.5em;
      vertical-align: sub;
    }
  }
</style>
