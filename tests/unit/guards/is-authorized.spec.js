jest.mock("auth0-js")
import {
  isAuthorized
} from "@/router/guards/is-authorized"
import store from "@/store"

// import * as auth0 from "@/services/Auth0"

function guardToPromise(guard) {
  return new Promise(resolve => guard({}, {}, resolve))
}

describe("IsAuthorized guard", () => {
  const authenticated = {
    expiresAt: Date.now() + 30000
  }
  const authenticated_expired = {
    expiresAt: Date.now() - 30000
  }
  const unauthenticated = {
    expiresAt: 0
  }

  it("Should allow authenticated", async () => {
    store.commit("account/setAuthResult", authenticated)
    let r = await guardToPromise(isAuthorized)
    expect(r).toBeUndefined()
  })

  it("Should disallow unauthenticated", () => {
    const next = jest.fn()
    store.commit("account/setAuthResult", unauthenticated)
    isAuthorized({}, {
      path: "/test"
    }, next)
    expect(next).toHaveBeenCalledWith({
      name: "Login",
      query: {
        "redirect": "/test"
      }
    })
  })

  it("Should refresh expired token", async () => {
    const next = jest.fn()
    store.dispatch = jest.fn(() => Promise.resolve({
      data: {}
    }))

    store.commit("account/setAuthResult", authenticated_expired)
    isAuthorized({}, {
      path: "/test"
    }, next)
    expect(store.dispatch).toHaveBeenCalledWith("account/refreshExpiredToken")

    store.commit("account/refreshToken", {
      accessToken: "token",
      expiresAt: 30000
    })
    let r = await guardToPromise(isAuthorized)
    expect(r).toBeUndefined()
  })
})
