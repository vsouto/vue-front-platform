<template>
  <div class="animated fadeIn">
    <div id="Hotmart">
      <loading v-show="isLoading || !fetched" />
      <div class="col-12">
        <b-card
          v-if="fetched"
          no-body
          header="Inscrição"
          header-tag="h5"
        >
          <subscriptions-table :subscriptions="subscriptions" />
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import SubscriptionsTable from "@/hotmart/components//SubscriptionsTable"
import { error } from "@/constants/notifications"

export default {
  name: "HotmartSubscriptions",
  components: {
    SubscriptionsTable
  },
  computed: {
    
    subscriptions() {
      return this.$store.getters["hotmart/subscriptions"]
    },
    fetched() {
      return !!this.$store.getters["hotmart/subscriptions_fetched_id"]
    }
  },

  created() {
    if (this.$route.params.id != this.$store.getters["hotmart/subscriptions_fetched_id"]) {
      this.$store
        .dispatch("hotmart/fetchSubscriptions", this.$route.params.id)
        .catch(() => {
          this.$notify(error.fetchAccounts)
        })
    }
  }
}
</script>

<style scoped lang="scss">

.sb-btn {
  position: relative;
  padding: 12px 30px;
  margin: 0.3125rem 1px;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.428571;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0;
  cursor: pointer;
  background-color: transparent;
  border: 0;
  border-radius: 0.2rem;
  outline: 0;
}

.btn-rose {
  color: #fff;
  background-color: $pink-500;
  border-color: $pink-500;
  box-shadow: 0 2px 2px 0 rgba(233, 30, 99, 0.14),
    0 3px 1px -2px rgba(233, 30, 99, 0.2), 0 1px 5px 0 rgba(233, 30, 99, 0.12);

  &:hover,
  &.active {
    background-color: $pink-500;
    box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.2),
      0 13px 24px -11px rgba(233, 30, 99, 0.6);
    color: #fff;
  }
}

.btn-rounded {
  border-radius: 30px;
}

.subscription-header {
  display: flex;
  justify-content: center;
  font-size: 2.25rem;
  line-height: 1.5em;
  font-weight: 700;
  margin-bottom: 16px;
  color: $black-color;
}

.tab-buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 50px;

  &__item {
    font-weight: 500;
    color: #555;

    &:not(.active):hover {
      background-color: rgba(200, 200, 200, 0.2);
    }
  }
}

.btn-rounded {
  border-radius: 30px;
}

.subscription-card {
  border: 0;
  margin-bottom: 30px;
  margin-top: 30px;
  border-radius: 6px;
  color: rgba(0, 0, 0, 0.87);
  background: #fff;
  width: 100%;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  object-fit: cover;

  &__wrap {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
    position: relative;
    width: 100%;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
  }

  &-body {
    padding: 15px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
  }

  &-title {
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: 500;
    margin-top: 10px;
    text-align: center;
    font-weight: 500;
  }

  &-price {
    margin-top: 30px;
    color: $black-color;
    text-decoration: none;
    font-size: 3.3125rem;
    text-align: center;
    font-weight: 700;
    font-family: 'Roboto Slab', 'Times New Roman', serif;

    &.text-grey {
      color: $black-color;
    }
  }
}

.subscription-card-body small {
  color: #777;
}

.subscription-card-body h1 small {
  font-size: 18px;
  display: inline-flex;
  height: 0;
}

.subscription-card-body h1 small:first-child {
  position: relative;
  top: -17px;
  font-size: 26px;
  width: 0;
}

.subscription-card-list {
  list-style: none;
  padding: 0;
  max-width: 240px;
  width: 100%;
  margin: 10px auto;

  &__wrap {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  &__item {
    text-align: center;
    padding: 12px 0;
    width: 100%;
    font-weight: 300;
    border-color: rgba(255, 255, 255, 0.3);
  }
}

.subscription-card-list__item+.subscription-card-list__item {
  border-top: 1px solid rgba(153, 153, 153, 0.3);
}

.subscription-card-footer {
  display: flex;
  justify-content: center;
  background-color: transparent;
  padding-bottom: 15px;
  border: 0;
}

.btn-white {
  background-color: #fff;
  color: $gray-color;

  &:hover {
    color: $gray-color;
  }
}

b {
  color: $black-color;
  font-weight: 700;
}

.text-white,
.text-white b {
  color: #fff;
}

.text-grey {
  color: $gray-color;
}

@media screen and (max-width: 768px) {
  .subscription-card__wrap {
    flex: 0 0 100%;
    max-width: 100%;
    position: relative;
    width: 100%;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
  }
}
</style>