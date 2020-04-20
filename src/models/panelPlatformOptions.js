class Option {
  constructor(option) {
    this.id = option.id || ""
    this.name = option.name || ""
    this.account_id = option.account_id || option._id
  }
}

class PanelPlatformOptions {
  constructor(obj=[]) {
    let i = 0
    obj.map(o => {
      this[i] = new Option(o)
      i += 1
    })
  }
  clone() {
    return new PanelPlatformOptions({
      ...this
    })
  }
}

export default PanelPlatformOptions