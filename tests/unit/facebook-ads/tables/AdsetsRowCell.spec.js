import BootstrapVue from "bootstrap-vue"
import AdsetsRowCell from "@/facebook_ads/components//AdsetsRowCell"

import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import { BaseButton } from "@/components/lib"
import { Tooltip } from "element-ui"

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.component(BaseButton.name, BaseButton)
localVue.use(Tooltip)

const $router = {
  push: jest.fn()
}
const wrapper = shallowMount(AdsetsRowCell, {
  localVue,
  propsData: {
    row: {
      profile_id: "1",
      id: "1",
    },
    parentCampaign: {}
  },
  mocks: {
    $router,
    $t: jest.fn()
  }
})

describe("AdsetsRowCell.vue", () => {
  it("is AdsetsRowCell", () => {
    expect(wrapper.is(AdsetsRowCell)).toBe(true)
  })
  it("computed properties should have valid values", () => {
    expect(wrapper.vm.profileIds).toEqual(["1"])
    expect(wrapper.vm.adsetIds).toEqual(undefined)
  })
  it("openAdsets", () => {
    wrapper.vm.openAdsets({})
    expect($router.push).toHaveBeenCalled()
  })
})
