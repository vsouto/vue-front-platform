import RouteGuard from "@/utils/route-guard"

const dummyGuard = (to, from, next) => next()

const errorGuard = (to, from, next) => next({ name: "Handler"})


describe("RouteGuard tests", () => {
  it("Multiple valid routes", () => {
    const cb = jest.fn()
    const mockedGuard = jest.fn((to, from, next) => next())
    RouteGuard([dummyGuard, mockedGuard])({
      name: "Next"
    }, {
      name: "Prev"
    }, cb)
    expect(mockedGuard).toHaveBeenCalled()
    expect(cb).toHaveBeenCalled()
  })

  it("Multiple routes", () => {
    const cb = jest.fn()
    const mockedGuard = jest.fn((to, from, next) => next())
    RouteGuard([mockedGuard, errorGuard])({
      name: "Next"
    }, {
      name: "Prev"
    }, cb)
    expect(mockedGuard).toHaveBeenCalled()
    expect(cb).toHaveBeenCalledWith({ name: "Handler" })
  })
})
