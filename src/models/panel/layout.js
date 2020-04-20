import { deepCopy } from "@/utils/index"

class PanelLayout {
  static columns = 12
  static rowHeight = 37
  static margin = [8, 8]

  constructor(layout=[]) {
    this.columns = PanelLayout.columns
    this.rowHeight = PanelLayout.rowHeight
    this.gridList = []
    this.set(layout)
  }

  /**
   * Calculates x and y of last grid added.
   *
   */
  calculateLayoutUnits() {
    let x = 0, y = 0
    if (this.gridList.length) {
      let lastItem = this.gridList[this.gridList.length - 1],
        lastXwithWidth = lastItem.x + lastItem.w,
        lastY = lastItem.y
      x = lastXwithWidth >= this.columns ? 0 : lastXwithWidth
      y = lastXwithWidth >= this.columns ? lastY + lastItem.h : lastY
    }
    this.currentLayoutX = x
    this.currentLayoutY = y
  }

  /**
   * Get new grid-widget item to be inserted in layout.
   * @param  {WidgetModel} widget
   * @returns {Object}
   *
   */
  newGridItem(widget) {
    this.calculateLayoutUnits()
    return {
      x: this.currentLayoutX,
      y: this.currentLayoutY,
      w: widget.widthUnits || 6,
      h: widget.heightUnits || 6,
      i: widget.id,
      minW: widget.minWidth,
      minH: widget.minHeight,
    }
  }

  /**
   * Return layout array of grid objects
   * @returns {Array<Object>}
   *
   */
  get() {
    return deepCopy(this.gridList)
  }

  /**
   * Set layout
   * @param {Array} layout
   *
   */
  set(layout=[]) {
    if (!layout || !layout.length) return
    this.gridList = layout
    this.calculateLayoutUnits()
  }

  /**
   * Add widget to layout
   * @param {WidgetModel} widget
   *
   */
  addWidget(widget) {
    this.gridList.push(this.newGridItem(widget))
  }

  /**
   * Remove widget from layout
   * @param {WidgetModel} widget
   *
   */
  removeWidget(widgetId) {
    this.gridList = this.get().filter(item => item.i != widgetId)
  }

  /**
   * Remove all widgets
   *
   */
  removeAllWidgets() {
    this.gridList = []
  }

  /**
   * Return widget ids of current layout
   * @returns {Array<String>} Array of widget ids
   *
   */
  getWidgetIds() {
    return this.gridList.map(item => {
      return item.i
    })
  }

}

export default PanelLayout
