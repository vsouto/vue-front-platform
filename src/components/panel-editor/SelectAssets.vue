<template>
  <el-row :gutter="10">
    <el-col
      v-for="platform in platforms"
      :key="platform.id"
      :span="24"
    >
      <div
        class="platform-item"
      >
        <div>
          <img
            :src="platform.icon"
            :height="30"
          >
          {{ platform.name }}
        </div>
        <div class="mt-2">
          <loading
            v-if="platformOptions[platform.id] == null"
            title="Carregando contas..."
          />
          <message-notification
            v-else-if="platformOptions[platform.id].length == 0"
            warning
            title="Nenhum item encontrado"
            message="Configure pelo menos um ativo (conta / produto / domínio / etc)"
          />
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { all_platforms } from "@/platforms"
import MessageNotification from "@/components/shared/MessageNotification"
import PanelModel from "@/models/panel"
import PanelPlatformOptions from "@/models/panelPlatformOptions"

export default {
  components: {
    MessageNotification
  },
  props: {
    model: {
      type: PanelModel,
      required: true,
    },
  },
  data() {
    return {
      platformOptions: new PanelPlatformOptions()
    }
  },
  computed: {
    platforms() {
      return all_platforms.filter(p => {
        return this.model.platforms[p.id].enabled == true
      })
    },
  },
  created() {
    for (let platform of this.platforms) {
      this.$store.watch(
        state => state.platformOptions[platform.id],
        (newOptions) => {
          this.platformOptions[platform.id] = newOptions
        }
      )
    }
    this.fetchPlatformOptions()
  },
  methods: {
    fetchPlatformOptions() {
      let platformsArray = []
      for (let p of this.platforms)
        platformsArray.push(p.id)
      this.$store.dispatch("fetchPlatformOptions", platformsArray)
    }
  }
}
</script>

<style scoped>
.platform-item {
  padding: 1em;
  border-radius: 1em;
  color: white;
  font-size: 1.3em;
}
</style>
