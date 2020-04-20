import * as mutations from "@/store/modules/hotmart/mutations"
import * as getters from "@/store/modules/hotmart/getters"
import * as actions from "@/store/modules/hotmart/actions"

jest.mock("axios")
jest.mock("auth0-js")

import api from "@/api"

import {
  testDataAccounts
} from "../../data/hotmart"


describe("mutations", () => {
  let state = {
    accounts: testDataAccounts,
    affiliations: [],
    affiliations_fetched_id: null,
    subscriptions: [],
    subscriptions_fetched_id: null
  }

  it("addAccount", () => {
    let account = {
      id: 3,
      name: "devs"
    }
    mutations.addAccount(state, account)
    expect(state.accounts[state.accounts.length - 1]).toEqual(account)
  })

  it("SET_ACCOUNTS", () => {
    let updatedAccounts = testDataAccounts
    updatedAccounts[0].name = "devs"
    mutations.SET_ACCOUNTS(state, updatedAccounts)
    expect(state.accounts).toEqual(updatedAccounts)
  })

  it("updateAccount", () => {
    let account = {
      id: 1,
      name: "devs"
    }
    mutations.updateAccount(state, account)
    expect(state.accounts[0]).toEqual(account)
  })

  it("deleteAccount", () => {
    let account = {
      id: 1,
      name: "devs"
    }
    let id = 2
    mutations.deleteAccount(state, id)
    expect(state.accounts[0]).toEqual(account)
  })

  it("setAffiliations", () => {
    let affiliations = [{
      affiliation_id: 1,
      name: "affiliation"
    }]
    mutations.setAffiliations(state, {
      affiliations: affiliations,
      id: 1
    })
    expect(state.affiliations).toEqual(affiliations)
    expect(state.affiliations_fetched_id).toEqual(1)
  })

  it("setSubscriptions", () => {
    let subscriptions = [{
      subscription_id: 1,
      name: "subscription"
    }]
    mutations.setSubscriptions(state, {
      subscriptions: subscriptions,
      id: 1
    })
    expect(state.subscriptions).toEqual(subscriptions)
    expect(state.subscriptions_fetched_id).toEqual(1)
  })
})

describe("actions", () => {
  let state = {
    accounts: testDataAccounts,
  }

  xit("fetchAccounts when accounts_fetched is false", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    api.get.mockReturnValueOnce(Promise.resolve({
      data: {
        response: testDataAccounts
      }
    }))

    await actions.fetchAccounts({
      commit,
      state,
      dispatch
    })

    expect(commit).toHaveBeenCalledWith("SET_ACCOUNTS", testDataAccounts)

  })

  xit("fetchAccounts when accounts_fetched is true", async () => {
    const commit = jest.fn()

    await actions.fetchAccounts({
      state,
      commit
    })
    expect(commit).not.toHaveBeenCalled()
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

  it("updateAccount", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    let account = {
      id: 1,
      name: "dev"
    }
    await actions.updateAccount({
      commit,
      dispatch
    },
    account
    )
    expect(commit).toHaveBeenCalledWith("updateAccount", account)
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

  it("fetchAffiliations", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    api.get.mockReturnValueOnce(Promise.resolve({
      data: {
        response: []
      }
    }))
    await actions.fetchAffiliations({
      commit,
      state,
      dispatch
    }, 1)

    expect(commit).toHaveBeenCalledWith("setAffiliations", {
      affiliations: [],
      id: 1
    })

  })

  it("fetchSubscriptions", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    api.get.mockReturnValueOnce(Promise.resolve({
      data: {
        response: []
      }
    }))
    await actions.fetchSubscriptions({
      commit,
      state,
      dispatch
    }, 1)

    expect(commit).toHaveBeenCalledWith("setSubscriptions", {
      subscriptions: [],
      id: 1
    })

  })
})

describe("getters", () => {
  let state = {
    accounts: testDataAccounts,
    affiliations: [{
      affiliation_id: 1,
      name: "affiliation"
    }],
    affiliations_fetched_id: 5,
    subscriptions: [{
      subscription_id: 1,
      name: "subscription"
    }],
    subscriptions_fetched_id: 5
  }

  it("getAccountById", () => {
    let id = 1
    expect(getters.getAccountById(state)(id)).toEqual(state.accounts[0])
  })

  it("getAffiliationById ", () => {
    let id = 1
    expect(getters.getAffiliationById(state)(id)).toEqual(state.affiliations[0])
  })

  it("getSubscriptionById ", () => {
    let id = 1
    expect(getters.getSubscriptionById(state)(id)).toEqual(state.subscriptions[0])
  })

  it("affiliations", () => {
    expect(getters.affiliations(state)).toEqual(state.affiliations)
  })

  it("affiliations_fetched_id", () => {
    expect(getters.affiliations_fetched_id(state)).toEqual(state.affiliations_fetched_id)
  })

  it("subscriptions", () => {
    expect(getters.subscriptions(state)).toEqual(state.subscriptions)
  })

  it("subscriptions_fetched_id", () => {
    expect(getters.subscriptions_fetched_id(state)).toEqual(state.subscriptions_fetched_id)
  })
})
