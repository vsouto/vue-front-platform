<template>
  <el-row
    v-if="canPaginate"
    slot="footer"
  >
    <el-col :span="4">
      <p
        class="card-category"
      >
        {{ from + 1 }} - {{ to }} / {{ total }} items
      </p>
    </el-col>
    <el-col :span="12">
      <base-pagination
        v-model="pagination.currentPage"
        :per-page="pagination.perPage"
        :total="total"
        class="pagination-no-border"
      />
    </el-col>
    <el-col :span="8">
      <el-select
        v-model="pagination.perPage"
        :placeholder="$t('common.perPage')"
        class="select-primary mb-3 pagination-select"
      >
        <el-option
          v-for="item in pagination.perPageOptions"
          :key="item"
          :label="item"
          :value="item"
          class="select-primary"
        />
      </el-select>
    </el-col>
  </el-row>
</template>
<script>
import { BasePagination } from "@/components/lib"
export default {
  components: {
    BasePagination,
  },
  props: {
    canPaginate: {
      type: Boolean,
      default: false
    },
    searchedData: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: 0
    },
    pagination: {
      type: Object,
      default: () => {
        return {
          perPage: 5,
          currentPage: 1,
          perPageOptions: [5, 10, 25, 50, 100],
          total: 0
        }
      }
    },
    from: {
      type: Number,
      default: 0
    },
    to: {
      type: Number,
      default: 0
    }
  }
}
</script>
