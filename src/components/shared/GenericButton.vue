<template>
  <label
    class="btn btn-simple active"
    :class="[btnClass, { 'generic-btn-expanded-small': smallButton, 'generic-btn-expanded': isExpanded }]"
    @click="link"
  >
    <component
      :is="icon"
      v-if="!isExpanded"
      class="icon-2x generic-icon"
    />
    <span
      v-else-if="!isMobile"
      class="d-none d-sm-block"
    >
      <el-tooltip
        :content="content"
        class="item"
        effect="dark"
        placement="top-start"
      >
        <component
          :is="icon"
          class="icon-2x generic-icon"
        />
      </el-tooltip>
      <span
        class="generic-btn-label"
      >
        {{ title }}
      </span>
    </span>
    <span
      v-else
    >
      {{ title }}
    </span>
  </label>
</template>

<script>
export default {
  props: {
    isExpanded: {
      type: Boolean,
      default: true
    },
    link: {
      type: Function,
      required: true
    },
    icon: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      default: ""
    },
    tooltip: {
      type: String,
      default: ""
    },
    btnClass: {
      type: String,
      default: "btn-primary"
    },
    smallButton: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      isMobile: false
    }
  },
  computed: {
    content() {
      return this.title && this.title !== "" ? this.title : this.tooltip
    }
  },
  mounted() {
    this.isMobile = !!(window.screen.width < 992)
  }
}

</script>

<style>
  .generic-icon{
    float: left;
    margin-right: 0px !important;
  }

  .generic-btn{
    cursor: pointer;
  }

  .generic-btn-expanded{
    min-width: 126px;
  }

  .generic-btn-expanded-small{
    min-width: 24px !important;
  }

  .generic-btn-label{
    padding-left: 2px;
    padding-top: 2px;
  }

  .btn-simple{
    padding: 7px 9px !important;
  }
</style>
