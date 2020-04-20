import Vuex from "vuex"
import BootstrapVue from "bootstrap-vue"
import GoogleAdsenseModal from "@/google_adsense/components/modal"
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

const wrapper = shallowMount(GoogleAdsenseModal, {
  localVue,
  router,
  propsData: {
    accountName: "account",
    loading: false,
  }
})

describe("GoogleAdsenseModal.vue", () => {
  it("is GoogleAdsenseModal", () => {
    expect(wrapper.is(GoogleAdsenseModal)).toBe(true)
  })

  it("should show if showModal is true", () => {
    wrapper.vm.show()
    expect(wrapper.find("#google-adsense-modal").isVisible()).toBe(true)
  })
  it("should hide, but exists if showModal is false", () => {
    wrapper.vm.hide()
    expect(wrapper.find("#google-adsense-modal").exists()).toBe(true)
  })
})
