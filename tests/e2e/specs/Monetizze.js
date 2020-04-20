module.exports = {
  "Monetizze: nav and accounts": function (browser) {
    browser
      .waitForElementVisible(".main-panel nav.navbar ul.navbar-nav", 10000)
      .moveToElement(".main-panel nav.navbar ul.navbar-nav li.nav-item:nth-of-type(4)", 10, 10)
      .waitForElementVisible(".main-panel nav.navbar ul.navbar-nav li.nav-item:nth-of-type(4) .dropdown-menu", 1000)
      .click(".main-panel nav.navbar ul.navbar-nav li.nav-item:nth-of-type(4) .dropdown-menu a[href='/monetizze/']")
      .waitForElementVisible("#Monetizze", 10000)
      .assert.urlContains("monetizze")
      .waitForElementVisible(".card:nth-of-type(1) .el-table .el-table__header-wrapper", 10000)
      .waitForElementVisible("button[type=submit]", 1000)
      .setValue("input[id=api_key]", "f6VWaPTkzGNLFoaryMoZSOu40t2psI9m")
      .click("button[type=submit]")
      .pause(500)
      .waitForElementVisible(".el-table", 1000)
      .assert.visible(".el-table")
      .assert.visible(".el-table__header-wrapper")
  }
}
