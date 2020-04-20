<template>
  <generic-button
    :is-expanded="isExpanded"
    :link="link"
    :icon="icon"
    :btn-class="btnClass"
    :title="$t('common.configure')"
  />
</template>

<script>
import GenericButton from "@/components/shared/GenericButton"
import WrenchIcon from "icons/Wrench"

export default {
  components: {
    GenericButton
  },
  props: {
    isExpanded: {
      type: Boolean,
      default: true
    },
    platform: {
      type: Object,
      required: true
    },
  },
  data() {
    this.btnClass = "btn-success"
    this.icon = WrenchIcon
    return {}
  },
  methods: {
    link() {
      this.$router.push({name: this.platform.name})
    }
  }
}

</script>
