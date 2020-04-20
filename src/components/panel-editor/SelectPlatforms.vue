<template>
  <div class="select-platforms header-wizard-tab-platforms">
    <base-button
      type="primary"
      link
      simple
      block
      @click.native="openModal()"
    >
      <tab-label
        :label="'common.platforms'"
        :icon="icon"
        :active="model.enabledPlatforms.length>0"
      />
    </base-button>
    <sweet-modal
      ref="modal"
      overlay-theme="dark"
      modal-theme="dark"
      width="100%"
      @open="onModalOpen"
      @close="onModalClose"
    >
      <!-- Modal Title -->
      <div
        slot="title"
        class="sweet-title"
      >
        <h2>{{ $t("panel_editor.selectPlatforms") }}</h2>
      </div>

      <tabs
        type="primary"
        tab-nav-wrapper-classes="select-platform-tabs"
        tab-content-classes="select-platform-content"
        vertical
        square
        class="select-platform-container"
      >
        <tab-pane
          v-for="platform in platforms"
          :key="platform.id+key"
        >
          <span
            slot="label"
          >
            <img
              :src="platform.icon"
              :height="22"
              :class="{
                'platform-inactive' : !selected[platform.id] || selected[platform.id] == 0
              }"
            >
            {{ platform.name }}
          </span>
          <div
            class="platform-assets"
          >
            <div
              v-if="isPlatformInactive(platform)"
            >
              Plataforma não configurada
            </div>
            <data-tables
              v-else
              :ref="`${platform.id}_table`"
              v-loading="$store.getters['isFetching'](`${platform.module}/accounts`)"
              :data="availableAssets[platform.id]"
              :table-props="{
                'row-key': (row) => row._id,
                lazy: true,
                load: fetchChildren,
                'tree-props': {children: 'children', hasChildren: 'hasChildren'},
                'select-on-indeterminate': false
              }"
              :current-page="1"
              :page-size="25"
              :pagination-props="{ background: true, pageSizes: [25] }"
              @selection-change="handleChange(platform.id, $event)"
              @row-click="toggleSelection"
            >
              <el-table-column
                type="selection"
                width="55"
              />
              <el-table-column
                column-key="id"
                prop="id"
                label="ID"
                :show-overflow-tooltip="true"
                reserve-selection
              >
                <template slot-scope="props">
                  <badge
                    type="default"
                  >
                    {{ props.row.type }}
                  </badge>
                  {{ props.row.id }}
                </template>
              </el-table-column>

              <el-table-column
                column-key="name"
                prop="name"
                :label="$t('common.name')"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="props">
                  {{ props.row.name }}
                </template>
              </el-table-column>
            </data-tables>
            <div class="actions">
              <base-button
                slot="button"
                type="success"
                @click.native="$refs.modal.close()"
              >
                OK
              </base-button>
              <base-button
                type="info"
                simple
                @click.native="selectAll(platform.id)"
              >
                {{ $t("panel_editor.selectAll") }}
              </base-button>
              <base-button
                type="warning"
                simple
                @click.native="clearSelection(platform.id)"
              >
                {{ $t("panel_editor.removeAll") }}
              </base-button>
            </div>
          </div>
        </tab-pane>
      </tabs>
    </sweet-modal>
    <div class="enabled-platforms">
      <span
        v-for="platform in model.enabledPlatforms"
        :key="platform.id"
        class="enabled-platform-item"
      >
        <img
          :src="platform.icon"
          :height="16"
        >
        <badge
          v-if="model.platforms[platform.id].length"
          type="default"
          class="enabled-platform-item-badge"
        >
          {{ model.platforms[platform.id].length }}
        </badge>
      </span>
    </div>
    <el-tooltip
      :content="$t('panel.tooltip_panel_platforms')"
      class="item"
      effect="dark"
      placement="top-start"
    >
      <alert-icon
        v-if="model.enabledPlatforms.length<=0"
        class="icon-2x panel-header-alert-icon"
        style="vertical-align: sub"
      />
    </el-tooltip>
  </div>
</template>
<script>
import AlertIcon from "icons/Alert"
import { SweetModal } from "sweet-modal-vue"
import { TabPane, Tabs } from "src/components/lib"
import { all_platforms } from "@/platforms"
import PanelModel from "@/models/panel"
import PlatformsStatusMixin from "@/components/shared/mixins/PlatformsStatusMixin"
import TabLabel from "@/components/panel-editor/TabLabel"

export default {
  components: {
    AlertIcon,
    SweetModal,
    TabPane,
    Tabs,
    TabLabel
  },
  mixins: [
    PlatformsStatusMixin
  ],
  props: {
    model: {
      type: PanelModel,
      required: true,
    },
  },
  data() {
    this.platforms = all_platforms
    return {
      key: 0,
      selected: {}
    }
  },
  computed: {
    availableAssets() {
      let platforms_assets = {}
      this.platforms.map(platform => {
        platforms_assets[platform.id] = this.$store.getters[`${platform.module}/getAccounts`].map(a => {
          return {...a, hasChildren: true}
        })
      })
      return platforms_assets
    },
    icon() {
      return "icon-puzzle-10"
    }
  },
  created() {
    this.setSelected()
  },
  beforeDestroy() {
    this.$sidebar.autoZIndex = false
  },
  methods: {
    openModal() {
      this.initializeSelection()
      this.$refs.modal.open()
    },
    onModalOpen() {
      this.$sidebar.autoZIndex = true
      this.$emit("open")
    },
    onModalClose() {
      this.configurePlatform = null
      this.$sidebar.autoZIndex = false
      this.updateKeysToForceRerender()
      this.$emit("close")
    },
    toggleSelection(row) {
      const platform = row.platform
      const tableRef = `${platform}_table`
      this.$refs[tableRef][0].$refs.elTable.toggleRowSelection(row)
    },
    handleChange(platform, assets) {
      this.model.updatePlatformAssets({
        id: platform,
        assets: assets.map(asset => asset._id)
      })
      this.setSelected()
      this.model.removeDisabledWidgets()
    },
    selectRow(row) {
      const platform = row.platform
      const tableRef = `${platform}_table`
      this.$refs[tableRef] && this.$refs[tableRef][0].toggleRowSelection(row, true)
    },
    fetchChildren(treeNode, tree, resolve) {
      const platformModule = all_platforms.find(p => p.id == treeNode.platform).module
      this.$store.dispatch(`${platformModule}/fetchPanelOptions`, treeNode.account_id)
        .then(data => {
          let children = data
          resolve(children)
        })
    },
    setSelected() {
      let selected_assets = {}
      for (let platform in this.model.platforms) {
        selected_assets[platform] = this.model.platforms[platform]
      }
      this.selected = selected_assets
    },
    initializeSelection() {
      for (let platformId in this.availableAssets) {
        const tableRef = `${platformId}_table`
        if (!this.$refs[tableRef] || !this.$refs[tableRef].length) continue
        const available = Object.freeze(this.availableAssets[platformId] || []),
          selected = Object.freeze(this.model.platforms[platformId] || [])
        available.map(row => {
          if (selected.includes(row._id))
            this.$refs[tableRef][0].$refs.elTable.toggleRowSelection(row, true)
        })
      }
    },
    selectAll(platformId) {
      const tableRef = `${platformId}_table`
      if (!this.$refs[tableRef] || !this.$refs[tableRef].length) return
      this.$refs[tableRef][0].$refs.elTable.clearSelection()
      this.$refs[tableRef][0].$refs.elTable.toggleAllSelection()
    },
    clearSelection(platformId) {
      const tableRef = `${platformId}_table`
      if (!this.$refs[tableRef] || !this.$refs[tableRef].length) return
      this.$refs[tableRef][0].$refs.elTable.clearSelection()
    },
    updateKeysToForceRerender() {
      this.key += 1
    }
  }
}
</script>

<style lang="scss" scoped>
  .sweet-modal-overlay {
    /deep/ .sweet-buttons {
      text-align: center
    }
    /deep/ .sweet-content-content {
      height: 100vh;
    }
    /deep/ .sweet-title {
      h2 {
        margin: 1rem 0
      }
    }
  }
  .sweet-modal /deep/ .sweet-content {
    padding-top: 0;
    padding-bottom: 0
  }
  .select-platforms {
    color: $white;
    .config-title {
      font-size: 1rem
    }
    .platforms-container {
      display: flex;
      flex-flow: row wrap;
      .platform-item {
        flex: 0 1 12rem;
        margin: 0 0.5rem;
        .btn {
          padding: 0.5rem;
          justify-content: space-between;
          img {
            padding-right: 0.5rem
          }
          /deep/ .not-visible {
            visibility: hidden
          }
        }
      }
    }
  }
  /deep/ .select-platform-container {
    display: flex;
    flex-flow: row nowrap;

    .select-platform-tabs {
      flex: 0 1 15rem;
      margin-right: 1rem;
    }

    .select-platform-content {
      flex: 1 1 100%;
      // .tab-pane {
      //   .el-table {

      //   }
      // }
    }
  }
  .el-table {
    /deep/ .el-table__row {
      cursor: pointer;
      &--level-1 {
        display: inline-table;
        left: 1rem;
      }
    }
  }

  .panel-header-alert-icon{
    position: absolute;
    top: 8%;
    right: 1%;
    color: $yellow;
  }

  .enabled-platforms{
    position: absolute;
    left: 0%;
    bottom: 9%;
  }

  .badge{
    line-height: 5px;
    border: none;
    margin-bottom: 5px;
  }
</style>
