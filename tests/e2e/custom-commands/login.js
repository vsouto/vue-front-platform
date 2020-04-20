const hostname = process.env.VUE_APP_HOSTNAME

module.exports.command = function() {
  const self = this
  try {
    self
      .url(hostname + "/home")
      .pause(5000)
      .waitForElementVisible("input[type=email]", 2000, false, function(result) {
        if (result) {
          self.setValue("input[type=email]", "dev@painelintegrado.com.br")
            .setValue("input[type=password]", "devTeam123!")
            .click("button[type=submit]")
            .waitForElementVisible("#Callback", 10000)
            .assert.visible("#Callback")
            .waitForElementVisible("#Home", 10000)
            .assert.visible("#Home")
        } else {
          self.waitForElementVisible(".button.auth0-lock-social-button", 2000, true, function() {
            self.click(".button.auth0-lock-social-button")
              .waitForElementVisible("#Callback", 10000)
              .assert.visible("#Callback")
              .waitForElementVisible("#Home", 10000)
              .assert.visible("#Home")
          })
        }
      })
  } catch (error) {
    /* eslint-disable no-console */
    console.error(error)
  }
  return this
}