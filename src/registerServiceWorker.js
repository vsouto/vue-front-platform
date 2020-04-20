/* eslint-disable no-console */

import { register } from "register-service-worker"

// ! Need more work.
// if (process.env.VUE_APP_ENV === 'production' || process.env.VUE_APP_ENV === 'development') {
const canRegister = false
if (canRegister) {
  register(`${process.env.VUE_APP_HOSTNAME}/service-worker.js`, {
    registrationOptions: {
      scope: process.env.VUE_APP_HOSTNAME
    },
    ready() {
      console.log(
        "App is being served from cache by a service worker.\n" +
					"For more details, visit https://goo.gl/AFskqB"
      )
    },
    registered() {
      console.log("Service worker has been registered.")
    },
    cached() {
      console.log("Content has been cached for offline use.")
    },
    updatefound() {
      console.log("New content is downloading.")
    },
    updated() {
      console.log("New content is available; please refresh.")
    },
    offline() {
      console.log("No internet connection found. App is running in offline mode.")
    },
    error(error) {
      console.error("Error during service worker registration:", error)
    }
  })
}
