'use strict'

const showPasswordChange = function () {
  $('#change-password-area').removeClass('hidden')
}

const hidePasswordChange = function (event) {
  event.preventDefault()
  $('#content #change-password-area').addClass('hidden')
}

module.exports = {
  showPasswordChange,
  hidePasswordChange
}
