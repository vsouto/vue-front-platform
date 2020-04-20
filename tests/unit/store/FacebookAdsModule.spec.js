import * as mutations from "@/store/modules/facebook-ads/mutations"
import * as getters from "@/store/modules/facebook-ads/getters"
import * as actions from "@/store/modules/facebook-ads/actions"

jest.mock("axios")
jest.mock("auth0-js")

import api from "@/api"

import {
  testDataProfiles,
  testDataAccounts,
  testDataBusinesses
} from "../../data/facebook-ads"

describe("mutations", () => {
  let state = {
    accounts: testDataAccounts,
    profiles: [],
    profile_businesses: {},
    business_accounts: {},
    selected_accounts: [],
    campaigns: {},
    adsets: {},
    ads: {},
    creatives: {}
  }

  /* Profiles */

  it("SET_PROFILES", () => {
    mutations.SET_PROFILES(state, testDataProfiles)
    expect(state.profiles).toEqual(testDataProfiles)
  })

  it("SET_PROFILE", () => {
    let newProfile = {
      id: 3,
      name: "dev",
      nickname: "dev"
    }
    mutations.SET_PROFILE(state, newProfile)
    expect(state.profiles[2]).toEqual(newProfile)
  })

  it("DEL_PROFILE", () => {
    mutations.DEL_PROFILE(state, 3)
    expect(state.profiles).toEqual(testDataProfiles)
  })

  it("SET_PROFILE_BUSINESSES", () => {
    mutations.SET_PROFILE_BUSINESSES(state, {
      id: 1,
      businesses: testDataBusinesses
    })
    expect(state.profile_businesses).toEqual({"1": testDataBusinesses})
  })

  it("SET_BUSINESS_ACCOUNTS", () => {
    mutations.SET_BUSINESS_ACCOUNTS(state, {
      profile_id: 1,
      business_id: 1,
      accounts: testDataAccounts
    })
    expect(state.business_accounts).toEqual({
      "1/1": testDataAccounts
    })
  })

  /* Accounts */

  it("SET_ACCOUNTS", () => {
    mutations.SET_ACCOUNTS(state, [
      {
        account_id: 2,
        id: 2,
        nickname: "developer"
      }
    ])
    expect(state.accounts).toEqual(
      [
        testDataAccounts[0],
        {
          account_id: 2,
          id: 2,
          nickname: "developer"
        }
      ]
    )
  })

  it("DEL_ACCOUNT", () => {
    mutations.DEL_ACCOUNT(state, 2)
    expect(state.accounts).toEqual(testDataAccounts)
  })

  it("ADD_SELECTED_ACCOUNT", () => {
    let account = {
      account_id: 1,
      id: 1,
      name: "John"
    }
    mutations.ADD_SELECTED_ACCOUNT(state, account)
    expect(state.selected_accounts).toEqual([account])
  })

  it("DEL_SELECTED_ACCOUNT", () => {
    let account = {
      account_id: 1,
      id: 1,
      name: "John"
    }
    mutations.DEL_SELECTED_ACCOUNT(state, account)
    expect(state.selected_accounts).toEqual([])
  })

  it("SET_SELECTED_ACCOUNTS", () => {
    let accounts = [{
      account_id: 1,
      id: 1,
      name: "John"
    }]
    mutations.SET_SELECTED_ACCOUNTS(state, accounts)
    expect(state.selected_accounts).toEqual(accounts)
  })

  /* Campaigns */

  it("SET_CAMPAIGNS", () => {
    let campaigns = [{
      id: 1,
      name: "campaign"
    }]
    mutations.SET_CAMPAIGNS(state, campaigns)
    expect(state.campaigns).toEqual({"1": {"id": 1, "name": "campaign"}})
  })

  it("UPDATE_CAMPAIGN", () => {
    let campaign = {
      id: 1,
      name: "updated campaign"
    }
    mutations.UPDATE_CAMPAIGN(state, campaign)
    expect(state.campaigns).toEqual({"1": {"id": 1, "name": "updated campaign"}})
  })

  /* Adsets */

  it("SET_ADSETS", () => {
    let adsets = [{
      id: 1,
      name: "adset"
    }]
    mutations.SET_ADSETS(state, adsets)
    expect(state.adsets).toEqual({"1": {"id": 1, "name": "adset"}})
  })

  it("UPDATE_ADSET", () => {
    let adset = {
      id: 1,
      name: "updated adset"
    }
    mutations.UPDATE_ADSET(state, adset)
    expect(state.adsets).toEqual({"1": {"id": 1, "name": "updated adset"}})
  })

  /* Ads */

  it("SET_ADS", () => {
    let ads = [{
      id: 1,
      name: "ad"
    }]
    mutations.SET_ADS(state, ads)
    expect(state.ads).toEqual({"1": {"id": 1, "name": "ad"}})
  })

  it("UPDATE_AD", () => {
    let ad = {
      id: 1,
      name: "updated ad"
    }
    mutations.UPDATE_AD(state, ad)
    expect(state.ads).toEqual({"1": {"id": 1, "name": "updated ad"}})
  })

  /* Creatives */

  it("SET_CREATIVES", () => {
    let creatives = [{
      id: 1,
      name: "creative"
    }]
    mutations.SET_CREATIVES(state, creatives)
    expect(state.creatives).toEqual({"1": {"id": 1, "name": "creative"}})
  })


})

describe("actions", () => {
  let rootState = {
      fetch_control: {},
      errored_control: {}
    },
    state = {
      accounts: [{
        "1": {
          id: 1,
          account_id: 1,
          nickname: "developer"
        },
        "2": {
          id: 2,
          account_id: 2,
          nickname: "dev"
        }
      }],
      profiles: testDataProfiles,
      profile_businesses: {},
      business_accounts: {},
      selected_accounts: [],
      campaigns: {},
      adsets: {},
      ads: {}
    }

  /* Profiles */

  xit("fetchProfiles", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    api.get.mockReturnValueOnce(Promise.resolve({
      data: {
        response: testDataProfiles
      }
    }))

    await actions.fetchProfiles({
      rootState,
      commit,
      dispatch
    })

    expect(commit).toHaveBeenCalledWith("SET_PROFILES", testDataProfiles)

  })

  xit("authorizeProfile", async () => {
    window.open = jest.fn()
    let payload = {
      access_token: "token",
      scope: "scope"
    }
    await actions.authorizeProfile(state, payload)
    expect(window.open).toHaveBeenCalled()
  })

  it("addProfile", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()

    await actions.addProfile({
      commit,
      dispatch
    },
    testDataProfiles[0]
    )
    expect(commit).toHaveBeenCalledWith("SET_PROFILE", testDataProfiles[0])
  })

  it("deleteProfile", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    let id = 1

    await actions.deleteProfile({
      commit,
      dispatch
    },
    id
    )

    expect(commit).toHaveBeenCalledWith("DEL_PROFILE", id)
  })

  xit("fetchProfileBusinesses", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    let profile = {
      access_token: "token"
    }
    api.get.mockReturnValueOnce(Promise.resolve({
      data: {
        response: testDataProfiles
      }
    }))

    await actions.fetchProfileBusinesses({
      commit,
      rootState,
      dispatch
    },
    profile
    )

    expect(commit).toHaveBeenCalledWith("SET_PROFILE_BUSINESSES", expect.any(Object))
    expect(dispatch).not.toHaveBeenCalled()
  })

  it("fetchBusinessAccounts", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    let payload = {
      token: "token",
      business_id: "1"
    }
    api.get.mockReturnValueOnce(Promise.resolve({
      status: 200,
      data: {
        response: []
      }
    }))

    await actions.fetchBusinessAccounts({
      commit,
      rootState,
      dispatch
    },
    payload
    )

    expect(commit).toHaveBeenCalledWith("SET_BUSINESS_ACCOUNTS", expect.any(Object))
    expect(dispatch).not.toHaveBeenCalled()
  })

  /* Accounts */

  it("fetchAccounts", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    api.get.mockReturnValueOnce(Promise.resolve({
      data: {
        response: {}
      }
    }))

    await actions.fetchAccounts({
      commit,
      rootState,
      dispatch
    },
    testDataProfiles
    )

    expect(commit).toHaveBeenCalledWith("SET_ACCOUNTS", {})
    expect(dispatch).not.toHaveBeenCalled()
  })

  xit("addAccounts", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    let payload = {
      profile_id: 1,
      accounts: testDataAccounts
    }

    await actions.addAccounts({
      commit,
      dispatch
    },
    payload
    )
    expect(commit).toHaveBeenCalledWith("SET_ACCOUNTS", expect.any(Array))
  })

  it("deleteAccount", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    let payload = {
      id: 1
    }

    await actions.deleteAccount({
      commit,
      dispatch
    },
    payload
    )

    expect(commit).toHaveBeenCalledWith("DEL_ACCOUNT", expect.anything())
  })

  it("selectAccountToAdd", async () => {
    const commit = jest.fn()
    const getters = {
      getAccountById: jest.fn(() => undefined),
      selected_accounts: []
    }
    let payload = {
      acc: {
        id: 1,
        account_id: 1,
        nickname: "developer"
      },
      toggle: true
    }

    await actions.selectAccountToAdd({
      state,
      commit,
      getters
    },
    payload
    )

    expect(commit).toHaveBeenCalledWith("ADD_SELECTED_ACCOUNT", expect.any(Object))
  })

  /* Account insights */
  // TODO
  // it("fetchAccountInsights")

  /* Remote API: Campaigns */

  it("updateCampaign", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    let payload = {
      profile_id: 1,
      account_id: 1,
      campaign_id: 1,
      campaign: {}
    }
    api.post.mockReturnValueOnce(Promise.resolve({
      data: {
        response: { campaign_id: 1, name: "campaign" }
      }
    }))

    await actions.updateCampaign({
      commit,
      dispatch
    },
    payload
    )


    expect(commit).toHaveBeenCalledWith("UPDATE_CAMPAIGN", { campaign_id: 1, name: "campaign" })

  })

  it("fetchCampaigns", async () => {
    const commit = jest.fn()
    let payload = {
      profile_ids: [1, 2],
      account_id: 1,
      campaign_ids: [1, 2]
    }
    api.get.mockReturnValueOnce(Promise.resolve({
      data: {
        response: [{ id: 1, name: "campaign" }]
      }
    }))

    await actions.fetchCampaigns({
      state,
      commit,
      rootState
    },
    payload
    )
    expect(commit).toHaveBeenCalledWith("SET_CAMPAIGNS", [{ id: 1, name: "campaign" }])
  })

  /* Campaign insights */
  // TODO
  // it("fetchCampaignInsights")

  /* Remote API: Adset */

  it("updateAdset", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    let payload = {
      profile_id: 1,
      account_id: 1,
      adset_id: 1,
      adset: {}
    }
    api.post.mockReturnValueOnce(Promise.resolve({
      data: {
        response: { adset_id: 1, name: "adset" }
      }
    }))

    await actions.updateAdset({
      commit,
      dispatch
    },
    payload
    )


    expect(commit).toHaveBeenCalledWith("UPDATE_ADSET", { adset_id: 1, name: "adset" })

  })

  it("fetchAdsets", async () => {
    const commit = jest.fn()
    let payload = {
      profile_ids: [1, 2],
      account_id: 1,
      campaign_id: 1,
      adsets_ids: [1, 2]
    }
    api.get.mockReturnValueOnce(Promise.resolve({
      data: {
        response: [{ id: 1, name: "adset" }]
      }
    }))

    await actions.fetchAdsets({
      state,
      commit,
      rootState
    },
    payload
    )
    expect(commit).toHaveBeenCalledWith("SET_ADSETS", [{ id: 1, name: "adset" }])
  })

  it("fetchAds", async () => {
    const commit = jest.fn()
    let payload = {
      profile_ids: [1, 2],
      account_id: 1,
      campaign_id: 1,
      adset_id: 1,
      ad_ids: [1, 2]
    }
    api.get.mockReturnValueOnce(Promise.resolve({
      data: {
        response: [{ id: 1, name: "ad" }]
      }
    }))

    await actions.fetchAds({
      state,
      commit,
      rootState
    },
    payload
    )
    expect(commit).toHaveBeenCalledWith("SET_ADS", [{ id: 1, name: "ad" }])
  })

  /* Adset insights */
  // TODO
  // it("fetchAdsetInsights")

  /* Remote API: Ad */

  it("updateAd", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    let payload = {
      profile_id: 1,
      account_id: 1,
      ad_id: 1,
      ad: {}
    }
    api.post.mockReturnValueOnce(Promise.resolve({
      data: {
        response: { ad_id: 1, name: "ad" }
      }
    }))

    await actions.updateAd({
      commit,
      dispatch
    },
    payload
    )


    expect(commit).toHaveBeenCalledWith("UPDATE_AD", { ad_id: 1, name: "ad" })

  })

  /* Ad insights */
  // TODO
  // it("fetchAdInsights")

})

describe("getters", () => {
  let state = null
  beforeEach(() => {
    state = {
      accounts: [
        {
          "1": {
            id: 1,
            account_id: 1,
            nickname: "developer"
          },
          "2": {
            id: 2,
            account_id: 2,
            nickname: "dev"
          }
        }
      ],
      profiles: testDataProfiles,
      profile_businesses: {
        "1": [
          { "accounts": [], "id": 1, "name": "business" }
        ]
      },
      business_accounts: {},
      selected_accounts: [],
      campaigns: {
        "1": {
          id: 1,
          name: "campaign"
        }
      },
      adsets: {
        "1": {
          id: 1,
          name: "adset"
        }
      },
      ads: {
        "1": {
          id: 1,
          name: "ad"
        }
      }
    }
  })

  /* Profiles */
  it("getProfiles", () => {
    expect(getters.getProfiles(state)).toEqual(state.profiles)
  })

  it("getProfileById", () => {
    let id = 2
    expect(getters.getProfileById(state)(id)).toEqual(testDataProfiles[1])
  })

  /* Profile Businesses */

  it("getProfileBusinessesById", () => {
    let profile_id = 1
    expect(getters.getProfileBusinessesById(state)(profile_id)).toEqual([
      { "accounts": [], "id": 1, "name": "business" }
    ])
  })

  /* Profile Businesses Accounts */

  it("getProfileBusinessAccountsById", () => {
    let profile_id = 1
    let business_id = 1
    expect(getters.getProfileBusinessAccountsById(state)(profile_id, business_id)).toEqual([])
  })

  /* Accounts */

  it("getAccountById", () => {
    let id = 1
    expect(getters.getAccountById(state)(id)).toEqual(state.accounts["1"])
  })

  it("getAccounts", () => {
    expect(getters.getAccounts(state)).toEqual(state.accounts)
  })

  /* Campaigns */

  it("getCampaignsByIds", () => {
    let ids = ["1", "2", "3"]
    expect(getters.getCampaignsByIds(state)(ids)).toEqual([{"id": 1, "name": "campaign"}])
  })

  /* Adsets */

  it("getAdsetsByIds", () => {
    let ids = ["1", "2", "3"]
    expect(getters.getAdsetsByIds(state)(ids)).toEqual([{
      id: 1,
      name: "adset"
    }])
  })

  /* Ads */

  it("getAdsByIds", () => {
    let ids = ["1", "2", "3"]
    expect(getters.getAdsByIds(state)(ids)).toEqual([{
      id: 1,
      name: "ad"
    }])
  })
  // TODO: viewType
  // TODO: getViewColumns

})
