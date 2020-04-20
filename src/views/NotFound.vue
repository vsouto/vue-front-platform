<template>
  <div id="notfound">
    <div class="notfound">
      <h2>{{ $t("404.title") }}</h2>
      <base-button
        type="warning"
        class="mr-4"
        @click="historyBack()"
      >
        Voltar
      </base-button>
      <router-link
        class="btn btn-info"
        to="/"
      >
        Início
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  methods: {
    historyBack() {
      this.$router.go(-1)
    }
  }
}
</script>
