<template>
  <li
    :class="{ show }"
    class="nav-item dropdown cursor-pointer"
    @click="toggle($event)"
    @mouseenter="open($event)"
    @mouseleave="close($event)"
  >
    <a
      class="nav-link dropdown-toggle"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >{{ label }}</a>
    <div
      class="dropdown-menu dropdown-black"
      aria-labelledby="drop"
    >
      <slot />
    </div>
  </li>
</template>
<script>
export default {
  name: "NavDropdown",
  props: {
    label: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      show: false,
      isMobile: false
    }
  },
  mounted(){
    this.isMobile = !!(window.screen.width < 992)
  },
  methods:{
    toggle(){
      this.show = !this.show
    },
    open(){
      if(!this.isMobile)
        this.show = true
    },
    close(){
      if(!this.isMobile)
        this.show = false
    },
  }
}
</script>
<style lang="scss">
.nav-item.dropdown {
  .active {
    background-color: transparent;
  }
}
</style>

