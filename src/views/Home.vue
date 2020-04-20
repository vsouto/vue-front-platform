<template>
  <div
    id="Home"
    class="animated fadeIn"
  >
    <div class="row">
      <!-- Panels -->
      <div class="col-md-6">
        <div class="card card">
          <div class="card-header">
            <div class="row">
              <div class="col-sm-6 text-left">
                <h4 class="card-title">
                  {{ $t('panels.your_panels') }}
                </h4>
                <p class="card-category">
                  {{ $t('panels.your_panels_text') }}
                </p>
              </div>
              <div class="col-sm-6 d-flex d-sm-block">
                <div
                  data-toggle="buttons"
                  class="btn-group btn-group-toggle float-right panels-action-buttons"
                >
                  <new-panel-button />
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table tablesorter">
                <thead class="text-primary">
                  <tr>
                    <th>{{ $t('common.name') }}</th>
                    <th class="text-center">
                      {{ $t('common.platforms') }}
                    </th>
                    <th class="text-right">
                      {{ $t('common.actions') }}
                    </th>
                  </tr>
                </thead>
                <tbody class="">
                  <tr
                    v-for="panel in panels"
                    :key="panel.id"
                  >
                    <td>
                      <router-link
                        class="child-nav"
                        :to="{ name: 'Panel', params: { id: panel.id } }"
                      >
                        <span>
                          {{ panel.name.toLowerCase() }}
                        </span>
                      </router-link>
                    </td>
                    <td class="text-center">
                      <img
                        v-for="(platform, index) in panel.enabledPlatforms"
                        :key="index"
                        class="platform-item text-center"
                        :src="platform.icon"
                        :height="20"
                      >
                    </td>
                    <td class="text-right">
                      <remove-panel-button
                        :panel="panel"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- Panels END -->
      <!-- Platforms -->
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">
              {{ $t("common.platforms") }}
            </h4>
            <p class="card-category">
              {{ $t("common.all_platforms_available") }}
            </p>
          </div>
          <div class="card-body">
            <div class="table-full-width table-responsive">
              <table class="table">
                <tbody>
                  <tr>
                    <th width="45%">
                      {{ $t("common.platforms") }}
                    </th>
                    <th width="25%">
                      {{ $t("common.accounts") }}
                    </th>
                    <th width="30%">
                      {{ $t("common.actions") }}
                    </th>
                  </tr>
                  <tr
                    v-for="(platform, index) in platforms"
                    :key="index"
                  >
                    <!-- Platform Name -->
                    <td>
                      <div class="flag">
                        <router-link
                          :to="platform.home"
                          class="main-nav"
                        >
                          <img
                            :src="platform.icon"
                            :alt="platform.name"
                            :width="15"
                            class="platform-icon item-icon"
                            :class="{ 'platform-inactive' : isPlatformInactive(platform)}"
                          >
                          <span
                            class="item-text"
                          >
                            {{ platform.name }}
                          </span>
                        </router-link>
                      </div>
                    </td>
                    <!-- Platform Accounts -->
                    <td>
                      <div
                        class="item-text"
                      >
                        {{ getPlatformAccountsSize(platform.id) }}
                      </div>
                    </td>
                    <!-- Platform Actions -->
                    <td>
                      <div v-if="!isPlatformInactive(platform)">
                        <create-user-button
                          :platform="platform"
                        />
                      </div>
                      <div v-else>
                        <activate-platform-button
                          :platform="platform"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- Platforms END -->
    </div>
    <loading v-if="!isReady" />
  </div>
</template>

<script>

import NewPanelButton from "@/components/panel/NewPanelButton"
import CreateUserButton from "@/components/panel/CreateUserButton"
import ActivatePlatformButton from "@/components/panel/ActivatePlatformButton"
import RemovePanelButton from "@/components/panel/RemovePanelButton"

import PanelModel from "@/models/panel"
import PlanInfoMixin from "@/components/shared/mixins/PlanInfoMixin"
import PlatformsStatusMixin from "@/components/shared/mixins/PlatformsStatusMixin"

export default {
  name: "Home",
  components: {
    NewPanelButton,
    CreateUserButton,
    ActivatePlatformButton,
    RemovePanelButton
  },
  mixins: [
    PlanInfoMixin,
    PlatformsStatusMixin
  ],
  data() {
    this.fetchAttr = "fetchAssets"
    return {
      locale: "pt-br"
    }
  },
  computed: {
    isReady() {
      return this.$store.getters["isReady"](this.fetchAttr)
    },
    panels() {
      let panels = this.$store.getters["panel/getPanels"]
      return panels.map(panel => {
        return panel instanceof PanelModel ? panel : new PanelModel(panel)
      })
    },
    platforms() {
      return this.$store.getters["getAllPlatforms"]
    }
  },
  created() {
    if (!this.$store.getters["getAllAccounts"].length || !this.$store.getters["panel/getPanels"].length)
      this.$router.push({ name: "Onboard" })
  },
  methods: {
    getPlatformAccounts(platform_id) {
      return this.activeAccounts.filter((account) => {
        return account.platform === platform_id
      })
    },
    getPlatformAccountsSize(platform_id) {
      return this.getPlatformAccounts(platform_id)? this.getPlatformAccounts(platform_id).length : 0
    }
  }
}
</script>

<style scoped>
.el-range-editor {
  width: 300px !important;
  margin: 0 auto 20px !important
}

.card-pricing.card-raised {
  margin-top: 0 !important;
}

.card-pricing {
  max-height: 400px;
}

.platform-item{
  margin: 4px;
}

  .card-plan-user{
    min-height: 356px;
  }

.card-pricing ul{
  margin: 30px auto 40px;
}
  .card-pricing ul li{
    font-size: 1em;
  }

  .btn-platforms-action{
    margin: 4px;
  }

  .d-sm-block{
    padding: 3px;
  }

  .panels-action-buttons{
    margin-right: 2%;
  }
</style>
