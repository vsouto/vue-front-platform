import http from "@/api"

const apiURI = "/limited-user"

export default {
  getLimitedUsers() {
    return http.get(apiURI)
  },
  getLimitedUser(auth_id) {
    return http.get(apiURI + "/" + auth_id)
  },
  postLimitedUser(limited_user) {
    return http.post(apiURI, limited_user)
  },
  patchLimitedUser(limited_user) {
    return http.patch(apiURI, limited_user)
  },
  deleteLimitedUser(id) {
    return http.delete(apiURI, {
      params: {
        limited_auth_id: id
      }
    })
  }
}
