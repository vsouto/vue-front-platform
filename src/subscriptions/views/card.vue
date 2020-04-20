<template>
  <div
    v-pic="card.imageUrl"
    class="subscription-card"
  >
    <div
      :class="textColor"
      class="subscription-card-body"
    >
      <h6 class="subscription-card-title">
        {{ card.title }}
      </h6>
      <h1
        :class="textColor"
        class="subscription-card-price"
      >
        <small>$</small>
        {{ card.price }}
        <small>{{ cardType }}</small>
      </h1>
      <div class="subscription-card-list__wrap">
        <ul
          :class="textColor"
          class="subscription-card-list"
        >
          <li class="subscription-card-list__item">
            <b>{{ card.project }}</b> Project
          </li>
          <li class="subscription-card-list__item">
            <b>{{ card.team }}</b> Team Members
          </li>
          <li class="subscription-card-list__item">
            <b>{{ card.contacts }}</b> Personal Contacts
          </li>
          <li class="subscription-card-list__item">
            <b>{{ card.messages }}</b> Messages
          </li>
        </ul>
      </div>
    </div>

    <div class="subscription-card-footer">
      <button
        v-if="card.imageUrl"
        class="sb-btn btn-white btn-rounded"
      >
        Get Started
      </button>
      <button
        v-else
        class="sb-btn btn-rose btn-rounded"
      >
        Get Started
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PriceCard",
  props: {
    card: {
      default: null,
      validator: prop => typeof prop === "object" || prop === null
    }
  },
  computed: {
    textColor() {
      return this.card.imageUrl ? "text-white" : "text-grey"
    },
    cardType() {
      return this.card.type == "monthly" ? "/mo" : "/ye"
    }
  }
}
</script>

<style scroped>
</style>
