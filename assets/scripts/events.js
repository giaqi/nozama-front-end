'use strict'
const getFormFields = require('../../lib/get-form-fields')
const authApi = require('./auth/api')
const authUI = require('./auth/ui')

const signOutUser = function (event) {
  event.preventDefault()
  authApi.signOut()
    .then(authUI.signOutSuccess)
    .catch(authUI.signOutFailure)
}

const formLoginAction = function (event) {
  event.preventDefault()
  const newuser = $('input[data-newuser]').prop('checked')
  const p = $('input[name="credentials[password]"]').val()
  const c = $('input[name="credentials[password_confirmation]"]').val()
  const data = getFormFields(event.target)
  if (newuser) {
    if (p === c) {
      authApi.signUp(data)
        .then(authUI.signUpSuccess)
        .catch(authUI.signUpFailure)
    } else {
      $('input[name="credentials[password]"]').val('')
      $('input[name="credentials[password_confirmation]"]').val('')
      $('#signInComment').html('<div class="alert alert-danger" role="alert"><p>Sorry, your passwords do not match.</p></div>')
    }
  } else {
    delete data.credentials.password_confirmation
    authApi.signIn(data)
      .then(authUI.signInSuccess)
      .catch(authUI.signInFailure)
  }
}

const changePassword = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  authApi.changePassword(data)
    .then(authUI.changePasswordSuccess)
    .catch(authUI.changePasswordFailure)
}
const tryCollapse = function () {
  if ($(window).width() <= 767) {
    $('#siteNavbar').collapse('toggle')
  }
}

const showPasswordConfirmation = function (event) {
  $('#signInComment').empty()
  if (event.target.checked) {
    $('div[data-newuser]').removeClass('hidden')
  } else {
    $('div[data-newuser]').addClass('hidden')
  }
}

const addHandlers = function () {
  $('#sign-out').on('click', signOutUser)
  $('#signin').on('submit', formLoginAction)
  $('#change-password').on('submit', changePassword)
  $('.navbar-btn').on('click', tryCollapse)
  $('input[data-newuser]').on('change', showPasswordConfirmation)
}

module.exports = {
  addHandlers
}
