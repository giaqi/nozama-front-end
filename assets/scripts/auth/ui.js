'use strict'
const store = require('../store.js')

// Sign Up promises
const signUpSuccess = function (response, status, xhr) {
  $('#login-modal').modal('hide')
  $('input[data-newuser]').prop('checked', false)
  $('#signin').trigger('submit')
  clearModals()
}

const signUpFailure = function (response, status, xhr) {
  $('#signInComment').html('<div class="alert alert-danger" role="alert"><p>Sorry, those login credentials cannot be used.</p></div>')
  clearPasswordFields()
}

// Sign In promises
const signInSuccess = function (response, status, xhr) {
  $('#login-modal').modal('hide')
  store.user = response.user
  toggleUserDisplay(true)
  clearModals()
}
const signInFailure = function (response, status, xhr) {
  $('#signInComment').html('<div class="alert alert-danger" role="alert"><p>Please check login credentials and try again.</p></div>')
  clearPasswordFields()
}

// Change Password promises
const changePasswordSuccess = function (response, status, xhr) {
  $('#alert-modal-content').addClass('alert-success')
  $('#alert-modal-content').html('<p>Successfully changed your password</p>')
  $('#alertModal').modal('show')
  $('#change-password-area').addClass('hidden')
}

const changePasswordFailure = function (response, status, xhr) {
}

const signOutSuccess = function (response, status, xhr) {
  store.user = null
  $('#content').empty()
  $('div[data-newuser]').addClass('hidden')
  toggleUserDisplay(false)
}

const signOutFailure = function (response, status, xhr) {
}

const clearModals = function () {
  $('input[name]').val('')
  $('#signInComment').text('')
  $('#signUpComment').text('')
}

const clearPasswordFields = () => {
  $('input[name="credentials[password]"]').val('')
  $('input[name="credentials[password_confirmation]"]').val('')
}

const toggleUserDisplay = function (check) {
  if (check) {
    $('[data-user="no-user"]').addClass('hidden')
    $('[data-user="user"]').removeClass('hidden')
    $('#current-user').text(store.user.email).append('<span class="caret"></span>')
  } else {
    $('[data-user="no-user"]').removeClass('hidden')
    $('[data-user="user"]').addClass('hidden')
  }
}

module.exports = {
  signUpSuccess,
  signInSuccess,
  signUpFailure,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
