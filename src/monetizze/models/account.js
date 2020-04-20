import { deepCopy } from "@/utils/index"

export default class AccountModel {
  constructor(obj={}) {
    this.updateFromObject(obj)
  }
  clone() {
    return deepCopy(this)
  }
  updateFromObject(o) {
    this.id = o.id
    this.impediment = o.impediment
    this.impediment_reason = o.impediment_reason
    this.api_key = o.api_key
    this.name = o.name
    this.impediment = o.impediment
    this.impediment_reason = o.impediment_reason
    this.token_expiry_date = o.token_expiry_date
    this.picture = o.picture
    this.postback_url = o.postback_url
    this.products = o.products || []
  }
}
