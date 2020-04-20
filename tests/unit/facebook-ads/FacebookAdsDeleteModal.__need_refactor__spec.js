import Vuex from "vuex"
import BootstrapVue from "bootstrap-vue"
import FacebookAdsDeleteModal from "@/facebook_ads/components/deleteModal"
import { BaseButton, BaseAlert } from "@/components/lib"
import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import VueRouter from "vue-router"
import {
  profiles
} from "../../data/facebook-ads"

const localVue = createLocalVue()
localVue.component(BaseButton.name, BaseButton)
localVue.component(BaseAlert.name, BaseAlert)
localVue.use(VueRouter)
localVue.use(Vuex)
const router = new VueRouter()
localVue.use(BootstrapVue)

const wrapper = shallowMount(FacebookAdsDeleteModal, {
  localVue,
  router,
  propsData: {
    id: "facebook-ads-modal",
    title: "Confirmar remoção de perfil",
    account: profiles()[0],
    loading: false,
  }
})

describe("FacebookAdsDeleteModal.vue", () => {
  it("is FacebookAdsDeleteModal", () => {
    expect(wrapper.is(FacebookAdsDeleteModal)).toBe(true)
  })

  it("emit remove method", () => {
    wrapper.vm.remove()
    expect(wrapper.emitted().remove).toEqual(expect.anything())
  })

  it("should show if showModal is true", () => {
    wrapper.vm.show()
    expect(wrapper.find("#facebook-ads-modal").isVisible()).toBe(true)
  })
  it("should hide, but exists if showModal is false", () => {
    wrapper.vm.hide()
    expect(wrapper.find("#facebook-ads-modal").exists()).toBe(true)
  })
})
