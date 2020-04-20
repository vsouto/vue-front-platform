<template>
  <div>
    <!-- View content or Landing Page View -->
    <el-tooltip
      v-if="getRowActionCost(row, 'offsite_conversion.fb_pixel_view_content')"
      :content="$t('facebook_ads.view_content')"
      class="item"
      effect="dark"
      placement="top-start"
    >
      <span class="mr-2">
        <eye-icon class="text-muted mr-n1" />
        {{ getRowActionCost(row, 'offsite_conversion.fb_pixel_view_content') }}
      </span>
    </el-tooltip>
    <el-tooltip
      v-else-if="getRowActionCost(row, 'landing_page_view')"
      :content="$t('facebook_ads.landing_page_view')"
      class="item"
      effect="dark"
      placement="top-start"
    >
      <span class="mr-2">
        <eye-icon class="text-muted mr-n1" />
        {{ getRowActionCost(row, 'landing_page_view') }}
      </span>
    </el-tooltip>

    <!-- Initiate Checkout -->
    <el-tooltip
      v-if="getRowActionCost(row, 'offsite_conversion.fb_pixel_initiate_checkout')"
      :content="$t('facebook_ads.initiate_checkouts')"
      class="item"
      effect="dark"
      placement="top-start"
    >
      <span class="mr-2">
        <cart-icon class="text-muted mr-n1" />
        {{ getRowActionCost(row, 'offsite_conversion.fb_pixel_initiate_checkout') }}
      </span>
    </el-tooltip>

    <!-- Purchase -->
    <el-tooltip
      v-if="getRowActionCost(row, 'offsite_conversion.fb_pixel_purchase')"
      :content="$t('facebook_ads.purchases')"
      class="item"
      effect="dark"
      placement="top-start"
    >
      <span>
        <gesture-tap-hold-icon class="text-muted mr-n1" />
        {{ getRowActionCost(row, 'offsite_conversion.fb_pixel_purchase') }}
      </span>
    </el-tooltip>
  </div>
</template>

<script>
import EyeIcon from "icons/Eye.vue"
import CartIcon from "icons/Cart.vue"
import GestureTapHoldIcon from "icons/GestureTapHold.vue"
export default {
  components: {
    CartIcon,
    EyeIcon,
    GestureTapHoldIcon
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    row: {
      type: Object,
      required: true
    },
    getRowActionCost: {
      type: Function,
      required: true
    }
  }
}
</script>
