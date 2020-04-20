<template>
  <el-row :gutter="15">
    <el-col
      v-for="platform of panelPlatforms"
      :key="platform.id"
      :span="6"
    >
      <p>
        <span>
          <img
            :src="platform.icon"
            :width="15"
          >
          {{ platform.name }}
          ({{ model[platform.id].length }})
        </span>
      </p>
      <!-- <p>
        <span
          v-for="option of model[platform.id]"
          :key="option"
        >
          {{ getOptionName(platform, option) }}
        </span>
      </p> -->
    </el-col>
  </el-row>
</template>
<script>
import { all_platforms } from "@/platforms"
import PanelModel from "@/models/panel"
export default {
  props: {
    model: {
      type: PanelModel,
      required: true
    }
  },
  computed: {
    panelPlatforms() {
      return all_platforms.filter(p => {
        return this.model[p.id].length
      })
    }
  },
  methods: {
    getOptionName(platform, optionId) {
      let moduleOptions = this.$store.state[platform.module].options
      if (!moduleOptions)
        return optionId
      let option = moduleOptions.find(o => o.id == optionId)
      if (option)
        return option.name
      return optionId
    }
  }
}
</script>