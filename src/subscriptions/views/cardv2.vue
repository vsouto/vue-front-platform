<!-- User Plan -->
<!-- TODO: move this to a component -->
<div class="col-lg-3 col-md-6">
  <div
    v-if="plan"
    :class="`card-pricing ${plan.class}`"
  >
    <div class="card-body card-plan-user">
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
          {{ plan.management }}
        </li>
        <li class="list-group-item">
          {{ plan.realTime }}
        </li>
        <li class="list-group-item">
          {{ planInfo }}
        </li>
        <li class="list-group-item text-center">
          <router-link
            :to="{name: 'Subscriptions'}"
          >
            <button class="btn btn-just-icon btn-round btn-warning">
              {{ $t("subscription.go_to_plans") }}
            </button>
          </router-link>
        </li>
      </ul>
    </div><!---->
    <div class="card-footer text-center mb-3 mt-3">
      <br>
    </div>
  </div>
  <div
    v-else
    :class="`card-pricing card-warning`"
  >
    <div class="card-body card-plan-user">
      <h1 class="card-title">
        {{ $t("subscription.no_plan") }}
      </h1>
      <img
        :src="`/img/card-warning.png`"
        alt="Image"
        class="card-img"
      >
      <ul class="list-group">
        <li class="list-group-item">
          <br>
        </li>
        <li class="list-group-item">
          <br>
        </li>
        <li class="list-group-item">
          <br>
        </li>
        <li class="list-group-item">
          <br>
        </li>
        <li class="list-group-item">
          <br>
        </li>
        <li class="list-group-item">
          {{ $t("subscription.no_plan_text") }}
        </li>
        <li class="list-group-item text-center">
          <router-link
            :to="{name: 'Subscriptions'}"
          >
            <button class="btn btn-just-icon btn-round btn-warning">
              {{ $t("subscription.go_to_plans") }}
            </button>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</div>
<!-- User Plan END -->
