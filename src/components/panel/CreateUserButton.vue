<template>
  <generic-button
    :is-expanded="isExpanded"
    :link="link"
    :icon="icon"
    :title="$t('common.new_account')"
  />
</template>

<script>
import GenericButton from "@/components/shared/GenericButton"
import AccountPlusOutline from "icons/AccountPlusOutline"

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
    this.icon = AccountPlusOutline
    return {}
  },
  methods: {
    link() {
      this.$router.push({name: this.platform.name})
    }
  }
}

</script>
