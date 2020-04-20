const windowName = "newindow"
const authWindowOptions = "height=800,width=800,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no"

const listeners = {}

export const setOAuthListener = (name, listener) => {
  listeners[name] = listener
  window.addEventListener(`${name}-oauth`, ({
    detail
  }) => listeners[name](detail))
}

export const openOAuthDialog = (url) => {
  window.open(
    url,
    windowName,
    authWindowOptions
  )
}
