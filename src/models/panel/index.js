import PanelLayout from "@/models/panel/layout"
import WidgetModel from "@/models/widget"

import { all_platforms } from "@/platforms"
import { deepCopy } from "@/utils/index"

export default class PanelModel {

  constructor(panel={}) {
    this.creating = panel.creating || false
    this.id = panel.creating ? "creating" : panel.id
    this.name = panel.name || ""

    this.haveAssets = false
    this.haveWidgets = false

    // platforms
    this.setupPlatforms(panel.platforms)

    // widgets
    this.setupWidgets(panel.widgets)

    // layout
    this.setupLayout(panel.layout)

  }

  clone() {
    return deepCopy(this)
  }

  /**
   * Sets platforms if haveasset ids and sort
   * @param  {Object} platforms
   * Object of arrays like: {facebook_ads: ["a","b"], monetizze: ["c"]}
   *
   */
  setupPlatforms(platforms={}) {
    this.platforms = {}
    for (let platform in platforms) {
      if (platforms[platform] && platforms[platform].length > 0)
        this.platforms[platform] = platforms[platform]
    }
    this.platforms = Object.keys(this.platforms).sort().reduce((a, c) => (a[c] = this.platforms[c], a), {})
    this.setEnabledPlatforms()
  }

  /**
   * Sets enabled platform models on instance
   */
  setEnabledPlatforms() {
    this.enabledPlatforms = Object.freeze(all_platforms.filter(platform => this.platforms[platform.id]))
  }

  /**
   * Updates platform assets on instance
   */
  updatePlatformAssets({id, assets}) {
    if (assets.length)
      this.platforms[id] = assets
    else
      this.platforms[id] = undefined
    this.setEnabledPlatforms()
  }

  /**
   * Sets widget models by array of widget ids
   * @param  {Array} widgets
   *
   */
  setupWidgets(widgets=[]) {
    this.widgets = widgets.map(id => WidgetModel.loadFromId(id))
  }

  /**
   * Returns widget model by id
   * @param  {String} id
   *
   */
  getWidget(id) {
    return this.widgets.find(w => w.id == id)
  }

  /**
   * Sets layout
   * @param  {Array<Object>} layout
   *
   */
  setupLayout(layout=[]) {
    this.layout = new PanelLayout(layout)
    if (this.creating)
      if (layout.length)
        this.widgets.map(widget => {
          this.newWidget(widget)
        })
      else
        this.defaultLayout()
  }

  /**
   * Creates default layout with all widgets
   *
   */
  defaultLayout() {
    WidgetModel.allAvailable.map(widget => {
      this.newWidget(widget, true)
    })
  }

  /**
   * Add widget to panel layout.
   * If addToPanel is true, also pushes widget component to this.widgets
   * @param  {Array<Object>} layout
   * @param  {Boolean} addToPanel
   *
   */
  newWidget(widget, addToPanel=false) {
    if (addToPanel)
      this.widgets.push(widget)
    this.layout.addWidget(widget)
  }

  /**
   * Returns a serialized JSON-like object
   * @returns {Object}
   *
   */
  dump() {
    let serialized = {
      id: this.id,
      name: this.name,
      platforms: this.platforms,
      layout: this.layout.get(),
      widgets: this.layout.getWidgetIds()
    }
    return serialized
  }

  /**
   * Checks if widget is enabled
   * @returns {Boolean}
   */
  isWidgetEnabled(widget) {
    return widget.isEnabled(this.enabledPlatforms)
  }

  /**
   * Sets new layout removing disabled widgets
   *
   */
  removeDisabledWidgets() {
    this.layout.set(
      this.layout.get().filter(item => {
        return this.isWidgetEnabled(this.getWidget(item.i))
      })
    )
  }

  /**
   * Checks if panel is ready to be saved
   * @returns {Boolean}
   */
  canSave() {
    let canSave = true
    if (!this.name) canSave = false
    if (!this.enabledPlatforms.length) canSave = false
    if (!this.widgets.length) canSave = false
    return canSave
  }

  /**
   * Compares with other panel and return true if it's the same
   * @param {PanelModel} other
   * @returns {Boolean}
   */
  isEqual(other) {
    let platformsEqual = true
    all_platforms.map(platform => {
      if (this[platform.id] && other[platform.id] && this[platform.id].toString() != other[platform.id].toString())
        platformsEqual = false
      else if (!this[platform.id] !== !other[platform.id])
        platformsEqual = false
    })
    let layoutEqual = JSON.stringify(this.layout.gridList) == JSON.stringify(other.layout.gridList)
    return (
      this.name == other.name
      && layoutEqual
      && platformsEqual
    )
  }

}
