import * as mutations from "@/store/modules/google-adsense/mutations"
import * as getters from "@/store/modules/google-adsense/getters"
import * as actions from "@/store/modules/google-adsense/actions"

jest.mock("axios")
jest.mock("auth0-js")

import api from "@/api"


import {
  testDataAccounts
} from "../../data/google-adsense"


describe("mutations", () => {
  let state = {
    accounts: [],
  }

  it("addAccount", () => {
    let account = {
      id: 3,
      account_id: 3,
      nickname: "developer"
    }
    mutations.addAccount(state, account)

    expect(state.accounts[state.accounts.length - 1]).toEqual(account)
  })

  it("deleteAccount", () => {
    let id = 3
    mutations.deleteAccount(state, id)

    expect(state.accounts).toEqual([])
  })

  it("SET_ACCOUNTS", () => {
    mutations.SET_ACCOUNTS(state, testDataAccounts)
    expect(state.accounts).toEqual(testDataAccounts)
  })

  it("setAccount", () => {
    mutations.setAccount(state, {
      id: 1,
      account_id: 1,
      nickname: "devs"
    })

    expect(state.account).toEqual({
      id: 1,
      account_id: 1,
      nickname: "devs"
    })
  })

  it("newAccounts", () => {
    mutations.newAccounts(state, {
      id: 1,
      account_id: 1,
      nickname: "developer"
    })

    expect(state.accounts).toEqual(testDataAccounts)
  })

})

describe("actions", () => {
  let rootState = {
      fetch_control: {},
      errored_control: {}
    }, state = {
      accounts: testDataAccounts,
      account: {},
      accounts_fetched: false
    }

  xit("fetchAccounts when not fetched", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    state.accounts_fetched = false
    api.get.mockReturnValueOnce(Promise.resolve({
      data: {
        response: testDataAccounts
      }
    }))

    await actions.fetchAccounts({
      commit,
      rootState,
      dispatch
    })
    expect(commit).toHaveBeenCalledWith("SET_FETCHING", "googleAdsense/fetchAccounts", expect.any(Object))
    expect(commit).toHaveBeenCalledWith("SET_ACCOUNTS", testDataAccounts)
    expect(commit).toHaveBeenCalledWith("SET_FETCHED", "googleAdsense/fetchAccounts", expect.any(Object))
  })

  xit("fetchAccounts when already fetched", async () => {
    const commit = jest.fn()
    rootState.fetch_control["googleAdsense/fetchAccounts"] = "fetched"

    await actions.fetchAccounts({
      rootState,
      commit
    })
    expect(commit).not.toHaveBeenCalled()
  })

  it("authorizeAccount", async () => {
    window.open = jest.fn()
    let payload = {
      token: "token",
      scope: "scope"
    }
    await actions.authorizeAccount(state, payload)
  })

  it("addAccount", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()

    await actions.addAccount({
      commit,
      dispatch
    },
    testDataAccounts[0]
    )
    expect(commit).toHaveBeenCalledWith("addAccount", testDataAccounts[0])
  })

  it("deleteAccount", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    let id = 1

    await actions.deleteAccount({
      commit,
      dispatch
    },
    id
    )

    expect(commit).toHaveBeenCalledWith("deleteAccount", id)
  })

})

describe("getters", () => {
  let state = null
  beforeEach(() => {
    state = {
      accounts: testDataAccounts
    }
  })

  it("getAccountById", () => {
    let id = 1
    expect(getters.getAccountById(state)(id)).toEqual(state.accounts[0])
  })

  it("getAccounts", () => {
    expect(getters.getAccounts(state)).toEqual(state.accounts)
  })
})
