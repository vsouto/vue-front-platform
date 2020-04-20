// import { spend_platforms, earn_platforms } from "@/platforms"
import WIDGETS from "@/widgets"
import { deepCopy } from "@/utils"


class WidgetModel {
  constructor(widget={}) {
    this.updateFromObject(widget)
  }
  static loadFromId(id) {
    const index = WIDGETS.findIndex(w => w.id === id)
    let widgetObj = WIDGETS[index] || {}
    return new WidgetModel(widgetObj)
  }
  static allAvailable = WIDGETS.map(widget => new WidgetModel(widget))
  clone() {
    return deepCopy(this)
  }
  updateFromObject(o) {
    this.id = o.id
    this.compare_id = o.compare_id
    this.name = o.name || "",
    this.description = o.description || "",
    this.label = o.label || "",
    this.img = o.img || "",
    this.type = o.type,
    this.typeName = o.typeName || "",
    this.enabled = o.enabled || false,
    this.customDate = o.customDate || false,
    this.dates = o.dates || [],
    this.compareDates = o.compareDates || [],
    this.widthUnits = o.widthUnits
    this.heightUnits = o.heightUnits
    this.minWidth = o.minWidth || this.widthUnits
    this.minHeight = o.minHeight || this.heightUnits
    this.rules = o.rules || {},
    this.earn_platforms = o.earn_platforms || null
    this.spend_platforms = o.spend_platforms || null
    this.platforms = []
    this.component = o.component
    this.childComponent = o.childComponent
    this.unavailable_reason = null

    if (this.earn_platforms) this.earn_platforms.map(p => this.platforms.push(p))
    if (this.spendplatforms) this.spendplatforms.map(p => this.platforms.push(p))

    this.setRules()
  }
  setRules() {
    // This widget will only be available
    // if have at least one earn and spend platform
    // ! this.rules.spend_and_earn_platform

    // This widget will only be available
    // if have these earn_platforms
    // ! this.rules.earn_platforms
    this.rules.earn_platforms = []
    if (this.earn_platforms) {
      for (let platformName of this.earn_platforms)
        this.rules.earn_platforms.push(platformName)
    }
    // This widget will only be available
    // if have these earn_platforms
    // ! this.rules.spend_platforms
    this.rules.spend_platforms = []
    if (this.spend_platforms) {
      for (let platformName of this.spend_platforms)
        this.rules.spend_platforms.push(platformName)
    }
  }
  grid() {
    return {
      i: this.id,
      w: this.widthUnits,
      minW: this.minWidth,
      h: this.heightUnits,
      minH: this.minHeight,
      x: 0,
      y: 0
    }
  }
  isEnabled(enabledPlatforms) {
    enabledPlatforms
    return true
    // // this.unavailable_reason = null
    // let enabled = false,
    //   earnPlatforms = enabledPlatforms.filter(platform => {
    //     return earn_platforms.filter(p => p.id == platform.id).length
    //   }),
    //   spendPlatforms = enabledPlatforms.filter(platform => {
    //     return spend_platforms.filter(p => p.id == platform.id).length
    //   })

    // if (this.rules.spend_and_earn_platform)
    //   if (!Array(earnPlatforms).length || !Array(spendPlatforms).length) {
    //     // this.unavailable_reason = "spend_and_earn_platform"
    //     return false
    //   }

    // let earnOK = this.rules.earn_platforms.length == 0
    // this.rules.earn_platforms.map(platform => {
    //   if (earnPlatforms.map(p => p.id).includes(platform)) {
    //     earnOK = true
    //   } else {
    //     // this.unavailable_reason = platform
    //   }
    // })

    // let spendOK = this.rules.spend_platforms.length == 0
    // this.rules.spend_platforms.map(platform => {
    //   if (spendPlatforms.map(p => p.id).includes(platform)) {
    //     spendOK = true
    //   } else {
    //     // this.unavailable_reason = platform
    //   }
    // })

    // enabled = earnOK && spendOK
    // // if (!earnOK && !this.unavailable_reason)
    // //   this.unavailable_reason = "earn_platforms"
    // // if (!spendOK && !this.unavailable_reason)
    // //   this.unavailable_reason = "spend_platforms"
    // return enabled
  }
}

WidgetModel.widgets = WIDGETS.map(w => new WidgetModel(w))
WidgetModel.byType = {}
WidgetModel.widgets.map(w => {
  if (WidgetModel.byType[w.type] === undefined)
    WidgetModel.byType[w.type] = {
      id: w.type,
      name: w.typeName,
      widgets: [],
    }
  WidgetModel.byType[w.type].widgets.push(w)
})

export default WidgetModel
