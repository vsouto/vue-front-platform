class Columns {

  constructor(columns, selectedProps=[]) {
    this.columns = columns
    this.selectedProps = (selectedProps && selectedProps.length && selectedProps) || columns.map(c => c.prop)
  }

  /**
   * Return list of columns in el-tree data attribute way
   *
   * @returns {Array}
   */
  getTreeData() {
    return this.columns.map(component => {
      return {
        id: component.prop,
        label: component.label,
        disabled: component.required
      }
    })
  }

  /**
   * Return list of columns that was selected
   *
   * @returns {Array}
   */
  getSelected() {
    return this.columns.filter(c => {
      return this.selectedProps.includes(c.prop)
    })
  }

  /**
   * Add column prop to selected props
   *
   * @returns {Array}
   */
  select(prop) {
    if (!this.selectedProps.includes(prop))
      this.selectedProps.push(prop)
  }

  /**
   * Removes column prop to selected props
   *
   * @returns {Array}
   */
  unselect(prop) {
    this.selectedProps = this.selectedProps.filter(p => p != prop)
  }

}

export default Columns
