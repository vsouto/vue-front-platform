import LimitedUserService from "@/services/LimitedUserService"

export const fetchLimitedUsers = ({
  commit,
  dispatch,
  rootState
}) => {
  const fetchAttr = "limitedUsers"
  if (!rootState.fetch_control[fetchAttr]) {
    commit("SET_FETCHING", fetchAttr, { root: true })
    return LimitedUserService.getLimitedUsers()
      .then((res) => {
        commit("SET_LIMITED_USERS", res.data.users)
        commit("SET_FETCHED", fetchAttr, { root: true })
      })
      .catch(error => {
        dispatch("error", { fetchAttr, error }, {
          root: true
        })
      })
  }
}
export const createLimitedUser = ({
  commit,
  dispatch
}, limited_user) => {
  return LimitedUserService.postLimitedUser(limited_user)
    .then((res) => {
      commit("ADD_LIMITED_USER", res.data.response)
    })
    .catch(error => {
      dispatch("error", error, {
        root: true
      })
      throw error
    })
}
export const updateLimitedUser = ({
  commit,
  dispatch
}, limited_user) => {
  return LimitedUserService.patchLimitedUser(limited_user)
    .then((res) => {
      commit("NEW_LIMITED_USERS", res.data.response)
    })
    .catch(error => {
      dispatch("error", error, {
        root: true
      })
      throw error
    })
}
export const deleteLimitedUser = ({
  commit,
  dispatch
}, id) => {
  return LimitedUserService.deleteLimitedUser(id)
    .then(() => {
      commit("DEL_LIMITED_USERS", id)
    })
    .catch(error => {
      dispatch("error", error, {
        root: true
      })
      throw error
    })
}
