import * as mutations from "@/store/modules/monetizze/mutations"
import * as getters from "@/store/modules/monetizze/getters"
import * as actions from "@/store/modules/monetizze/actions"

jest.mock("axios")
jest.mock("auth0-js")

import api from "@/api"

import {
  testDataAccounts
} from "../../data/monetizze"

const accounts = testDataAccounts

window.$notify = jest.fn()

describe("mutations", () => {
  let state = {
    accounts: accounts,
    add_account: {},
    account_products: {},
    token: null
  }

  xit("ADD_ACCOUNT", () => {
    let account = {
      id: 3,
      name: "test3"
    }
    mutations.ADD_ACCOUNT(state, account)

    expect(state.accounts[state.accounts.length - 1]).toEqual(account)
  })

  xit("SET_ACCOUNTS", () => {
    let updatedAccounts = accounts
    updatedAccounts[0].name = "test_updated"

    mutations.SET_ACCOUNTS(state, updatedAccounts)

    expect(state.accounts).toEqual(updatedAccounts)
  })

  it("SET_TOKEN", () => {
    mutations.SET_TOKEN(state, "token")

    expect(state.token).toEqual("token")
  })

  xit("NEW_ACCOUNTS", () => {
    mutations.NEW_ACCOUNTS(state, {
      id: 1,
      name: "test"
    })

    expect(state.accounts).toEqual(accounts)
  })

  it("DEL_ACCOUNT", () => {
    let id = 2
    mutations.DEL_ACCOUNT(state, id)

    expect(state.accounts).toEqual([accounts[0]])
  })

})

describe("actions", () => {
  let rootState = {
      fetch_control: {},
      errored_control: {}
    }, state = {
      accounts: accounts,
      add_account: {},
      account_products: {},
      account: accounts[0],
      token: null
    }

  xit("getAccounts when not fetched", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    state.accounts_fetched = false
    api.get.mockReturnValueOnce(Promise.resolve({
      data: {
        response: accounts
      }
    }))

    await actions.getAccounts({
      commit,
      rootState,
      dispatch
    })
    expect(commit).toHaveBeenCalledWith("SET_FETCHING", "monetizze/getAccounts", expect.any(Object))
    expect(commit).toHaveBeenCalledWith("SET_ACCOUNTS", accounts)
    expect(commit).toHaveBeenCalledWith("SET_FETCHED", "monetizze/getAccounts", expect.any(Object))
  })

  xit("getAccounts when fetched", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    rootState.fetch_control["monetizze/getAccounts"] = "fetched"

    await actions.getAccounts({
      rootState,
      commit,
      dispatch
    })
    expect(commit).not.toHaveBeenCalled()
  })

  xit("addAccount", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()

    await actions.addAccount({
      commit,
      dispatch
    },
    accounts[0]
    )
    expect(commit).toHaveBeenCalledWith("ADD_ACCOUNT", accounts[0])
  })

  it("updateAccount", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    let account = {
      id: 1,
      account_id: 1,
      nickname: "developerUpdated"
    }
    api.patch.mockReturnValueOnce(Promise.resolve({
      data: {
        response: account
      }
    }))

    await actions.updateAccount({
      dispatch,
      commit
    }, account)

    expect(commit).toHaveBeenCalledWith("NEW_ACCOUNTS", account)
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

    expect(commit).toHaveBeenCalledWith("DEL_ACCOUNT", id)
  })

  xit("newAccount", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    let api_key = "key"
    let account = {
      id: 1,
      account_id: 1,
      nickname: "developerUpdated",
      name: "Dev",
      token: "token"
    }
    api.get.mockReturnValueOnce(Promise.resolve({
      data: {
        response: account
      }
    }))

    await actions.newAccount({
      commit,
      dispatch
    }, api_key)

    expect(commit).toHaveBeenCalledWith("ADD_ACCOUNT", account)
  })

})

describe("getters", () => {
  let state = null
  beforeEach(() => {
    state = {
      accounts: accounts,
      accounts_fetched: true
    }
  })

  it("getAccountById", () => {
    let id = accounts[0].id
    expect(getters.getAccountById(state)(id)).toEqual(state.accounts[0])
  })
})
