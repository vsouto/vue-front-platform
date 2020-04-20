class PlatformModel {
  constructor(platform={}) {
    this.service = platform.service
    this.view = platform.view
    this.home = platform.home
    this.module = platform.module || {}

    this.name = platform.name || ""
    this.id = platform.id || ""
    this.icon = platform.icon || ""
    this.color = platform.color || ""

    this.subMenus = platform.subMenus || false

    this.spend_attr = platform.spend_attr || null
    this.earn_attr = platform.earn_attr || null
    this.attr = this.spend_attr || this.earn_attr

    this.filters = platform.filters || false

    this.statsModel = platform.statsModel
    this.tableColumns = platform.tableColumns

    this.views = platform.views || []
  }

}

export default PlatformModel
