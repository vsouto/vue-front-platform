<template>
  <card
    class="mb-5"
    body-classes="p-0 m-0"
  >
    <view-table-header />
    <el-table
      v-loading="loading"
      :data="tableData"
      empty-text="Nenhum painel encontrado."
    >
      <!-- Name -->
      <el-table-column
        :label="$t('common.name')"
        prop="name"
        sortable
      >
        <template slot-scope="props">
          <el-tooltip
            placement="top-start"
            content="Visualizar painel"
          >
            <router-link
              :to="{
                name: 'Panel',
                params: {
                  id: props.row.id
                }
              }"
              class="panel-link"
            >
              <finance-icon class="mr-0" />
              {{ props.row.name }}
            </router-link>
          </el-tooltip>
          <edit-button
            size="sm"
            icon
            @click.native="$emit('edit', props.row)"
          />
          <delete-button
            size="sm"
            icon="close"
            @click.native="$emit('delete', props.row)"
          />
        </template>
      </el-table-column>

      <!-- Platforms -->
      <el-table-column
        :label="$t('common.platforms')"
        prop="platforms"
      >
        <template slot-scope="props">
          <el-tooltip
            v-for="(assets, platform) in props.row.platforms"
            :key="platform"
            :content="getPlatform(platform).name"
          >
            <div
              v-if="assets.length"
              class="platform"
            >
              <img
                :src="getPlatform(platform).icon"
                height="30"
              >
              <badge
                v-if="assets.length"
                type="default"
                class="badge"
              >
                {{ assets.length }}
              </badge>
            </div>
          </el-tooltip>
        </template>
      </el-table-column>

      <!-- Widgets -->
      <el-table-column
        prop="widgets"
        label="Widgets"
      >
        <template slot-scope="props">
          {{ props.row.widgets.length }}
        </template>
      </el-table-column>
    </el-table>
    <view-table-footer
      :can-paginate="tableData.length > 5"
      :total="tableData.length"
    />
  </card>
</template>

<script>
import ViewTableHeader from "@/components/shared/ViewTableHeader"
import ViewTableFooter from "@/components/shared/ViewTableFooter"
import { all_platforms } from "@/platforms"

// Icons
import FinanceIcon from "icons/Finance.vue"

export default {
  name: "PanelsTable",
  components: {
    FinanceIcon,
    ViewTableHeader,
    ViewTableFooter
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    panels: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      platforms: all_platforms,
    }
  },
  computed: {
    tableData() {
      return this.panels || []
    }
  },
  methods: {
    setPanelToEdit(row) {
      this.$emit("setPanelToEdit", row)
    },
    getPlatform(id) {
      return this.platforms.filter(p => p.id == id)[0] || {}
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-link {
  font-size: 1.2em
}

.platform {
  display: inline-block;
  position: relative;
  padding-right: 1rem;
  img {
    display: block;
    padding-top: 0.2rem;
  }
  .badge {
    position: absolute;
    top: 0;
    right: .5rem;
    line-height: 10px;
    margin: 0;
    padding: 0.1rem 0.3rem;
  }
}
</style>