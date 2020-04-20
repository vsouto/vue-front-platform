import Vue from "vue"
import VueI18n from "vue-i18n"
Vue.use(VueI18n)

import pt from "./locales/pt.json"
import en from "./locales/en.json"

function loadLocaleMessages() {
  const messages = {
    pt: pt,
    en: en
  }
  return messages
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || "en",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  messages: loadLocaleMessages()
})
