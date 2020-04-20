<template>
  <bread-crumb v-if="$route.path != '/home'">
    <BreadCrumbItem
      v-for="(route, index) in $route.matched.slice()"
      :key="route.path"
      style="display:inline-block"
    >
      <router-link
        v-if="index == 0"
        :to="{ path: '/home' }"
        class="breadcrumb-link"
      >
        {{ $t("breadcrumb./home") }}
      </router-link>
      <router-link
        v-else-if="index < $route.matched.length - 1 && ($route.matched.slice()[index + 1] && $route.matched.slice()[index + 1].path.slice(0, -1) != route.path)"
        :to="{ path: route.path }"
        class="breadcrumb-link"
      >
        {{ route.meta && route.meta.label || route.name || route.path }}
      </router-link>
      <span
        v-else
        class="breadcrumb-current"
      >{{ title || (route.meta && route.meta.label) || route.name || route.path }}</span>
    </BreadCrumbItem>
  </bread-crumb>
</template>

<script>
import BreadCrumb from './Breadcrumb';
import BreadCrumbItem from './BreadcrumbItem';

export default {
  name: 'RouteBreadcrumb',
  components: {
    BreadCrumb,
    BreadCrumbItem
  },
  data() {
    return {
      title: this.$store.state.title
    }
  },
  watch: {
    "$route.params.id"(newValue, oldValue) {
      if (newValue != oldValue)
        if (newValue)
          this.title = this.$store.state.title
        else
          this.title = null
    }
  },
  methods: {
    getBreadName(route) {
      return route.name;
    }
  }
};
</script>

<style lang="scss" scoped>
  .breadcrumb {
    padding: 0 !important;
    margin: 0 !important;
  }

  .breadcrumb-as-title{
    color: white !important;

  }
</style>
