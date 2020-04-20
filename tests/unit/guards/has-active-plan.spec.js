jest.mock("auth0-js")
import {
  HasActivePlan
} from "@/router/guards/has-active-plan"
import store from "@/store"

describe("HasActivePlan guard", () => {
  it("Should call next with no params if have regular permission", async () => {
    const next = jest.fn()
    const to = {
      matched: [{ meta: { requiresUserPlan: true } }]
    }
    store.commit("account/setAuthResult", {
      scope: "pi:user"
    })
    HasActivePlan(to, undefined, next)
    expect(next).toHaveBeenCalledWith()
  })

  it("Should call next with params if no regular permission but is", async () => {
    const next = jest.fn()
    const to = {
      matched: [{ meta: { requiresUserPlan: true } }]
    }
    store.commit("account/setAuthResult", { scope: "" })
    HasActivePlan(to, undefined, next)
    expect(next).toHaveBeenCalledWith({
      name: "Subscriptions"
    })
  })
})
