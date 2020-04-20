import _ from "lodash"
import { all_platforms } from "@/platforms"

/* Fetch Control */

export const isFetching = (state) => (attr) => {
  return state.fetch_control[attr] && state.fetch_control[attr] == "fetching"
}

export const isFetched = (state) => (attr) => {
  return state.fetch_control[attr] && state.fetch_control[attr] == "fetched"
}

export const isReady = (state) => (attr) => {
  return state.fetch_control[attr] && (
    state.fetch_control[attr] != "fetching" ||
    state.fetch_control[attr] == "fetched")
}

export const isErrored = (state) => (attr) => {
  return state.errored_control[attr] && state.errored_control[attr] == "error"
}

/* All platforms credentials */
export const getAllCredentials = (state) => {
  let list = []
  all_platforms.map(platform => {
    const module = platform.module
    let profiles = state[module].profiles
    if (!_.isEmpty(profiles))
      profiles.map(profile => {
        list.push({...profile, platform: platform.id})
      })
  })
  return list
}

/* All platforms accounts */
export const getAllAccounts = (state) => {
  let list = []
  all_platforms.map(platform => {
    const module = platform.module
    let accounts = state[module].accounts
    if (!_.isEmpty(accounts))
      accounts.map(account => {
        list.push({...account, platform: platform.id})
      })
  })
  return list
}

/* Get all platform models */
export const getAllPlatforms = () => {
  return all_platforms
}
