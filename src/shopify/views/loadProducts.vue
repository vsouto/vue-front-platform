<template>
  <div class="animated fadeIn">
    <div id="ShopifyLoadProducts">
      <div class="col-12">
        <b-card
          v-if="products_fetched"
          no-body
          header="Products"
          header-tag="h5"
        >
          <products-table
            :products="products"
          />
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
// import { success, error } from "@/constants/notifications"
import ProductsTable from "@/shopify/components/ProductsTable"
export default {
  name: "ShopifyLoadProducts",
  components: {
    ProductsTable
  },
  computed: {
    products(){
      return this.$store.getters["shopify/getProductsByShopId"](this.$route.params.order_id)
    },
    products_fetched() {
      return this.$store.getters["shopify/products_fetched"]
    }
  }
}
</script>