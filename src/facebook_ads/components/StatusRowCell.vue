<template>
  <el-tooltip
    :content="tooltip"
    class="item"
    effect="dark"
    placement="top-start"
    @mouseover.native="isHovering(true)"
    @mouseout.native="isHovering(false)"
  >
    <base-button
      :loading="loading"
      class="btn-link"
      type="primary"
      icon
      round
      @click.native="handleEditStatus(index, row)"
    >
      <span v-if="hovering">
        <play-circle-icon
          v-if="row.status == 'PAUSED'"
          class="icon-2x"
        />
        <pause-circle-icon
          v-if="row.status == 'ACTIVE'"
          class="icon-2x"
        />
      </span>
      <span v-else>
        <pause-circle-icon
          v-if="row.status == 'PAUSED'"
          class="icon-2x"
        />
        <play-circle-icon
          v-if="row.status == 'ACTIVE'"
          class="icon-2x"
        />
      </span>
    </base-button>
  </el-tooltip>
</template>

<script>
import PlayCircleIcon from "icons/PlayCircle.vue"
import PauseCircleIcon from "icons/PauseCircle.vue"
import swal from "sweetalert2"
export default {
  components: {
    PlayCircleIcon,
    PauseCircleIcon,
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
    callback: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      hovering: false
    }
  },
  computed: {
    tooltip() {
      return this.row.status == "ACTIVE"
        ? this.$t("common.pause")
        : this.$t("common.enable")
    }
  },
  methods: {
    isHovering(v) {
      setTimeout(() => {
        this.hovering = v
      }, 100)
    },
    handleEditStatus(index, row) {
      swal({
        title: `${
          row.status == "ACTIVE"
            ? this.$t("common.pause")
            : this.$t("common.enable")
        }`,
        html: row.name,
        showCancelButton: true,
        confirmButtonText: this.$t("common.confirm"),
        confirmButtonClass: "btn btn-primary btn-fill",
        cancelButtonText: this.$t("common.cancel"),
        cancelButtonClass: "btn btn-secondary btn-simple btn-fill",
        buttonsStyling: false
      }).then(res => {
        if (res.value) {
          this.loading = true
          const newValue = row.status == "ACTIVE" ? "PAUSED" : "ACTIVE"
          this.callback(newValue, row).then(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>
