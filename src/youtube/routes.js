const basePath = "/youtube"
const absoluteBasePath = process.env.VUE_APP_API_HOSTNAME + basePath

export default {
  AUTHORIZE: absoluteBasePath + "/authorize",
  PROFILES: `${basePath}/load_youtube_credentials`,
  PROFILE: (id) => `${basePath}/delete_credential/${id}`,
  ACCOUNTS: `${basePath}/account`,
  ACCOUNT: (id) => `${basePath}/account/${id}`
}