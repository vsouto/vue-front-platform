export default {
  bind(el, {
    value
  }) {
    el.style.backgroundImage = `url(${value})`
  },
  inserted(el, {
    value
  }) {
    el.style.backgroundImage = `url(${value})`
  },
  update(el, {
    value
  }) {
    el.style.backgroundImage = `url(${value})`
  }
}
