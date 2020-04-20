<template>
  <div class="animated fadeIn">
    <div id="Profile">
      <div class="card border-secondary">
        <div class="card-body">
          <div
            v-if="loaded"
            class="media"
          >
            <img
              :src="userData.picture"
              :alt="userData.email || userData.name"
              class="align-self-start mr-3"
            >
            <div class="media-body">
              <form @submit.prevent="save($event)">
                <div class="form-row">
                  <div class="form-group col">
                    <base-input
                      id="email"
                      :value="userData.email"
                      label="Email"
                      type="email"
                      readonly
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col">
                    <base-input
                      id="firstname"
                      v-model="user.firstname"
                      label="Nome"
                      type="text"
                      placeholder="seu nome"
                    />
                  </div>
                  <div class="form-group col">
                    <base-input
                      id="lastname"
                      v-model="user.lastname"
                      label="Sobrenome"
                      type="text"
                      placeholder="seu sobrenome"
                    />
                  </div>
                </div>
                <base-button
                  id="save-btn"
                  :loading="loadingBtn"
                  class="block-right"
                  type="success"
                  native-type="submit"
                >
                  Salvar
                </base-button>
              </form>
            </div>
          </div>
          <loading v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { error, success } from "@/constants/notifications"

export default {
  name: "Profile",
  data() {
    return {
      apiURI: "/user",
      user: {
        firstname: "",
        lastname: ""
      },
      loaded: false,
      loadingBtn: false
    }
  },
  computed: {
    userMetadata() {
      return this.$store.getters["account/userMetaData"]
    },
    userData() {
      return this.$store.getters["account/user"]
    }
  },
  created(){
    this.$store.dispatch("account/fetchUser")
      .catch(() => {
        this.$notify(error.fetchUser)
      })
      .then(() => {
        this.loaded = true
      })
  },
  mounted() {
    this.user.firstname = this.userMetadata.firstname
    this.user.lastname = this.userMetadata.lastname
  },
  methods: {
    save() {
      this.loadingBtn = true
      this.$store
        .dispatch("account/updateUser", {
          email: this.userData.email,
          firstname: this.user.firstname,
          lastname: this.user.lastname
        })
        .then(() => {
          this.$notify(success.updateUser)
        })
        .catch(() => {
          this.$notify(error.updateUser)
        })
        .then(() => {
          this.loaded = true
          this.loadingBtn = false
        })
    }
  }
}
</script>

<style scoped>
.saveBtn.ladda-button[data-style="contract-overlay"][data-loading] {
  width: auto;
}
</style>
