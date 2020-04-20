import Vuex from "vuex"
import BootstrapVue from "bootstrap-vue"
import GoogleAdsModal from "@/google_ads/components/modal"
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

const wrapper = shallowMount(GoogleAdsModal, {
  localVue,
  router,
  propsData: {
    accountName:"account",
    loading: false,
  }
})

describe("GoogleAdsModal.vue", () => {
  it("is GoogleAdsModal", () => {
    expect(wrapper.is(GoogleAdsModal)).toBe(true)
  })

  it("should show if showModal is true", () => {
    wrapper.vm.show()
    expect(wrapper.find("#google-ads-modal").isVisible()).toBe(true)
  })
  it("should hide, but exists if showModal is false", () => {
    wrapper.vm.hide()
    expect(wrapper.find("#google-ads-modal").exists()).toBe(true)
  })
})
