module.exports = {
  "PanelCreate": function (browser) {
    browser
      .waitForElementVisible(".main-panel nav.navbar ul.navbar-nav", 10000)
      .moveToElement(".main-panel nav.navbar ul.navbar-nav li.nav-item:nth-of-type(2)", 10, 10)
      .waitForElementVisible(".main-panel nav.navbar ul.navbar-nav li.nav-item:nth-of-type(2) .dropdown-menu", 1000)
      .click(".main-panel nav.navbar ul.navbar-nav li.nav-item:nth-of-type(2) .dropdown-menu a[href='/panel/']")
      .waitForElementVisible("#PanelList", 10000)
      .assert.urlContains("panel")
      .waitForElementVisible(".card:nth-of-type(1) .el-table .el-table__header-wrapper", 10000)
      .assert.visible(".el-table")
      .assert.visible(".el-table__header-wrapper")

      // Create panel
      .waitForElementVisible("#PanelList > button.btn-primary", 10000)
      .click("#PanelList > button.btn-primary:nth-of-type(1)")
      .waitForElementVisible("#PanelEditor", 10000)
      .assert.urlContains("panel/create")

      // Create panel - Platforms Step
      .waitForElementVisible(".btn-next", 10000)
      .pause(500)
      .click(".btn-next")
      .waitForElementVisible(".invalid-feedback", 10000)
      .click("#facebook_ads-switch")
      .click("#google_adsense-switch")
      .pause(500)
      .click(".btn-next")

      // Create panel - Assets Step
      .pause(500)
      .click(".btn-next")
      .waitForElementVisible(".invalid-feedback", 10000)
      .waitForElementVisible("#facebook_ads_options_group", 10000)
      .pause(500)
      .click("#facebook_ads_options_group")
      .waitForElementVisible("#facebook_ads_options_group .multiselect__element", 20000)
      .click("#facebook_ads_options_group .multiselect__element:nth-of-type(1)")
      .pause(200)
      .click("#facebook_ads_options_group .multiselect__select")
      .waitForElementVisible("#google_adsense_options_group", 10000)
      .pause(500)
      .click("#google_adsense_options_group")
      .waitForElementVisible("#google_adsense_options_group .multiselect__element", 20000)
      .click("#google_adsense_options_group .multiselect__element:nth-of-type(1)")
      .pause(200)
      .click("#google_adsense_options_group .multiselect__select")
      .pause(500)
      .click(".btn-next")

      // TODO Create panel - Filters Step
      .pause(500)
      .click(".btn-next")
      .pause(500)

      // TODO Create panel - Widgets Step
      .pause(500)

      // Create panel - Users Step
      .click(".btn-next")
      .waitForElementVisible("#users_options_group", 5000)
      .click("#users_options_group")
      .waitForElementVisible("#users_options_group .multiselect__element", 50000)
      .click("#users_options_group .multiselect__element:nth-of-type(1)")
      .click("#users_options_group .multiselect__select")
      .pause(500)

      // Create panel - Review Step
      .click(".btn-next")
      .waitForElementVisible("input[name=name]", 5000)
      .click(".btn-success")
      .waitForElementVisible(".error", 5000)
      .setValue("input[name=name]", "Test created awesome panel")
      .click(".btn-success")

      .waitForElementVisible(".el-table__body-wrapper", 15000)
      .assert.urlContains("panel")
      .assert.containsText(".el-table__body-wrapper .el-table__row:last-of-type td:nth-of-type(2) .cell",
        "Test created awesome panel")

      // Edit panel
      .click("td .btn-info:nth-of-type(1)")
      .waitForElementVisible("#PanelEditor", 10000)
      .assert.urlContains("/edit")

    // Edit panel
    // TODO
    // .waitForElementVisible("#facebook_ads_options_group", 1000)
    // .click("#facebook_ads_options_group")
    // .waitForElementVisible("#facebook_ads_options_group .multiselect__element", 20000)
    // .click("#facebook_ads_options_group .multiselect__element:nth-of-type(2)")
    // .click("#facebook_ads_options_group .multiselect__select")
    // .waitForElementVisible("#google_adsense_options_group", 1000)
    // .pause(200)
    // .click("#google_adsense_options_group")
    // .waitForElementVisible("#google_adsense_options_group .multiselect__element", 20000)
    // .click("#google_adsense_options_group .multiselect__element:nth-of-type(2)")
    // .click("#google_adsense_options_group .multiselect__select")
    // .pause(200)
    // .click(".btn-next")
    // .pause(500)
    // .click(".btn-next")
    // .waitForElementVisible(".card-deck", 1000)
    // .click(".card-deck .card:nth-of-type(4) .bootstrap-switch-container")
    // .pause(500)
    // .click(".btn-next")
    // .waitForElementVisible("#users_options_group", 1000)
    // .click("#users_options_group")
    // .waitForElementVisible("#users_options_group .multiselect__element", 10000)
    // .click("#users_options_group .multiselect__element:nth-of-type(2)")
    // .click("#users_options_group .multiselect__select")
    // .pause(500)
    // .click(".btn-next")
    // .waitForElementVisible("input[name=name]", 1000)
    // .setValue("input[name=name]", "Test updated awesome panel")
    // .click(".btn-success")
    // .assert.containsText(".el-table__body-wrapper .el-table__row:last-of-type td:nth-of-type(2) .cell",
    //   "Test updated awesome panel")
    // .assert.urlContains("panel")
  }
}
