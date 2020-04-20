<template>
  <card card-body-classes="table-full-width">
    <view-table-header
      :element="$el"
      :title="$t('google_analytics.views')"
      :can-search="canSearch"
      :search-query="searchQuery"
      @update-search-query="searchQuery=$event"
    />
    <loading v-if="!isReady" />
    <el-table
      v-else
      :data="queriedData"
    >
      <!-- table columns -->
      <el-table-column
        v-for="column in tableColumns"
        :key="column.label"
        :min-width="column.minWidth"
        :prop="column.prop"
        :label="column.label"
        :sortable="column.sortable"
        :formatter="column.formatter"
      />

      <!-- Actions -->
      <el-table-column
        key="actions"
        :label="$t('common.actions')"
        min-width="100"
        prop="actions"
      >
        <template slot-scope="scope">
          <base-switch
            v-if="!isViewSelected(scope.row.id)"
            v-model="viewSwitches[scope.row.id]"
            @input="selectView(scope.row, $event)"
          />
          <el-tooltip
            v-else
            :content="$t('common.view_integrated')"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <base-switch :value="true" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <view-table-footer
      :can-paginate="isReady && tableData && tableData.length > pagination.perPage"
      :searched-data="searchedData"
      :total="total"
      :pagination="pagination"
      :from="from"
      :to="to"
    />
  </card>
</template>

<script>
// Mixins
import TableMixin from "@/components/shared/mixins/TableMixin"
import FormattersMixin from "@/components/shared/mixins/FormattersMixin"

import { BaseSwitch } from "@/components/lib"

export default {
  name: "ViewsTable",
  components:{
    BaseSwitch
  },
  mixins: [TableMixin, FormattersMixin],
  props: {
    views: {
      type: Array,
      required: true
    },
    activeViews: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      viewSwitches: {},
      tableColumns: [
        {
          prop: "id",
          label: "id",
          minWidth: 100,
          sortable: true
        },
        {
          prop: "name",
          label: this.$t("common.name"),
          minWidth: 100,
          sortable: true
        }
      ],
      pagination: {
        perPage: 5
      }
    }
  },
  computed: {
    computedTableData() {
      return this.views
    },
    isReady() {
      return this.$store.getters["isReady"]("googleAnalytics/views")
    }
  },
  watch: {
    activeViews: {
      handler(activeViews) {
        if (this.ready)
          this.views.map(view => {
            this.viewSwitches[view.id] =
              activeViews.findIndex(
                activeView => activeView.id === view.id
              ) != -1
          })
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    for (const view in this.views) {
      this.viewSwitches[view.id] = this.isViewAdded(view.id)
    }
  },
  methods: {
    selectView(row, $event) {
      this.$store.dispatch("googleAnalytics/selectViewToAdd", {
        view: row,
        toggle: $event
      })
      let obj = {}
      obj[row.event_id] = $event
      this.viewSwitches = { ...this.viewSwitches, obj }

    },
    isViewAdded(id) {
      return this.activeViews.findIndex(view => view.id === id) != -1
    },
    isViewSelected(id) {
      return this.activeViews.findIndex(view => view.id === id) != -1
    }
  }
}
</script>
