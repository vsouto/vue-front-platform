<template>
  <div>
    <el-tooltip
      v-if="notEnoughImpressions"
      :content="$t('facebook_ads.not_enough_impressions')"
      class="item"
      effect="dark"
      placement="top-start"
    >
      <clock-icon class="text-muted" />
    </el-tooltip>
    <el-tooltip
      v-else-if="relevanceScore != '-'"
      :content="text"
      class
      effect="dark"
      placement="top-start"
    >
      <div>
        <base-button
          :type="variant"
          class
          icon
          round
        >
          <strong
            :class="['text-white', 'h3']"
            style="line-height: 1.7em"
          >{{ relevanceScore }}</strong>
        </base-button>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
import ClockIcon from "icons/Clock.vue"
export default {
  components: {
    ClockIcon
  },
  props: {
    row: {
      type: Object,
      required: true
    },
    getRowInsights: {
      type: Function,
      required: true
    }
  },
  computed: {
    relevanceScore() {
      let v = this.getRowInsights(this.row).relevance_score
      if (v && v.score) return v.score
      else if (v && v.status) v = status
      return "-"
    },
    text() {
      let score = this.relevanceScore
      if (!this.notEnoughImpressions) {
        if (score >= 9) return "Ótimo!"
        if (score >= 7) return "Bom, mas pode melhorar"
        else if (score > 5) return "Ruim, necessita atenção"
        else if (score > 0) return "Péssimo, cuidado!"
      }
      return ""
    },
    notEnoughImpressions() {
      if (this.relevanceScore == "NOT_ENOUGH_IMPRESSIONS") return true
      return false
    },
    variant() {
      let score = this.relevanceScore
      if (!this.notEnoughImpressions) {
        if (score >= 9) return "success"
        if (score >= 7) return "info"
        else if (score > 5) return "warning"
        else if (score > 0) return "danger"
      }
      return ""
    }
  }
}
</script>
