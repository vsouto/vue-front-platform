<template>
  <div class="animated fadeIn">
    <div id="Shopify">
      <div class="col-12">
        <stores-table
          :accounts="accounts"
          @set-account-to-delete="setAccountToDelete($event)"
        />
        <card>
          <form @submit.prevent="authorizeNewAccount(scope)">
            <h4 class="card-title">
              Adicionar
            </h4>
            <h5>Nome da loja</h5>
            <base-input
              id="shopify-store"
              v-model.trim="shopName"
              :class="{'has-danger': !isDataValid && shopName.length == 0}"
              placeholder="my-shop-name"
            />
            <base-button
              id="shopify-auth"
              class="btn btn-primary w-100"
              native-type="submit"
            >
              <i
                class="cuis-plus-square fa fa-lg fa-plus"
                aria-hidden="true"
              />
              Autorizar nova conta
            </base-button>
          </form>
        </card>
      </div>

      <!-- Deleting Modal -->
      <shopify-modal
        ref="shopifyRemove"
        :account-name="accountDelete.name"
        :loading="loadingBtn"
        @submit="remove(accountDelete.id)"
        @clearAccountDelete="clearAccountDelete($event)"
      />
    </div>
  </div>
</template>

<script>
import OAuthCallbackMixin from "@/components/shared/mixins/OAuthCallbackMixin"
import ShopifyModal from "@/shopify/components/modal"
import StoresTable from "@/shopify/components/StoresTable"
import { success, error } from "@/constants/notifications"

export default {
  name: "Shopify",
  components: {
    ShopifyModal,
    StoresTable
  },
  mixins: [
    OAuthCallbackMixin
  ],
  data() {
    return {
      scope: "read_orders,read_products",
      accountDelete: {},
      shopName: "",
      isDataValid: true,
      loadingBtn: false,
    }
  },
  computed: {

    accounts() {
      return this.$store.getters["shopify/getAccounts"]
    }
  },
  watch: {
    accountDelete(account) {
      if (account && account.id) this.$refs.shopifyRemove.show()
    }
  },
  created() {
    this.$store.dispatch("shopify/fetchAccounts").catch(() => {
      this.$notify(error.fetchAccounts)
    })
  },
  methods: {
    setAccountToDelete(account) {
      this.accountDelete = account
    },
    authorizeNewAccount(scope) {
      if (this.shopName === "") {
        this.isDataValid = false
        return
      }
      this.$store.dispatch("shopify/authorizeAccount", {
        token: this.$store.getters["account/token"],
        scope: scope,
        shop: this.shopName
      })
      this.shopName = ""
      this.isDataValid = true
    },
    async remove(id) {
      this.loadingBtn = true
      try {
        await this.$store
          .dispatch("shopify/deleteAccount", id)
          .then(() => {
            this.$notify(success.deleteAccount)
          })
          .catch(() => {
            this.$notify(error.deleteAccount)
          })
        this.$refs.shopifyRemove.hide()
      } catch (err) {
        // console.log("Failed to delete account, error: ", err)
      } finally {
        this.loadingBtn = false
      }
    },
    clearAccountDelete() {
      this.accountDelete = {}
    }
  }
}
</script>
