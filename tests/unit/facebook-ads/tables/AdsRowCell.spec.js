import BootstrapVue from "bootstrap-vue"
import AdsRowCell from "@/facebook_ads/components//AdsRowCell"

import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils"
import { BaseButton } from "@/components/lib"
import { Tooltip } from "element-ui"

const localVue = createLocalVue()
localVue.component(BaseButton.name, BaseButton)
localVue.use(Tooltip)
localVue.use(BootstrapVue)

const $router = {
  push: jest.fn()
}
const wrapper = shallowMount(AdsRowCell, {
  localVue,
  propsData: {
    row: {
      profile_id: "1",
      id: "1",
    },
    parentAdset: {},
    parentCampaign: {}
  },
  mocks: {
    $router,
    $t: jest.fn()
  }
})

describe("AdsRowCell.vue", () => {
  it("is AdsRowCell", () => {
    expect(wrapper.is(AdsRowCell)).toBe(true)
  })
  it("computed properties should have valid values", () => {
    expect(wrapper.vm.profileIds).toEqual(["1"])
    expect(wrapper.vm.adIds).toEqual(undefined)
  })
  it("openAds", () => {
    wrapper.vm.openAds({})
    expect($router.push).toHaveBeenCalled()
  })
})
