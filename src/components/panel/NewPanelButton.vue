<template>
  <generic-button
    :is-expanded="isExpanded"
    :link="newPanel"
    :icon="icon"
    :title="$t('panel.new_panel')"
  />
</template>

<script>
import GenericButton from "@/components/shared/GenericButton"
import ShapeSquarePlusIcon from "icons/ShapeSquarePlus"

export default {
  components: {
    GenericButton
  },
  props: {
    isExpanded: {
      type: Boolean,
      default: true
    }
  },
  data() {
    this.icon = ShapeSquarePlusIcon
    return {}
  },
  methods: {
    newPanel() {
      this.$router.push({ name: "PanelCreate" })
    }
  }
}

</script>
