<template>
  <b-modal
    id="plan-modal"
    ref="planModalRef"
    v-model="showModal"
    title=""
    hide-footer
    hide-header
    content-class="plan-modal-content"
    dialog-class="plan-modal-dialog"
    body-class="plan-modal-body"
    @hidden="showModal=false"
  >
    <div :class="`card-pricing ${plan.class}`">
      <div class="card-body">
        <h1 class="card-title">
          {{ plan.title }}
        </h1>
        <img
          :src="`/img/card-${plan.image}.png`"
          alt="Image"
          class="card-img"
        >
        <ul class="list-group">
          <li class="list-group-item">
            {{ plan.users }} {{ plan.usersText }}
          </li>
          <li class="list-group-item">
            {{ plan.panels }} {{ plan.panelsText }}
          </li>
          <li class="list-group-item">
            {{ plan.accounts }} {{ plan.accountsText }}
          </li>
          <li class="list-group-item">
            {{ $t("subscription.history") }} {{ plan.history }}
          </li>
          <li class="list-group-item">
            {{ plan.management }}
          </li>
          <li class="list-group-item">
            {{ plan.realTime }}
          </li>
        </ul>
      </div><!---->
      <div class="card-footer text-center mb-3 mt-3">
        <!---->
        <button
          type="button"
          class="btn btn-just-icon btn-round btn-primary"
          @click="hide"
        >
          Ok
        </button>
      </div>
    </div>
  </b-modal>
</template>
<script>
export default {
  name: "PlanModal",
  props: {
    plan: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    show() {
      this.showModal = true
    },
    hide() {
      this.showModal = false
    }
  }
}
</script>

<style lang="scss">
  .plan-modal-dialog{
    transform: translateY(10%) !important;
  }
  .plan-modal-content{
    background-color: transparent;
  }
  .plan-modal-body{
    padding: 0px;
  }
</style>
