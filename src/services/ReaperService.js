import http from "@/api"

const reaperBasePath = process.env.VUE_APP_REAPER_API_BASE_URL
const REAPER = {
  LOGINSERVICE: `${reaperBasePath}/pipedrive/services/login`,
  GETPRODUCTS: `${reaperBasePath}/pipedrive/product/getAll`,
  CONFIGUREDPANEL: `${reaperBasePath}/mailchimp/user/panel_config`,
  USER: `${reaperBasePath}/auth0/user`
}

export const loginService = (email) =>  {
  return http.post(REAPER.LOGINSERVICE, {email: email})
}

export const getProducts = () =>  {
  return http.get(REAPER.GETPRODUCTS)
}

export const getUserInfo = () =>  {
  return http.get(REAPER.GETPRODUCTS)
}

export const configuredPanel = (email) =>  {
  return http.post(REAPER.CONFIGUREDPANEL, email)
}

export const updateUser = (app_metadata) =>  {
  return http.patch(REAPER.USER, {app_metadata: app_metadata})
}

export const changePassword = (password) =>  {
  return http.patch(REAPER.USER, {password})
}

export const updateUsermetadata = (campos) =>  {
  return http.patch(REAPER.USER, {user_metadata: campos})
}
