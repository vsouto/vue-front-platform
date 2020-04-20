"use strict"

import _ from "lodash"

class Filters {

  constructor(filters) {
    this.filters = filters
    this.fieldValues = {}
    this.initFilters()
  }

  /**
   * Initiate the filters, as requested in available_filters array
   * @param  {Array}  filters  Array of filter components
   *
   */
  initFilters() {
    const self = this
    this.filters.map(filter => {
      self.fieldValues[filter.field] = filter.defaultValue
    })
  }

  /**
   * Stringify the selected filters
   *
   * @returns {string}
   */
  stringify() {

    let not_empty_filters = this.notEmptyFilters(),
      filters_obj = {}

    Object.keys(not_empty_filters).forEach(function (key) {
      filters_obj[not_empty_filters[key].filter] = not_empty_filters[key].value
    })

    return JSON.stringify(filters_obj)
  }

  /**
   * Get only filters that are not empty
   *
   * @returns {[]}
   */
  notEmptyFilters() {
    let not_empty_filters = []

    const self = this
    this.filters.map(filter => {
      let field = filter.field,
        value = self.fieldValues[field]
      if (!_.isEmpty(value))
        not_empty_filters.push({
          filter: field,
          value: value
        })
    })

    return not_empty_filters
  }

  /**
   * Return form object with filters fields and values
   *
   * @returns {Object}
   */
  getFormObject() {
    let selectedFilters = this.notEmptyFilters(),
      formObject = {}
    selectedFilters.map(f => {
      formObject[f.filter] = f.value
    })
    return formObject
  }

  /**
   * Set filter value
   *
   * @returns {Boolean}
   */
  setFilterValue(field, value) {
    if (value)
      this.fieldValues[field] = value
    else
      this.fieldValues[field] = null
  }

  /**
   * Checks if no filter was filled by user
   *
   * @returns {boolean}
   */
  noFilterSelected() {
    let selectedFilters = this.notEmptyFilters()
    return selectedFilters.length == 0
  }
}

export default Filters
