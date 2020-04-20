import Vue from "vue"
import VueRouter from "vue-router"
import VueMoment from "vue-moment"
import moment from "moment-timezone"
import BootstrapVue from "bootstrap-vue"
import fullscreen from "vue-fullscreen"
import Clipboard from "v-clipboard"
import { VueFunnelGraph } from "vue-funnel-graph-js"
import VueDataTables from "vue-data-tables"
import VueTour from "vue-tour-animated"

// Error tracking libs
// import LogRocket from "logrocket"
// import * as Sentry from "@sentry/browser"
// import * as Integrations from "@sentry/integrations"

// if (process.env.VUE_APP_ENV != "local") {
//   LogRocket.init("exojoi/dev-apppainelcombr")
//   const SENTRY_DSN = process.env.VUE_APP_SENTRY_DSN
//   if (SENTRY_DSN) {
//     Sentry.init({
//       dsn: SENTRY_DSN,
//       integrations: [new Integrations.Vue({Vue, attachProps: true})],
//       debug: process.env.VUE_APP_ENV != "production",
//       environment: process.env.VUE_APP_ENV,
//       release: "release-" + (process.env.VUE_APP_RELEASE || new Date().toISOString()),
//       ignoreUrls: [
//         /extensions\//i,
//         /^chrome:\/\//i,
//         /^chrome-extensions:\/\//i
//       ],
//       beforeSend: (event) => {
//         // TODO see if we have i18n, currently its EN
//         // Check if it is an exception -> Show report dialog
//         // event.exception && Sentry.showReportDialog()
//         return event
//       }
//     })
//     LogRocket.getSessionURL(sessionURL => {
//       Sentry.configureScope(scope => {
//         scope.setExtra("sessionURL", sessionURL)
//       })
//     })
//   }
// }

// CSS for libs
import "icons/styles.css" //vue-material-design-icons
import "vue-tour-animated/dist/vue-tour-animated.css" //vue-tour

// Black Dashboard Theme
import DashboardPlugin from "@/plugins/dashboard-plugin"

//project files
import store from "@/store"
import http from "@/api"
import router from "@/router"
import i18n from "@/i18n"

// Plugin setup
Vue.use(DashboardPlugin)
Vue.use(VueRouter)
Vue.use(VueMoment, {
  moment
})
Vue.use(BootstrapVue)
Vue.use(fullscreen)
Vue.use(Clipboard)
Vue.use(VueTour)
Vue.use(VueDataTables)

// Axios Http Module
Vue.prototype.$http = http

// Directive setup
import VPicture from "@/directives/picture"
Vue.directive("pic", VPicture)

/* START ----- Global Components */
import { Tag, Row, Col, Input,
  InputNumber, Tooltip, Popover,
  Table, TableColumn, Select,
  Option, Pagination, Button } from "element-ui"
import { Badge } from "@/components/lib"
import LoadingAnimation from "@/components/shared/LoadingAnimation"
import FullscreenToggle from "@/components/shared/FullscreenToggle"
import GoBack from "@/components/shared/GoBack"
import AddButton from "@/components/shared/AddButton"
import EditButton from "@/components/shared/EditButton"
import DeleteButton from "@/components/shared/DeleteButton"
import RefreshButton from "@/components/shared/RefreshButton"
import CopyToClipboardButton from "@/components/shared/CopyToClipboardButton"

Vue.component("el-tag", Tag)
Vue.component("el-row", Row)
Vue.component("el-col", Col)
Vue.component("el-input", Input)
Vue.component("el-input-number", InputNumber)
Vue.component("el-tooltip", Tooltip)
Vue.component("el-popover", Popover)
Vue.component("el-table", Table)
Vue.component("el-table-column", TableColumn)
Vue.component("el-select", Select)
Vue.component("el-pagination", Pagination)
Vue.component("el-option", Option)
Vue.component("el-button", Button)

Vue.component("loading", LoadingAnimation)
Vue.component("fullscreen-toggle", FullscreenToggle)
Vue.component("go-back", GoBack)
Vue.component("add-button", AddButton)
Vue.component("edit-button", EditButton)
Vue.component("delete-button", DeleteButton)
Vue.component("copy-clipboard-button", CopyToClipboardButton)
Vue.component("refresh-button", RefreshButton)
Vue.component("badge", Badge)
Vue.component("vue-funnel-graph", VueFunnelGraph)
/* END ----- Global Components */

/* START ----- Global Icons */
import PlusIcon from "icons/Plus.vue"
import PencilIcon from "icons/Pencil.vue"
import ContentCopyIcon from "icons/ContentCopy.vue"
import DeleteIcon from "icons/Delete.vue"
import CloseCircleIcon from "icons/CloseCircle.vue"
import LockClockIcon from "icons/LockClock.vue"
import RefreshIcon from "icons/Refresh.vue"

Vue.component("add-icon", PlusIcon)
Vue.component("edit-icon", PencilIcon)
Vue.component("delete-icon", DeleteIcon)
Vue.component("close-circle-icon", CloseCircleIcon)
Vue.component("copy-icon", ContentCopyIcon)
Vue.component("lock-clock-icon", LockClockIcon)
Vue.component("refresh-icon", RefreshIcon)
/* END ----- Global Icons */

Vue.config.performance = true

window.vuex = store

// App initialization

import App from "./App.vue"

new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
  store,
  i18n
})

/* eslint-disable no-new */
