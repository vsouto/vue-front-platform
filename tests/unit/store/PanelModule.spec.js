import * as mutations from "@/store/modules/panel/mutations"
import * as getters from "@/store/modules/panel/getters"
import * as actions from "@/store/modules/panel/actions"

jest.mock("axios")
jest.mock("auth0-js")

import api from "@/api"

import {
  panels
} from "../../data/panel"

describe("mutations", () => {
  let state = {
    fetched: [],
    panels: panels(),
    panel: null,
    panel_edit: null
  }

  xit("ADD_PANEL", () => {
    let panel = {
      panel_id: 3,
      name: "developer"
    }

    mutations.ADD_PANEL(state, panel)
    expect(state.panels[state.panels.length - 1]).toEqual(panel)
  })

  xit("SET_PANELS", () => {
    state.panels = []

    mutations.SET_PANELS(state, panels())

    expect(state.panels).toEqual(panels())
    expect(state.fetched).toBe(true)
  })

  xit("SET_PANEL_EDIT", () => {
    let panel = panels()[0]

    mutations.SET_PANEL_EDIT(state, panel)
    expect(state.panel_edit).toEqual({
      name: "panel",
      panel_id: 1,
      filters: {
        facebook_ads_campaigns: [],
        domains: [],
        params: []
      },
      widgets: [],
      auto_add: [],
      limited_users: [],
      facebook_ads: [],
      google_adsense: [],
      monetizze: []
    })
  })

  xit("PATCH_PANEL", () => {
    let panel = {
      panel_id: 1,
      name: "developer panel"
    }
    mutations.PATCH_PANEL(state, panel)
    expect(state.panels).toEqual([panel, panels()[1]])
  })

  xit("DEL_PANEL", () => {
    let id = 2
    mutations.DEL_PANEL(state, id)
    expect(state.panels).toEqual([{
      panel_id: 1,
      name: "developer panel"
    }])
  })

})

describe("actions", () => {
  let rootState = {
    fetch_control: {},
    errored_control: {}
  }

  xit("fetchPanels when fetched is false", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    api.get.mockReturnValueOnce(Promise.resolve({
      data: {
        response: panels()
      }
    }))

    await actions.fetchPanels({
      commit,
      rootState,
      dispatch
    })
    expect(commit).toHaveBeenCalledWith("SET_PANELS", panels())
    expect(commit).toHaveBeenCalledWith("SET_FETCHED", "panel/fetchPanels", expect.any(Object))
  })

  xit("fetchPanels when fetched", async () => {
    const commit = jest.fn()
    rootState.fetch_control["panel/fetchPanels"] = "fetched"

    await actions.fetchPanels({
      rootState,
      commit
    })
    expect(commit).not.toHaveBeenCalled()
  })

  xit("fetchPanel", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    let id = 1
    api.get.mockReturnValueOnce(Promise.resolve({
      data: {
        response: panels()[0]
      }
    }))

    await actions.fetchPanel({
      commit,
      dispatch
    }, id)
    
    expect(commit).toHaveBeenCalledWith("SET_PANEL", panels()[0])
    
  })

  xit("createPanel", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    const getters = {
      panels: ["panel"]
    }
    let panel = {
      panel_id: 3,
      name: "new developer panel"
    }
    api.post.mockReturnValueOnce(Promise.resolve({
      data: {
        response: panel
      }
    }))

    await actions.createPanel({
      commit,
      dispatch,
      getters
    }, panel)
    expect(commit).toHaveBeenCalledWith("ADD_PANEL", panel)
  })

  xit("updatePanel", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    let panel = {
      panel_id: 2,
      name: "developer panel"
    }
    api.patch.mockReturnValueOnce(Promise.resolve({
      data: {
        response: panel
      }
    }))

    await actions.updatePanel({
      dispatch,
      commit
    }, panel)

    expect(commit).toHaveBeenCalledWith("PATCH_PANEL", panel)
  })

  xit("deletePanel", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    let id = 1

    await actions.deletePanel({
      commit,
      dispatch
    },
    id
    )
    expect(commit).toHaveBeenCalledWith("DEL_PANEL", id)
  })

  xit("setSelectedDate", async () => {
    const commit = jest.fn()
    let selectedDate = {
      end: {},
      start: {}
    }

    await actions.setSelectedDate({
      commit,
    },
    selectedDate
    )
    expect(commit).toHaveBeenCalledWith("SET_SELECTED_DATE", selectedDate)
  })

  xit("fetchPanelOptions", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    let platform = "facebook_ads"

    await actions.fetchPanelOptions({
      rootState,
      commit,
      dispatch
    },
    platform
    )
    expect(commit).toHaveBeenCalledWith("SET_FETCHING", "panelOptions_facebook_ads", expect.any(Object))
    expect(commit).toHaveBeenCalledWith("panel/PANEL_EDITOR_PLATFORM_OPTIONS", expect.any(Object), expect.any(Object))
    expect(commit).toHaveBeenCalledWith("SET_FETCHED", "panelOptions_facebook_ads", expect.any(Object))
  })

  xit("fetchAvailableWidgets", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    api.get.mockReturnValueOnce(Promise.resolve({
      data: {
        response: {}
      }
    }))

    await actions.fetchAvailableWidgets({
      rootState,
      commit,
      dispatch
    }
    )
    expect(commit).toHaveBeenCalledWith("SET_FETCHING", "availableWidgets", expect.any(Object))
    expect(commit).toHaveBeenCalledWith("SET_AVAILABLE_WIDGETS", expect.any(Object))
    expect(commit).toHaveBeenCalledWith("SET_FETCHED", "availableWidgets", expect.any(Object))
  })

  xit("fetchWidget", async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    let payload = {
      panel_id: "1",
      name: "dev",
      data: {}
    }
    api.get.mockReturnValueOnce(Promise.resolve({
      data: {
        response: payload
      }
    }))

    await actions.fetchWidget({
      rootState,
      commit,
      dispatch
    },
    payload
    )
    expect(commit).toHaveBeenCalledWith("SET_FETCHING", "fetchWidget/1/dev", expect.any(Object))
    expect(commit).toHaveBeenCalledWith("SET_WIDGET", expect.any(Object))
    expect(commit).toHaveBeenCalledWith("SET_FETCHED", "fetchWidget/1/dev", expect.any(Object))
  })
})

describe("getters", () => {
  let state = null
  beforeEach(() => {
    state = {
      panels: panels(),
      fetched: ["panels"]
    }
  })

  xit("getPanelById", () => {
    let id = 1
    expect(getters.getPanelById(state)(id)).toEqual(state.panels[0])
  })
})
