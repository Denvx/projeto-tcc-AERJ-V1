import { reactive } from 'vue'

export function useAlert() {
  const alert = reactive({
    show: false,
    message: '',
    type: '',
  })

  function showAlert(message, type = 'error') {
    alert.show    = true
    alert.message = message
    alert.type    = type
    setTimeout(() => (alert.show = false), 3000)
  }

  const showSuccess = (msg) => showAlert(msg, 'success')
  const showError   = (msg) => showAlert(msg, 'error')
  const showWarning = (msg) => showAlert(msg, 'warning')

  return { alert, showAlert, showSuccess, showError, showWarning }
}