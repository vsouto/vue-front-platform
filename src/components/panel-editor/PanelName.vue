<template>
  <div
    class="panel-name"
  >
    <div class="input-container">
      <base-input
        v-model="panelName"
        v-validate="modelValidations.name"
        :error="getError('name')"
        link
        name="name"
        placeholder="ex: Painelindo"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      modelValidations: {
        name: {
          required: true,
          min: 3
        }
      }
    }
  },
  computed: {
    panelName: {
      get() { return this.value },
      set(panelName) { this.$emit("input", panelName) }
    }
  },
  methods: {
    getError(fieldName) {
      return this.errors.first(fieldName)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-name {
  display: inline-block;
  margin-left: 0.5rem;
  height: 2.5rem;
  width: 45%;
  .config-title {
    font-size: 1rem
  }
  /deep/ input {
    background: transparent;
    padding: .25rem 1rem;
  }
  /deep/ .error {
    bottom: -2rem;
    left: 0;
    width: 500px;
    position: absolute;
    font-size: 0.9em;
  }
}
</style>
