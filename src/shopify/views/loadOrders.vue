<template>
  <div class="animated fadeIn">
    <div id="ShopifyLoadOrders">
      <loading v-show="isLoading" />
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

        <b-card
          v-if="orders_fetched"
          no-body
          header="Orders"
          header-tag="h5"
        >
          <orders-table
            :orders="orders"
            @loadOrderProducts="loadOrderProducts($event)"
          />
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
// import { success, error } from "@/constants/notifications"
import OrdersTable from "@/shopify/components/OrdersTable"
import ProductsTable from "@/shopify/components/ProductsTable"
export default {
  name: "ShopifyLoadOrders",
  components: {
    OrdersTable,
    ProductsTable
  },
  computed: {
    
    orders() {
      return this.$store.getters["shopify/orders"]
    },
    products() {
      return this.$store.getters["shopify/products"]
    },
    orders_fetched() {
      return this.$store.getters["shopify/orders_fetched"]
    },
    products_fetched() {
      return this.$store.getters["shopify/products_fetched"]
    },
  },
  watch: {
    $route: {
      handler(route) {
        if (
          route.params.id !==
          this.$store.getters["shopify/accountId"]
        ) {
          this.$store.commit(
            "shopify/setAccountId",
            route.params.id
          )
          this.$store.dispatch(
            "shopify/fetchOrders",
            route.params.id
          )
          this.$store.dispatch(
            "shopify/fetchProducts",
            route.params.id
          )
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods:{
    loadOrderProducts(order_id){
      this.$router.push({
        name: "ShopifyLoadProducts",
        params: { id: this.$route.params.id, order_id: order_id }
      })
    }
  }
}
</script>
