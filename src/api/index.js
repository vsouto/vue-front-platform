/* eslint-disable no-console */
import axios from "axios"
import { throttleAdapterEnhancer } from "axios-extensions"
export const CancelToken = axios.CancelToken

const axiosInstance = axios.create({
  timeout: 30 * 1000,
  adapter: throttleAdapterEnhancer(axios.defaults.adapter, { threshold: 3 * 1000 })
  // adapter: throttleAdapterEnhancer(
  // 	cacheAdapterEnhancer(axios.defaults.adapter, {
  // 		threshold: 3 * 1000
  // 	})
  // )
  // adapter: cacheAdapterEnhancer(axios.defaults.adapter)
})
axiosInstance.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    const token = localStorage.getItem("token")
    if (token)
      config.headers["Authorization"] = token
    
    return config
  },
  function(error) {
    console.error("Axios Interceptor Request Error", error)
    // Do something with request error
    return Promise.reject(error)
  }
)
axiosInstance.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response
  },
  function(error) {
    console.error("Axios Interceptor Response Error", error)
    // Do something with response error
    if (error.response) {
      const originalRequest = error.config
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("error.response", error.response)

      if (error.response.status == 401) {
          return new Promise((res) => {
            import("@/store").then(({default: store}) => {
              /* webpackPrefetch: true */
              /* webpackPreload: true */
              /* webpackChunkName: "account.module" */
              /* webpackMode: "lazy" */
              const token = store.dispatch("account/refreshExpiredToken")
              if (!token) {
                store.dispatch("account/logout")
              } else {
                originalRequest.headers["Authorization"] = token
                res(axiosInstance(originalRequest))
              }
            })
          })
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error("error.request ", error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("error.message", error.message)
    }
    // console.debug("Error config", error.config)
    return Promise.reject(error)
  }
)

export default axiosInstance
