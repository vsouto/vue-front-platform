module.exports = {
  "Google Adsense: nav and accounts": function (browser) {
    browser
      .waitForElementVisible(".main-panel nav.navbar ul.navbar-nav", 10000)
      .moveToElement(".main-panel nav.navbar ul.navbar-nav li.nav-item:nth-of-type(4)", 10, 10)
      .waitForElementVisible(".main-panel nav.navbar ul.navbar-nav li.nav-item:nth-of-type(4) .dropdown-menu", 1000)
      .click(".main-panel nav.navbar ul.navbar-nav li.nav-item:nth-of-type(4) .dropdown-menu a[href='/google-adsense/']")
      .waitForElementVisible("#Adsense", 10000)
      .assert.urlContains("google-adsense")
      .waitForElementVisible(".card:nth-of-type(1) .el-table .el-table__header-wrapper", 10000)
      .assert.visible(".el-table")
      .assert.visible(".el-table__header-wrapper")
      .waitForElementVisible(".card:nth-of-type(2) button.adsense-auth", 1000)
      .assert.visible("button.adsense-auth")
      .click("button.adsense-auth")
      .pause(500)
      .switchWindow("newindow")
      .waitForElementVisible("input[type=email]", 10000)
      .setValue("input[type=email]", "test@painel.com.br")
      .click("#identifierNext")
      .waitForElementVisible("input[type=password]", 5000)
      .setValue("input[type=password]", "devTeam123!")
      .click("#passwordNext")
      .waitForElementVisible("#submit_approve_access", 5000)
      .click("#submit_approve_access")
      .pause(5000)
  }
}
