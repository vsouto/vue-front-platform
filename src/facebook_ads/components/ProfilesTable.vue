<template>
  <card>
    <slot name="header">
      <div class="title">
        {{ $t("facebook_ads.profiles") }}
      </div>
    </slot>
    <data-tables
      v-loading="!isReady"
      :data="tableData"
      :current-page="1"
      :page-size="10"
      :pagination-props="{ background: true, pageSizes: [5,10,25] }"
    >
      <!-- Custom Columns -->
      <component
        :is="column"
        v-for="column in tableColumns"
        :key="column.prop"
      />

      <!-- <el-table-column
        key="permissions"
        :label="$t('facebook_ads.permissions')"
        prop="permissions"
      >
        <template slot-scope="props">
          <el-tag
            v-for="p of allowedPermissions(props.row.permissions)"
            :key="p"
            type="secondary"
          >
            {{ p }}
          </el-tag>
        </template>
      </el-table-column> -->

      <!-- Actions -->
      <el-table-column
        key="actions"
        :min-width="isMobile ? 100 : 150"
        prop="actions"
      >
        <template slot-scope="scope">
          <div class="list-center vertical-center">
            <el-tooltip
              v-if="!scope.row.status || scope.row.status === 'ok'"
              :content="$t('facebook_ads.load_business_managers')"
              class="item facebook-step-2"
              effect="dark"
              placement="top-start"
            >
              <base-button
                :icon="isMobile"
                class="mr-2"
                type="primary"
                round
                @click.native="$emit('loadProfileBusinesses', scope.row)"
              >
                <progress-download-icon :class="{'icon-2x': isMobile, 'icon-15x mr-1': !isMobile }" />
                <span v-if="!isMobile">
                  Carregar gerenciadores de negócio
                </span>
              </base-button>
            </el-tooltip>
            <base-button
              v-else
              class="mr-2"
              type="warning"
              round
              link
              disabled
            >
              Sem acesso, necessário autorizar novamente.
            </base-button>
            <delete-button @click.native="deleteProfile(scope.row)" />
          </div>
        </template>
      </el-table-column>
    </data-tables>
  </card>
</template>

<script>
// Icons
import ProgressDownloadIcon from "icons/ProgressDownload.vue"
import MinusCircleIcon from "icons/MinusCircle.vue"

import { isArray } from "util"

export default {
  name: "ProfilesTable",
  components: {
    ProgressDownloadIcon,
    MinusCircleIcon
  },
  props: {
    profiles: {
      type: Array,
      required: true
    },
  },
  data() {
    this.tourName = "facebookBMs"
    this.steps = [
      {
        target:".facebook-step-2",
        content:"<b>Carregue seus gerenciadores de negócio!</b><br>Escolha quais gerenciadores você gostaria de acessar."
      }
    ]
    this.tableColumns = [
      () => import(/* webpackChunkName: "facebook-ads" */ "@/facebook_ads/components/columns/IdColumn"),
      () => import(/* webpackChunkName: "facebook-ads" */ "@/facebook_ads/components/columns/NameColumn"),
    ]
    return {
      isMobile: false
    }
  },
  computed: {
    tableData() {
      return this.profiles
    },
    isReady() {
      return this.$store.getters["isReady"]("facebookAds/profiles")
    }
  },
  mounted() {
    this.isMobile = !!(window.screen.width < 992)
  },
  methods: {
    deleteProfile(row) {
      this.$emit("deleteProfile", row)
    },
    allowedPermissions(row) {
      let permissions = []
      if (isArray(row))
        for (const permission of row)
          !["email", "public_profile"].includes(permission) &&
            permissions.push(this.$t(`facebook_ads.${permission}`))
      return permissions.sort()
    }
  }
}
</script>
