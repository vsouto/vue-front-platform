<template>
  <div class="animated fadeIn">
    <div
      id="Settings"
      class="col-md-8 ml-auto mr-auto"
    >
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
                  {{ $t("common.save") }}
                </base-button>
                <base-button
                  id="user-password-btn"
                  :loading="loadingBtn"
                  class="block-left btn btn-simple btn-reddit"
                  type="success"
                  @click="openModalPassword($event)"
                >
                  {{ $t("common.password_change") }}
                </base-button>
              </form>
            </div>
          </div>
          <loading v-else />
        </div>
      </div>
    </div>
    <user-password-modal
      id="user-password-modal"
      ref="UserPasswordModalRef"
      :loading="loadingBtn"
      title="Alterar senha"
    />
  </div>
</template>

<script>
import { error, success } from "@/constants/notifications"
import UserPasswordModal from "@/components/modals/UserPasswordModal"

export default {
  name: "Settings",
  components: {
    UserPasswordModal,
  },
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
    openModalPassword () {
      this.$refs.UserPasswordModalRef.show()
    },
    save() {
      this.loadingBtn = true
      this.$store
        .dispatch("account/updateUsermetadata", {
          firstname: this.user.firstname,
          lastname: this.user.lastname
        })
        .then(() => {
          this.$notify(success.updateUser)
          this.loaded = true
          this.loadingBtn = false
        })
        .catch(() => {
          this.$notify(error.updateUser)
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
