import {
  auth
} from "../../tests/data/user"

import {account} from "../../tests/data/facebook-ads"

export default {
  WebAuth: class {
    constructor() {
      this.authorize = jest.fn()
      this.client = {
        userInfo: jest.fn((token, cb) => cb(null, {
          email: "email.com"
        }))
      }

      this.parseHash = jest.fn(cb => cb(null, auth))
      this.client = {
        userInfo: jest.fn((token, cb) => cb(null, { name: account }))
      }
    }
  }
}
