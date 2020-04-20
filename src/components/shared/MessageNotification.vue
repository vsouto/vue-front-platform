<template>
  <div>
    <base-alert
      :dismissible="dismissible"
      :type="type"
    >
      <div class="text-white">
        <h5 class="mb-0">
          <lock-clock-icon
            v-if="waiting"
            class="icon-15x mr-1"
          />
          <alert-circle-icon
            v-else
            class="icon-15x mr-1"
          />
          <strong class="title-icon">{{ title }}</strong>
        </h5>
        <p
          v-if="message"
          class="text-white"
        >
          {{ message }}
        </p>
        <slot v-else />
      </div>
    </base-alert>
  </div>
</template>
<script>
// Icons
import AlertCircleIcon from "vue-material-design-icons/AlertCircle.vue"

import { BaseAlert } from "@/components/lib"

export default {
  components: {
    AlertCircleIcon,
    BaseAlert
  },
  props: {
    dismissible: {
      type: Boolean,
      default: false,
    },
    warning: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    waiting: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: null,
    },
  },
  data() {
    return {}
  },
  computed: {
    type() {
      return this.error ? "danger" : this.warning ? "warning" : "neutral"
    }
  },
}
</script>

<style lang="scss" scoped>
.title-icon {
  display: inline-block;
  vertical-align: super;
}
.alert {
  background: transparent;
  display: inline-block;
  border: 1px solid $white;
  border-radius: $border-radius-lg;

  &.alert-warning {
    border-color: $warning;
    .material-design-icon {
      color: $warning
    }
  }

  &.alert-danger {
    border-color: $danger;
    .material-design-icon {
      color: $danger
    }
  }
}
</style>
