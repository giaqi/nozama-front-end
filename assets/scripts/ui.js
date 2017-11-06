'use strict'

const showPasswordChange = function () {
  $('#change-password-area').removeClass('hidden')
}

const hidePasswordChange = function (event) {
  event.preventDefault()
  $('#content #change-password-area').addClass('hidden')
}

const clearUpdatePassword = function () {
  $('#change-password-form :input').val('')
}

module.exports = {
  showPasswordChange,
  hidePasswordChange,
  clearUpdatePassword
}
