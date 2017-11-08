'use strict'

const passwordChangeToggle = function () {
  const hidden = $('#change-password-area').hasClass('hidden')

  if (hidden) {
    $('#change-password-area').removeClass('hidden')
  } else {
    $('#change-password-area').addClass('hidden')
  }
}

const hidePasswordChange = function (event) {
  event.preventDefault()
  $('#content #change-password-area').addClass('hidden')
}

const clearUpdatePassword = function () {
  $('#change-password-form :input').val('')
}

const productIdToggle = function () {
  const hidden = $('#product-id-area').hasClass('hidden')

  if (hidden) {
    $('#product-id-area').removeClass('hidden')
  } else {
    $('#product-id-area').addClass('hidden')
  }
}

module.exports = {
  passwordChangeToggle,
  hidePasswordChange,
  clearUpdatePassword,
  productIdToggle
}
