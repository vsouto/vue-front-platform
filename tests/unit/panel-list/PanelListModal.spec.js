import Vuex from "vuex"
import BootstrapVue from "bootstrap-vue"
import PanelListModal from "@/components/modals/PanelListModal"
import { BaseButton } from "@/components/lib"
import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import VueRouter from "vue-router"
import {
  panels
} from "../../data/panel"

const localVue = createLocalVue()
localVue.component(BaseButton.name, BaseButton)
localVue.use(VueRouter)
localVue.use(Vuex)
const router = new VueRouter()
localVue.use(BootstrapVue)

const wrapper = shallowMount(PanelListModal, {
  localVue,
  router,
  propsData: {
    id: "panel-list-modal",
    title: "Confirmar remoção de perfil",
    panel: panels()[0],
    loading: false,
  }
})

describe("PanelListModal.vue", () => {
  it("is PanelListModal", () => {
    expect(wrapper.is(PanelListModal)).toBe(true)
  })

  it("emit remove method", () => {
    wrapper.vm.remove()
    expect(wrapper.emitted().remove).toEqual(expect.anything())
  })

  it("should show if showModal is true", () => {
    wrapper.vm.show()
    expect(wrapper.find("#panel-list-modal").isVisible()).toBe(true)
  })
  it("should hide, but exists if showModal is false", () => {
    wrapper.vm.hide()
    expect(wrapper.find("#panel-list-modal").exists()).toBe(true)
  })
})
