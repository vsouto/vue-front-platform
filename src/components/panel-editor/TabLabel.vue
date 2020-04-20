<template>
  <label
    :class="{ 'active': active }"
    class="btn btn-sm btn-primary btn-simple panel-header-wizard-label"
  >
    <span
      class="d-none d-sm-block"
    >
      <i
        :class="currentIcon"
        class="tim-icons"
      />
      {{ $t(label) }}
    </span>
    <span
      class="d-block d-sm-none"
    >
      <i
        class="tim-icons icon-single-02"
      />
    </span>
  </label>
</template>

<script>

export default {
  props: {
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: "icon-pencil"
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentIcon() {
      return this.active? "icon-check-2" : this.icon
    }
  }
}
</script>

<style>
  .panel-header-wizard-label{
    min-width: 30%;
  }
  .card label{
    font-size: 0.85rem;
  }
</style>
