<template>
  <div class="animated fadeIn">
    <div id="Youtube">
      <loading v-show="isLoading || !fetched" />
      <div class="col-12 huhu">
        <b-card
          v-if="fetched"
          no-body
          header="Contas"
          header-tag="h5"
        >
          <base-input v-if="profiles && profiles.length > 5">
            <el-input
              v-model="searchQuery"
              :placeholder="$t('table.search')"
              type="search"
              class="mb-1 mt-1 search-input"
              clearable
              prefix-icon="el-icon-search"
              aria-controls="datatables"
            />
          </base-input>
          <el-table :data="queriedData">
            <el-table-column
              key="id"
              min-width="100"
              prop="id"
              label="id"
            >
              <template slot-scope="scopeData">
                {{ scopeData.row.id }}
              </template>
            </el-table-column>

            <el-table-column
              key="name"
              :label="$t('common.name')"
              min-width="100"
              prop="name"
            >
              <template slot-scope="scopeData">
                <img
                  v-if="scopeData.row.picture"
                  :src="scopeData.row.picture"
                  height="30"
                >
                {{ scopeData.row.name }}
              </template>
            </el-table-column>

            <el-table-column
              key="account_id"
              :label="$t('youtube.account_id')"
              min-width="100"
              prop="accounts"
            >
              <template slot-scope="scopeData">
                {{ scopeData.row.accounts ? scopeData.row.accounts[0] : '' }}
              </template>
            </el-table-column>

            <el-table-column
              key="actions"
              :label="$t('common.actions')"
              min-width="100"
              prop="actions"
            >
              <template slot-scope="scopeData">
                <delete-button @click.native="setProfileToDelete(scopeData.row)" />
              </template>
            </el-table-column>
          </el-table>
          <div
            v-if="profiles && profiles.length > 5"
            slot="footer"
            class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
          >
            <div class>
              <p
                class="card-category"
              >
                {{ $t("table.showing") }} {{ from + 1 }} {{ $t("table.to") }} {{ to }} {{ $t("table.of") }} {{ total }}
              </p>
            </div>
            <el-select
              v-model="pagination.perPage"
              class="select-primary mb-3 pagination-select"
              placeholder="Per page"
            >
              <el-option
                v-for="item in pagination.perPageOptions"
                :key="item"
                :label="item"
                :value="item"
                class="select-primary"
              />
            </el-select>
            <base-pagination
              v-model="pagination.currentPage"
              :per-page="pagination.perPage"
              :total="total"
              class="pagination-no-border"
            />
          </div>
        </b-card>

        <card style="width: 20rem;">
          <h4 class="card-title">
            Adicionar
          </h4>
          <base-button
            class="btn btn-primary w-100"
            @click="authorizeNewAccount(scope)"
          >
            <i
              class="cuis-plus-square fa fa-lg fa-plus"
              aria-hidden="true"
            />
            Autorizar nova conta
          </base-button>
        </card>
      </div>

      <!-- Deleting Modal -->
      <youtube-modal
        ref="youtubeRemove"
        :account-name="profileDelete.name"
        :loading="loadingBtn"
        @submit="remove(profileDelete.id)"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-shadow */
import OAuthCallbackMixin from "@/components/shared/mixins/OAuthCallbackMixin"
import YoutubeModal from "@/youtube/components/modal"
import { success, error } from "@/constants/notifications"
import { Table, TableColumn, Select, Option } from "element-ui"
import { BasePagination } from "@/components/lib"
import Fuse from "fuse.js"

export default {
  name: "Youtube",
  components: {
    YoutubeModal,
    BasePagination,
    "el-select": Select,
    "el-option": Option,
    "el-table": Table,
    "el-table-column": TableColumn
  },
  mixins: [
    OAuthCallbackMixin
  ],
  data() {
    return {
      scope: "youtube.readonly",
      profileDelete: {},
      loadingBtn: false,
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      searchQuery: "",
      propsToSearch: ["id"],
      searchedData: [],
      fuseSearch: null
    }
  },
  computed: {

    accounts() {
      return this.$store.getters["youtube/getAccounts"]
    },
    profiles() {
      return this.$store.getters["youtube/profiles"]
    },
    fetched() {
      return this.$store.getters["youtube/profiles_fetched"]
    },
    queriedData() {
      let result = this.profiles
      if (this.searchedData.length > 0) {
        result = this.searchedData
      }
      return result.slice(this.from, this.to)
    },
    to() {
      let highBound = this.from + this.pagination.perPage
      if (this.total < highBound) {
        highBound = this.total
      }
      return highBound
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1)
    },
    total() {
      return this.searchedData.length > 0
        ? this.searchedData.length
        : this.profiles.length
    }
  },
  watch: {
    profileDelete(account) {
      if (account && account.id) this.$refs.youtubeRemove.show()
    },
    searchQuery(value) {
      this.search(value)
    }
  },
  created() {
    this.$store.dispatch("youtube/fetchAccounts").catch(() => {
      this.$notify(error.fetchAccounts)
    })
    this.$store.dispatch("youtube/fetchProfiles").catch(() => {
      this.$notify(error.fetchProfiles)
    })
  },
  methods: {
    setProfileToDelete(profile) {
      this.profileDelete = profile
    },
    authorizeNewAccount(scope) {
      this.$store.dispatch("youtube/authorizeAccount", {
        token: this.$store.getters["account/token"],
        scope: scope
      })
    },
    async remove(id) {
      this.loadingBtn = true
      try {
        await this.$store
          .dispatch("youtube/deleteProfile", id)
          .then(() => {
            this.$notify(success.deleteProfile)
          })
          .catch(() => {
            this.$notify(error.deleteProfile)
          })
        this.$refs.youtubeRemove.hide()
      } catch (error) {
        // console.log("Failed to delete account, error: ", error)
      } finally {
        this.loadingBtn = false
      }
    },
    search(value) {
      let result = this.profiles
      if (value !== "") {
        if (!this.fuseSearch) {
          this.fuseSearch = new Fuse(this.profiles, {
            keys: this.propsToSearch,
            threshold: 0.3
          })
        }
        result = this.fuseSearch.search(value)
      }
      this.searchedData = result
    }
  }
}
</script>
