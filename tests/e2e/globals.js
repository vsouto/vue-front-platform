module.exports = {
  beforeEach: function(browser, done) {
    browser
      .login(function() {
        done()
      })
  },
  afterEach: function(browser, done) {
    browser
      .end(function() {
        done()
      })
  },
}