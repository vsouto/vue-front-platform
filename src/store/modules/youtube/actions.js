import YoutubeService from "@/youtube/service"

export const fetchAccounts = ({
  commit,
  state,
  dispatch
}, isUpdate) => {
  if (isUpdate || !state.accounts_fetched) {
    
    return YoutubeService.getAccounts()
      .then((res) => {
        commit("SET_ACCOUNTS", res.data.response)
      })
      .catch(error => {
        dispatch("error", error, {
          root: true
        })
      })
      
  }
}

export const fetchProfiles = ({
  commit,
  state,
  dispatch
}, isUpdate) => {
  if (isUpdate || !state.profiles_fetched) {
    
    return YoutubeService.getProfiles()
      .then((res) => {
        commit("setProfiles", res.data.response)
      })
      .catch(error => {
        dispatch("error", error, {
          root: true
        })
      })
      
  }
}

export const authorizeAccount = (_, {
  scope
}) => {
  return YoutubeService.authorizeAccount(scope)
}

export const addAccount = ({
  commit,
  dispatch
}, account) => {
  return YoutubeService.postAccount(account)
    .then(() => {
      commit("addAccount", account)
    })
    .catch(error => {
      dispatch("error", error, {
        root: true
      })
      throw error
    })
}

export const updateAccount = ({
  commit,
  dispatch
}, account) => {
  return YoutubeService.updateAccount(account)
    .then(() => {
      commit("updateAccount", account)
    })
    .catch(error => {
      dispatch("error", error, {
        root: true
      })
      throw error
    })
}

export const deleteAccount = ({
  commit,
  dispatch
}, id) => {
  return YoutubeService.deleteAccount(id)
    .then(() => {
      commit("deleteAccount", id)
    })
    .catch(error => {
      dispatch("error", error, {
        root: true
      })
      throw error
    })
}

export const deleteProfile = ({
  commit,
  dispatch
}, id) => {
  return YoutubeService.deleteProfile(id)
    .then(() => {
      commit("deleteProfile", id)
    })
    .catch(error => {
      dispatch("error", error, {
        root: true
      })
      throw error
    })
}
