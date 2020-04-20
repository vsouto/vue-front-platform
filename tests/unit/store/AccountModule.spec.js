import * as mutations from "@/store/modules/account/mutations"
import * as getters from "@/store/modules/account/getters"
import * as actions from "@/store/modules/account/actions"

jest.mock("axios")
jest.mock("auth0-js")

import api from "@/api"
import * as auth0 from "@/services/Auth0"

import user from "@/store/modules/account/mocks/user.js"

describe("mutations", () => {
  let state = {
    accessToken: null,
    user: null
  }
  beforeEach(() => {
    state = {
      user: user,
      accessToken: "token",
      expiresAt: 0,
      permissions: ["permissions"]
    }
  })
  it("setAuthResult", () => {
    mutations.setAuthResult(state, {
      accessToken: "token"
    })
    expect(state.accessToken).toEqual("token")
  })

  it("setAuthResult", () => {
    let data = {
      token: "token"
    }
    mutations.setAuthResult(state, data)
    expect(state.accessToken).toEqual(data.accessToken)
  })

  it("setUser", () => {
    let user = {
      user_metadata: {
        firstname: "first",
        lastname: "last"
      }
    }
    mutations.setUser(state, user)
    expect(state.user).toEqual(user)
  })

  xit("logout", () => {
    mutations.logout(state)
    expect(state.accessToken).toEqual(null)
    expect(state.user).toEqual(null)
  })
})

describe("actions", () => {
  it("login", async () => {
    const commit = jest.fn()
    await actions.login({
      commit
    }, "/test")
    expect(commit).toHaveBeenCalledWith("SET_REDIRECT_PATH", "/test")
    expect(auth0.webAuth.authorize).toHaveBeenCalled()
  })

  xit("logout", async () => {
    const commit = jest.fn()
    localStorage["token"] = "token"
    await actions.logout({
      commit
    })
    expect(localStorage["token"]).toBeUndefined()
    expect(commit).toHaveBeenCalled()
    expect(auth0.webAuth.logout).toHaveBeenCalled()
  })

  expect(localStorage["token"]).toBeUndefined()

  it("parseHash", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()

    await actions.handleAuthentication({
      commit,
      dispatch
    })
    expect(auth0.webAuth.parseHash).toHaveBeenCalled()
    // expect(commit).toHaveBeenCalledWith("setAuthResult", expect.any(Object))
  })

  it("fetchUser", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    const rootState = {
      fetch_control: {}
    }
    await actions.fetchUser({commit, dispatch, rootState}, {
      name: "name"
    })
    expect(commit).toHaveBeenCalled()
  })

  xit("updateUser", async () => {
    const commit = jest.fn()
    await actions.updateUser({ commit }, {
      name: "name"
    })
    expect(api.patch).toHaveBeenCalled()
    expect(commit).toHaveBeenCalled()
  })
})

describe("getters", () => {
  let state = null
  beforeEach(() => {
    state = {
      user: user,
      accessToken: "token"
    }
  })
  it("user", () => {
    expect(getters.user(state)).toEqual(state.user)
  })
  it("userName", () => {
    expect(getters.userName(state)).toEqual(state.user.name)
  })
  it("userMetaData", () => {
    expect(getters.userMetaData(state)).toEqual(state.user.user_metadata)
  })
  it("userMetaData", () => {
    expect(getters.token(state)).toEqual("token")
  })
})
