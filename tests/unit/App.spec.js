import { shallowMount, createLocalVue } from "@vue/test-utils"
import VueRouter from "vue-router"
import BootstrapVue from "bootstrap-vue"
import App from "@/App"

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

localVue.use(BootstrapVue)

const wrapper = shallowMount(App, {
  localVue,
  router,
  mocks: {
    $rtl: {
      isRTL: false,
      disableRTL: jest.fn()
    },
    $store: {
      getters: {},
      dispatch: jest.fn()
    },
    $t: jest.fn()
  },
  methods: {
    loadChat: jest.fn()
  }
})

describe("App.vue", () => {
  it("has a name", () => {
    expect(App.name).toMatch("App")
  })
  it("is Vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })
  it("is App", () => {
    expect(wrapper.is(App)).toBe(true)
  })
})
