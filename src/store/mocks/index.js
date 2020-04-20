/*import faker from "vue-faker"*/

module.exports = {

  install: function (Vue) {

    Vue.current_mock = null
    Vue.mocksActive = false

    // Check if we are local or dev
    if (process.env.VUE_APP_ENV === "local") {
      // Lets check if Mocks can be activated
      if (process.env.VUE_APP_MOCKS === "1" && !process.env.VUE_APP_TESTING) {
        Vue.mocksActive = true
        /*
        TODO: use faker only when using mocks

        Vue.use(faker, {locale: "pt_BR"})
        Vue.$faker = faker*/
      }
    }

    /**
     * Get a Mock
     *
     * getMock('account', 'user') - gives you the user.js mock file under account store module mocks
     * getMock('account', 'accounts') - gives you the accounts.js mock file under account store module mocks
     * getMock('facebook-ads', 'campaigns') - gives you the campaigns.js mock file under facebook-ads store module mocks
     *
     * @param moduleName
     * @param mockName
     * @param attribute
     * @returns {*}
     */
    Vue.getMock = function (moduleName, mockName, attribute = null) {
      try {
        if (!Vue.mocksActive)
          return null
        Vue.current_mock = require("@/store/modules/" + moduleName + "/mocks/" + mockName + ".js") || null
        if (attribute)
          return Vue.current_mock[attribute]
        return Vue.current_mock
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Error getting mock", moduleName, mockName, err)
        return null
      }
    }

    /**
     * This will be used to generate seeds dinamically
     *
     * @param moduleName
     * @param mockName
     * @param attribute
     * @returns {null|any}
     */
    Vue.makeMock = function (moduleName, mockName, attribute = null) {
      try {
        if (!Vue.mocksActive)
          return null
        Vue.current_mock = require("@/store/modules/" + moduleName + "/seeds/" + mockName + ".js") || null
        if (attribute)
          return Vue.current_mock[attribute]
        return Vue.current_mock
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Error getting mock", moduleName, mockName, err)
        return null
      }
    }

    /**
     * Return current mock as a response obj
     *
     * @returns {{data: {response: boolean}}|boolean}
     */
    Vue.mockAsResponse = function () {
      if (!Vue.current_mock)
        return false
      return { "data": { "response" : Vue.current_mock }}
    }
  }
}
