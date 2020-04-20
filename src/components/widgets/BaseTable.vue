<template>
  <widget-container
    :title="widget.name"
    :is-editing="isCreating"
    :is-ready="isReady"
    :is-fetching="isFetching"
    :is-in-sync="isInSync"
    :is-errored="isErrored"
    :progress-value="percentReady"
    type="table"
    class="base-table"
  >
    <component
      :is="childComponent"
      v-if="isReady && childComponent"
      :key="panelId+widget.id"
      v-bind="$props"
      :data="tableData"
    />
  </widget-container>
</template>
<script>
import WidgetContainer from "@/components/widgets/WidgetContainer"
import BaseWidget from "@/components/widgets/BaseWidget"

export default {
  name: "BaseTable",
  components: {
    WidgetContainer,
  },
  extends: BaseWidget,
  props: {
    title: {
      type: String,
      default: null
    }
  },
  data() {
    this.childComponent = this.widget.childComponent
    return {
      tableColumns: [],
      searchFilter: "",
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50, 100],
        total: 0,
      }
    }
  },
  computed: {
    platformIds() {
      // One platform
      if (this.platform)
        return [this.platform.id]
      // Many platforms
      if (this.platforms)
        return this.platforms.map(platform => platform.id)
      // All platforms
      return null
    },
    tableData() {
      return this.platformsAggregatedData
    },
    dataList() {
      return this.statsList || []
    },
    dataAggregated() {
      return this.stats || {}
    },
    platformsData() {
      if (!this.platform) return []
      return this.dataList
        .filter(stats => stats.platforms[this.platform.id])
        .map(stats => stats.platforms[this.platform.id])
    },
    platformsAggregatedData() {
      let list = []
      if (!this.dataAggregated.platforms)
        return list
      let platformIds = this.platformIds
      if (!platformIds) {
        platformIds = []
        for (let platform in this.dataAggregated.platforms)
          platformIds.push(platform)
      }
      platformIds.map(platformId => {
        let platform_statses = this.dataAggregated.platforms[platformId] || []
        if (platform_statses.length)
          platform_statses.map(p_s => list.push(p_s))
      })
      return list
    }
  }
}
</script>