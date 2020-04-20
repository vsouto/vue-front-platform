module.exports = {
  "FacebookAds: nav, accounts, profile business managers and profile business accounts": function (browser) {
    browser
      .waitForElementVisible(".main-panel nav.navbar ul.navbar-nav", 10000)
      .moveToElement(".main-panel nav.navbar ul.navbar-nav li.nav-item:nth-of-type(3)", 10, 10)
      .waitForElementVisible(".main-panel nav.navbar ul.navbar-nav li.nav-item:nth-of-type(3) .dropdown-menu", 1000)
      .click(".main-panel nav.navbar ul.navbar-nav li.nav-item:nth-of-type(3) .dropdown-menu a[href='/facebook-ads/']")
      .waitForElementVisible("#FacebookAds", 10000)
      .assert.urlContains("facebook-ads")

      .waitForElementVisible(".card:nth-of-type(1) .el-table .el-table__header-wrapper", 10000)
      .assert.visible(".card:nth-of-type(1) .el-table")
      .assert.visible(".card:nth-of-type(1) .el-table__header-wrapper")
      .waitForElementVisible(".card:nth-of-type(2) .el-table .el-table__header-wrapper", 10000)
      .assert.visible(".card:nth-of-type(2) .el-table")
      .assert.visible(".card:nth-of-type(2) .el-table__header-wrapper")
      .waitForElementVisible("button.btn-primary", 10000)

    // TODO: authorize new profile

      // Load profile businesses
      .waitForElementVisible(".card:nth-of-type(1) .el-table .cell .list-center .btn-primary", 10000)
      .click(".card:nth-of-type(1) .cell .list-center .btn-primary:nth-of-type(1)")
      .waitForElementVisible("#FacebookAdsLoadBusinesses", 10000)
      .assert.urlContains("businesses")
      .waitForElementVisible(".card:nth-of-type(1) .el-table .el-table__header-wrapper", 10000)
      .assert.visible(".card:nth-of-type(1) .el-table")
      .assert.visible(".card:nth-of-type(1) .el-table__header-wrapper")

      // Load business accounts
      .waitForElementVisible(".card:nth-of-type(1) .el-table button.btn-primary", 10000)
      .click(".card:nth-of-type(1) .el-table button.btn-primary:nth-of-type(1)")
      .waitForElementVisible("#FacebookAdsLoadAccounts", 10000)
      .assert.urlContains("accounts")
      .waitForElementVisible(".card:nth-of-type(1) .el-table .el-table__header-wrapper", 10000)
      .assert.visible(".card:nth-of-type(1) .el-table")
      .assert.visible(".card:nth-of-type(1) .el-table__header-wrapper")
  }
}
