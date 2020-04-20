<template>
  <div>
    <div
      v-loading="true"
      :class="{
        'error': error,
        'in-sync': inSync
      }"
      class="loading-animation loading-block"
    >
      <el-tooltip
        :content="tooltipMessage"
        placement="top"
      >
        <div class="loading-content">
          <alert-circle-icon
            v-if="error"
            :class="{
              'text-danger': error
            }"
            class="icon-2x"
          />
          <el-progress
            v-else-if="inSync"
            :width="50"
            :percentage="progressValue"
            :stroke-width="3"
            type="circle"
          />
          <span class="loading-text">
            {{ title }}
          </span>
        </div>
      </el-tooltip>
    </div>
  </div>
</template>
<script>
import Vue from "vue"
import { Loading, Progress } from "element-ui"
Vue.use(Loading.directive)

// Icons
import AlertCircleIcon from "vue-material-design-icons/AlertCircle.vue"

import { randomPick } from "@/utils"

export default {
  components: {
    AlertCircleIcon,
    "el-progress": Progress
  },
  props: {
    size: {
      type: String,
      default: "20px"
    },
    error: {
      type: Boolean,
      default: false
    },
    inSync: {
      type: Boolean,
      default: false
    },
    progress: {
      type: [String, Number],
      default: 0
    },
    loadingType: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: null
    },
  },
  data() {
    return {
      animating: null,
      progressValue: this.setProgressValue
    }
  },
  computed: {
    tooltipMessage() {
      if (this.error) return "Erro ao carregar"
      if (this.inSync) return "Sincronizando métricas"
      return "Carregando..."
    }
  },
  mounted() {
    this.$nextTick().then(() => document.body.classList.add("has-background"))
  },
  created() {
    let value = parseInt(this.progress)
    this.progressValue = isNaN(value) ? 0 : value
    if (!this.animating)
      this.animating = setInterval(this.animateProgress, 2000)
  },
  methods: {
    animateProgress() {
      if (this.progressValue < 100)
        this.progressValue = this.progressValue + randomPick([1,2,3])
      else {
        this.progressValue = 100
        clearInterval(this.animating)
      }
    }
  }
}
</script>
<style scoped>
  .loading-animation {
    position: absolute !important;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: right;
    padding: 5px;
  }
  .loading-animation.in-sync >>> .el-loading-spinner,
    .loading-animation.error >>> .el-loading-spinner {
    display: none !important
  }
  .loading-content {
    z-index: 3;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -100px;
    margin-top: -25px;
    width: 200px;
    height: 50px;
    text-align: center;
  }
  .loading-content >>> .el-progress__text  {
    font-size: 0.8em !important;
    color: white;
  }

  /*
  .loading-animation {
    min-height: 50px;
    display: flex;
    align-items: center;
  }

  .loading-animation >>> .loading-text {
    text-align: center;
    width: 100%;
    margin-top: 65px;
  }

  .loading-animation.widget {
    height: 25px !important;
    min-height: auto !important;
  }

  .loading-animation.widget >>> .loading-text {
    position: absolute;
    top: 0;
    right: 40px;
    font-size: 0.9em;
    margin: auto !important;
    width: auto !important;
    text-align: inherit !important;
  }

  .loading-animation.widget >>> .el-loading-spinner {
    top: 15px;
    right: 10px;
    text-align: right;
  }

  .loading-animation.widget >>> .circular {
    width: 21px;
    height: 21px;
  }

  .loading-animation.widget.error {
    float: right;
    margin-right: 10px
  }

  .loading-animation.error >>> .el-loading-spinner {
    display: none;
  }

  .loading-animation.in-sync >>> .path {
    stroke: #f57f17 !important;
  }

  .sidebar >>> .path {
    stroke: #fff;
  }

  .loading-animation >>> .path {
    stroke: #66615b !important;
  }

  .loading-animation >>> .el-loading-mask {
    background: transparent !important;
  }

  .loading-animation >>> .progress-container {
    width:50%;
    height: 15px;
    margin:0 auto !important
  } */
</style>
