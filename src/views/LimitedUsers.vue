<template>
  <div class="animated fadeIn">
    <div id="LimitedUsers">
      <limited-users-table
        :users="limitedUsers"
        @open-edit-modal="openEditModal($event)"
        @open-del-modal="openDelModal($event)"
      />

      <card style="width: 20rem;">
        <h4 class="card-title">
          Adicionar
        </h4>
        <base-button
          class="btn btn-primary w-100"
          @click="openAddModal"
        >
          <i
            class="cuis-plus-square fa fa-lg fa-plus"
            aria-hidden="true"
          />
          Novo usuário
        </base-button>
      </card>
    </div>

    <b-modal
      id="addModal"
      ref="modalRef"
      :title="modalTitle"
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
    >
      <b-form
        v-if="showForm"
        @submit.prevent="submit"
      >
        <div class="form-row">
          <div class="form-group col">
            <label for="email">Email</label>
            <b-form-input
              v-model.trim="$v.form.email.$model"
              :class="{ 'is-invalid': $v.form.email.$error, 'text-black' : !editingUserId }"
              :readonly="!!editingUserId"
              type="email"
              placeholder="Email"
            />
            <div
              v-if="!$v.form.email.required"
              class="invalid-feedback"
            >
              Campo obrigatório
            </div>
            <div
              v-if="!$v.form.email.email"
              class="invalid-feedback"
            >
              Campo deve ser um email válido
            </div>
          </div>
          <div
            v-show="isAdd"
            class="form-group col"
          >
            <label for="password">Senha</label>
            <b-form-input
              v-model.trim="$v.form.password.$model"
              :disabled="!!editingUserId"
              :class="{ 'is-invalid': $v.form.password.$error }"
              class="text-black"
              type="password"
              placeholder="Senha"
            />
            <div
              v-if="!$v.form.password.required"
              class="invalid-feedback"
            >
              Campo obrigatório
            </div>
            <div
              v-if="!$v.form.password.minLength"
              class="invalid-feedback"
            >
              Campo deve ter pelo menos {{ $v.form.password.$params.minLength.min }} caracteres.
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col">
            <label for="firstname">Nome</label>
            <b-form-input
              v-model.trim="$v.form.firstname.$model"
              :class="{ 'is-invalid': $v.form.firstname.$error }"
              class="text-black"
              type="text"
              placeholder="Primeiro nome"
            />
            <div
              v-if="!$v.form.firstname.required"
              class="invalid-feedback"
            >
              Campo obrigatório
            </div>
          </div>
          <div class="form-group col">
            <label for="firstname">Sobrenome</label>
            <b-form-input
              v-model.trim="$v.form.lastname.$model"
              :class="{ 'is-invalid': $v.form.lastname.$error }"
              class="text-black"
              type="text"
              placeholder="Último sobrenome"
            >
              >
            </b-form-input>
            <div
              v-if="!$v.form.lastname.required"
              class="invalid-feedback"
            >
              Campo obrigatório
            </div>
          </div>
          <h2>#TODO adicionar painéis e widgets</h2>
        </div>
        <base-button
          :loading="loadingBtn"
          type="info"
          native-type="submit"
          class="w-100"
        >
          <i
            :class="`fa ${actionIcon}`"
            aria-hidden="true"
          />
          {{ actionLabel }}
        </base-button>
      </b-form>

      <base-button
        v-show="deletingUserId"
        :loading="loadingBtn"
        type="danger"
        class="w-100"
        @click="submit"
      >
        <i
          class="fa fa-times"
          aria-hidden="true"
        />
        {{ actionLabel }}
      </base-button>
    </b-modal>
  </div>
</template>

<script>
import Vue from "vue"
import { required, email, minLength } from "vuelidate/lib/validators"
import { LimitedUserModel } from "@/models/limited-user"
import { success, error } from "@/constants/notifications"
import Vuelidate from "vuelidate"
import LimitedUsersTable from "@/components/limited-users/LimitedUsersTable"

Vue.use(Vuelidate)

export default {
  name: "LimitedUsers",
  components:{
    LimitedUsersTable
  },
  data() {
    return {
      apiURI: "/limited-user",
      form: new LimitedUserModel(),
      showForm: true,
      error: false,
      dataValid: null,
      loadingBtn: false,
      actionButtonClass: "bg-purple",
      actionLabel: "Adicionar",
      actionIcon: "fa-plus",
      modalTitle: "Adicionar novo usuário",
      editingUserId: false,
      deletingUserId: false
    }
  },
  computed: {
    isAdd() {
      return !this.editingUserId && !this.deletingUserId
    },
    isLoading() {
      return this.$store.state.isLoading
    },
    fetched() {
      return this.$store.state.limitedUser.fetched
    },
    limitedUsers() {
      return this.$store.state.limitedUser.limited_users
    },
    limitedUser() {
      return this.$store.state.limitedUser.limited_user
    }
  },
  created() {
    this.$store.dispatch("limitedUser/fetchLimitedUsers").catch(() => {
      this.$notify(error.fetchLimitedUsers)
    })
  },
  methods: {
    clearForm() {
      this.dataValid = false
      this.editingUserId = null
      this.deletingUserId = null
      this.form = new LimitedUserModel()
      /* Trick to reset/clear native browser form validation state */
      this.showForm = false
      this.$nextTick(() => {
        this.showForm = true
      })

      this.actionButtonClass = "bg-purple"
      this.actionLabel = "Adicionar"
      this.actionIcon = "fa-plus"
      this.modalTitle = "Adicionar novo usuário"

      this.loadingBtn = false
    },
    submit() {
      if (this.deletingUserId) {
        this.remove()
      } else {
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.dataValid = false
        } else {
          // do your submit logic here
          this.dataValid = true
          if (this.editingUserId) {
            this.edit()
          } else {
            this.add()
          }
        }
      }
    },

    add() {
      this.loadingBtn = true
      this.$store
        .dispatch("limitedUser/createLimitedUser", this.form)
        .then(() => {
          this.$notify(success.createLimitedUser)
          this.clearForm()
          this.$refs.modalRef.hide()
        })
        .catch(error => {
          // console.debug(error)
          if (error.response && error.response.status == 409) {
            this.$notify(error.existsLimitedUser)
          } else {
            this.$notify(error.createLimitedUser)
          }
        })
        .then(() => {
          this.loadingBtn = false
        })
    },
    edit() {
      this.loadingBtn = true
      this.$store
        .dispatch("limitedUser/updateLimitedUser", this.form)
        .then(() => {
          this.$notify(success.updateLimitedUser)
          this.clearForm()
          this.$refs.modalRef.hide()
        })
        .catch(() => {
          this.$notify(error.updateLimitedUser)
        })
        .then(() => {
          this.loadingBtn = false
        })
    },
    remove() {
      this.loadingBtn = true
      this.$store
        .dispatch("limitedUser/deleteLimitedUser", this.deletingUserId)
        .then(() => {
          this.clearForm()
          this.$refs.modalRef.hide()
        })
        .catch(() => {})
        .then(() => {
          this.loadingBtn = false
        })
    },

    openAddModal() {
      this.clearForm()
      this.showForm = true
      this.$refs.modalRef.show()
    },
    openEditModal(limitedUser) {
      this.clearForm()
      this.showForm = true
      this.editingUserId = limitedUser.user_id
      this.form = {
        email: limitedUser.email,
        password: "dummydummy",
        firstname: limitedUser.user_metadata.firstname,
        lastname: limitedUser.user_metadata.lastname,
        limited_auth_id: limitedUser.user_id
      }
      this.actionButtonClass = "bg-info"
      this.actionLabel = "Editar"
      this.actionIcon = "fa-edit"
      this.modalTitle = `Editando ${limitedUser.email}`
      this.$refs.modalRef.show()
    },
    openDelModal(limitedUser) {
      this.loadingBtn = false
      this.showForm = false
      this.deletingUserId = limitedUser.user_id
      this.actionButtonClass = "bg-danger"
      this.actionLabel = "Remover"
      this.actionIcon = "fa-close"
      this.modalTitle = `Removendo ${limitedUser.email}`
      this.$refs.modalRef.show()
    }
    // ...mapActions("limited_user", [
    //   "fetchLimitedUsers",
    //   "createLimitedUser",
    //   "updateLimitedUser",
    //   "deleteLimitedUser"
    // ])
  },
  // notifications: {
  //   successNotification: {
  //     title: "Informações salvas",
  //     message: "Usuário criado!",
  //     type: "success" // You also can use 'VueNotifications.types.error' instead of 'error'
  //   },
  //   errorNotification: {
  //     title: "Erro",
  //     message: "Não foi possível criar o usuário",
  //     type: "error" // You also can use 'VueNotifications.types.error' instead of 'error'
  //   },
  //   existsNotification: {
  //     title: "Erro ao adicionar usuário",
  //     message: "Usuário já existe.",
  //     type: "error" // You also can use 'VueNotifications.types.error' instead of 'error'
  //   },
  //   successEditNotification: {
  //     title: "Editado",
  //     message: "Usuário editado.",
  //     type: "success" // You also can use 'VueNotifications.types.error' instead of 'error'
  //   },
  //   successRemoveNotification: {
  //     title: "Removido",
  //     message: "Usuário removido.",
  //     type: "success" // You also can use 'VueNotifications.types.error' instead of 'error'
  //   },
  //   errorLoading: {
  //     title: "Erro",
  //     message: "Não foi possível carregar usuários.",
  //     type: "error" // You also can use 'VueNotifications.types.error' instead of 'error'
  //   }
  // },
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      },
      firstname: {
        required
      },
      lastname: {
        required
      }
    }
  }
}
</script>
