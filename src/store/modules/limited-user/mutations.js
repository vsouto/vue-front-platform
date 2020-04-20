export const ADD_LIMITED_USER = (state, limited_user) => {
  state.limited_users.push(limited_user)
}
export const SET_LIMITED_USERS = (state, limited_users) => {
  state.limited_users = limited_users
  state.fetched = true
}
export const NEW_LIMITED_USERS = (state, limitedUser) => {
  state.limited_users = state.limited_users.map(user =>
    user.user_id == limitedUser.user_id ? limitedUser : user)
}
export const DEL_LIMITED_USERS = (state, id) => {
  const index = state.limited_users.findIndex(o => o.user_id === id)
  if (index !== -1) {
    state.limited_users.splice(index, 1)
  }
}
