import Vuex from "vuex"
import BootstrapVue from "bootstrap-vue"
import GoogleAnalyticsModal from "@/google_analytics/components/modal"
import { BaseButton } from "@/components/lib"
import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import VueRouter from "vue-router"

const localVue = createLocalVue()
localVue.component(BaseButton.name, BaseButton)
localVue.use(VueRouter)
localVue.use(Vuex)
const router = new VueRouter()
localVue.use(BootstrapVue)

const wrapper = shallowMount(GoogleAnalyticsModal, {
  localVue,
  router,
  propsData: {
    accountName:"account",
    loading: false,
  }
})

describe("GoogleAnalyticsModal.vue", () => {
  it("is GoogleAnalyticsModal", () => {
    expect(wrapper.is(GoogleAnalyticsModal)).toBe(true)
  })

  it("should show if showModal is true", () => {
    wrapper.vm.show()
    expect(wrapper.vm.showModal).toBe(true)
    expect(wrapper.find("#google-analytics-modal").isVisible()).toBe(true)
  })
  it("should hide, but exists if showModal is false", () => {
    wrapper.vm.hide()
    expect(wrapper.vm.showModal).toBe(false)
    expect(wrapper.find("#google-analytics-modal").exists()).toBe(true)
  })
})
