'use strict'
const store = require('../store.js')
const ui = require('../ui')
const handlebars = require('../handlebars.js')

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
  updateCartDisplay()
  toggleUserDisplay(true)
  clearModals()
  if (store.item) {
    $('#content :button[data-prodID]')[0].click()
  }
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
  ui.clearUpdatePassword()
}

const changePasswordFailure = function (response, status, xhr) {
  $('#alert-modal-content').addClass('alert-danger')
  $('#alert-modal-content').html('<p>We couldn\'t change your password.</p>')
  $('#alertModal').modal('show')
  ui.clearUpdatePassword()
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
    if (!store.user.admin) {
      $('[data-user="user"]').removeClass('hidden')
    }
    $('#current-user').text(store.user.email).append('<span class="caret"></span>').parent().removeClass('hidden')
  } else {
    $('[data-user="no-user"]').removeClass('hidden')
    $('[data-user="user"]').addClass('hidden')
  }
}

const onGetCartSuccess = function (response, status, xhr) {
  store.user.cart = response.user.cart
  store.user.cartItemPrice = response.user.cartItemPrice
  store.user.cartItemTotal = response.user.cartItemTotal
  // $('#item-view-modal').modal('hide')
  updateCartDisplay()
  handlebars.showCartView()
  $('#item-view-modal').modal('show')
}

const onGetCartFailure = function (response, status, xhr) {
  // TODO: Add failure logic
  // console.log(response)
  // console.log(status)
  // console.log(xhr)
}

const onAddToCartSuccess = function (response, status, xhr) {
  store.user.cart = response.cart
}

const onAddToCartFailure = function (response, status, xhr) {
  // TODO: Add failure logic
  // console.log('in onAddToCartFailure')
  // console.log(response)
  // console.log(status)
  // console.log(xhr)
}

const updateCartDisplay = function () {
  $('#nav-qty').text(store.user.cartItemTotal || 0)
  $('#nav-price').text(store.user.cartItemPrice || (0).toFixed(2))
}

const onPurchaseSuccess = function (response, status, xhr) {
  $('#item-view-modal').modal('hide')
  $('#alert-modal-content').addClass('alert-success')
  $('#alert-modal-content').html('<p>Purchase successful</p>')
  $('#alertModal').modal('show')
  store.user.cartItemPrice = null
  store.user.cartItemTotal = null
  updateCartDisplay()
}

const onPurchaseFailure = function (response, status, xhr) {
  $('#alert-modal-content').addClass('alert-danger')
  $('#alert-modal-content').html("<p>We could not process your purchase, but don't worry, your money is safe with us.</p>")
  $('#alertModal').modal('show')
}

const onGetPurchases = function (response, status, xhr) {
  console.log(response.purchases)
  handlebars.accountManagement(response.purchases)
}

const onGetFailure = function (response, status, xhr) {
  console.log('in onGetPurchase failure')
  console.log(response)
  console.log(status)
  console.log(xhr)
}

module.exports = {
  signUpSuccess,
  signInSuccess,
  signUpFailure,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  onGetCartSuccess,
  onGetCartFailure,
  onAddToCartSuccess,
  onAddToCartFailure,
  onPurchaseSuccess,
  onPurchaseFailure,
  onGetFailure,
  onGetPurchases
}
