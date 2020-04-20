<template>
  <card
    class="card-plain"
  >
    <h3
      slot="header"
    >
      <img
        :src="platform.icon"
        :height="25"
      >
      {{ platform.name }}
    </h3>
    <loading
      v-if="options == null"
      :title="loadingAssetsMessage"
    />
    <message-notification
      v-else-if="options.length == 0"
      :title="$t('panel_editor.noAssetsTitle')"
      waiting
      warning
    >
      <p class="white">
        {{ noAssetsMessage }}
      </p>
      <base-button
        type="primary"
        @click.native="$router.push({ name: platform.view.name })"
      >
        Configurar agora
      </base-button>
    </message-notification>
    <div v-else>
      <el-input
        v-model="filterText"
        placeholder="Filtrar"
      />
      <el-tree
        ref="tree"
        class="filter-tree"
        node-key="id"
        :data="options"
        :props="treeProps"
        :load="loadNode"
        :filter-node-method="filterNode"
        :check-on-click-node="true"
        :expand-on-click-node="false"
        :default-checked-keys="assets"
        :check-strictly="true"
        lazy
        show-checkbox
        @check-change="handleNodeChange"
        @check="handleChange"
      >
        <span
          slot-scope="{ node, data }"
          class="custom-tree-node"
        >
          <span>{{ data.name }} <small>({{ data.id }})</small></span>
          <span>
            <!-- <el-button
              type="text"
              size="mini"
              @click="() => append(data)"
            >
              Append
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => remove(node, data)"
            >
              Delete
            </el-button> -->
          </span>
        </span>
      </el-tree>
    </div>
  </card>
</template>
<script>
import { Input, Tree } from "element-ui"
import MessageNotification from "@/components/shared/MessageNotification"
import PlatformModel from "@/models/platform"

export default {
  components: {
    MessageNotification,
    "el-input": Input,
    "el-tree": Tree,
  },
  props: {
    assets: {
      type: Array,
      required: true
    },
    platform: {
      type: PlatformModel,
      required: true
    }
  },
  data() {
    return {
      options: null,
      filterText: "",
      treeProps: {
        label: "name",
        children: "children",
        isLeaf: true
      },
    }
  },
  computed: {
    loadingAssetsMessage() {
      return this.$t(`${this.platform.id}.loading_assets`)
    },
    noAssetsMessage() {
      return this.$t(`${this.platform.id}.no_assets`)
    },
    platformAssets: {
      get() { return this.assets },
      set(newAssets) {
        this.$emit("updatePlatformAssets", {
          id: this.platform.id,
          assets: newAssets
        })
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.$store.watch(
      state => state[this.platform.module].options,
      (newOptions) => {
        this.options = newOptions
      }
    )
    this.options = this.$store.state[this.platform.module].options
    if (!this.options)
      this.fetchPlatformOptions(this.platform.module)
  },
  methods: {
    fetchPlatformOptions(platformModule) {
      this.$store.dispatch(`${platformModule}/fetchPanelOptions`)
    },
    fetchOptionChildren(platformModule, accountId) {
      return this.$store.dispatch(`${platformModule}/fetchPanelOptions`, accountId)
    },
    filterMethod(query, item) {
      if (query == "" || !query)
        return true
      return item.name.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1
    },
    loadNode(node, resolve) {
      if (node.level === 0) return resolve(this.options)
      if (node.level > 1) return resolve([])

      this.fetchOptionChildren(this.platform.module, node.data.id)
        .then(data => {
          let children = data.map(d => {
            return {...d, leaf: true}
          })
          resolve(children)
        })
    },
    filterNode(value, data) {
      if (!value) return true
      // let parentName = node.parent.data.name
      let name = data.name
      // node.parent.data.name.indexOf(value) !== -1
      return name.indexOf(value) !== -1
    },
    handleNodeChange(node, selected) {
      let checkedNodes = this.$refs.tree.getCheckedNodes()
      if (!node.leaf && selected)
        checkedNodes.map(n => {
          if (n.leaf && n.account_id == node.account_id)
            this.$refs.tree.setChecked(n.id, false)
        })
      else if (node.leaf && selected)
        checkedNodes.map(n => {
          if (!n.leaf && n.account_id == node.account_id)
            this.$refs.tree.setChecked(n.id, false)
        })
    },
    handleChange(node, treeStatus) {
      this.platformAssets = treeStatus.checkedKeys
    }
  }
}
</script>

<style lang="scss" scoped>
.select-primary {
  width: 100% !important;
  margin-bottom: 10px
}

.el-input {
  margin-bottom: 1rem;

  input {
    background: transparent;
    border: 1px solid #303133;
    color: white
  }
}

.el-tree {
  background: transparent;
  color: $white;
  /deep/ .el-tree-node__content {
    background: transparent;
  }
  /deep/ .el-tree-node__content:hover {
    color: $info
  }
  > .el-tree-node__content {
    margin: 0.5em 0
  }
  .el-tree-node__label {
    font-size: 1.2em;
  }
  /deep/ .el-tree-node__children {
    /deep/ .el-tree-node__content {
      margin: 0
    }
    /deep/ .el-tree-node__label {
      font-size: 0.9em
    }
  }
}

// .el-transfer /deep/ .el-transfer-panel {
//   width: 300px !important;
//   background: transparent;
//   color: $white
// }

// .el-transfer /deep/ .el-transfer-panel__header {
//   background: transparent;
//   padding-left: 0
// }
// .el-transfer /deep/ .el-checkbox__input {
//   position: absolute;
//   top: 8px;
//   left: 8px;
// }
// .el-transfer /deep/ .el-checkbox__label {
//     padding-left: 12px !important;
//     text-align: left;
// }
// .el-transfer /deep/ .el-checkbox {
//   text-align: left;
//   padding-left: 15px
// }
// .el-transfer /deep/ .el-transfer-panel__header .el-checkbox__input {
//   top: 12px
// }
// .el-transfer /deep/ .el-transfer__button {
//   background-color: #e14eca
// }
// .el-transfer /deep/ .el-button--primary {
//   background-color: #e14eca;
//   border-color: #e14eca
// }
// .el-transfer /deep/ .el-button--primary.is-disabled {
//   background-color: #222a42;
//   border-color: #222a42;
// }
// .el-transfer /deep/ .el-checkbox__label {
//   color: $white !important
// }
// .el-transfer /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
//   background-color: $primary;
//   border-color: $primary;
// }
// .el-transfer /deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner {
//   background-color: $primary;
//   border-color: $primary;
// }
</style>
