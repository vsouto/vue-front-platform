import BaseInput from "src/components/lib/Inputs/BaseInput.vue"
import BaseDropdown from "src/components/lib/BaseDropdown.vue"
import Card from "src/components/lib/Cards/Card.vue"
import BaseButton from "src/components/lib/BaseButton.vue"
import BaseCheckbox from "src/components/lib/Inputs/BaseCheckbox.vue"
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install(Vue) {
    Vue.component(BaseInput.name, BaseInput)
    Vue.component(BaseDropdown.name, BaseDropdown)
    Vue.component(Card.name, Card)
    Vue.component(BaseCheckbox.name, BaseCheckbox)
    Vue.component(BaseButton.name, BaseButton)
  }
}

export default GlobalComponents
