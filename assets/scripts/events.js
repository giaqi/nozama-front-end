'use strict'
const getFormFields = require('../../lib/get-form-fields')
const authApi = require('./auth/api')
const authUI = require('./auth/ui')
const itemApi = require('./items/api')
const itemUI = require('./items/ui')
const handlebars = require('./handlebars')
const ui = require('./ui')
const store = require('./store')

const signOutUser = function (event) {
  event.preventDefault()
  authApi.signOut()
    .then(authUI.signOutSuccess)
    .then(loadItemIndex)
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

const loadItemIndex = function () {
  // event.preventDefault()
  itemApi.indexItems()
    .then(itemUI.onIndexSuccess)
    .catch(itemUI.onIndexFailure)
}

const clearAlertModal = function () {
  $('#alert-modal-content').removeClass('alert-danger alert-success')
  $('#alert-modal-content').empty()
}

const fadeModal = function () {
  setTimeout(() => {
    $('#alertModal').modal('hide')
  }, 1000)
}

const showItem = function (event) {
  const productId = event.target.attributes['id'].value
  itemApi.getItem(productId)
    .then(itemUI.onGetSuccess)
    .catch(itemUI.onGetFailure)
}

const qtyChange = function (event) {
  const quantity = $(event.target).val()
  const price = $('span[data-price]').attr('data-price')
  const totalPrice = quantity * price
  $('span[data-total-price]').text('$' + totalPrice.toFixed(2))
}

const getUserCart = function () {
  authApi.getCart()
    .then(authUI.onGetCartSuccess)
    .catch(authUI.onGetCartFailure)
}

const addToCart = function (event) {
  if (store.item && store.user) {
    const inCart = store.user.cart.find(i => i[0].id === store.item.product.id)
    if (inCart) {
      const addQuantity = +store.item.qty + +inCart[1]
      authApi.removeCartItem(store.item.product.id)
        .then(data => itemApi.getItem(store.item.product.id))
        .then(data => promiseAddCart(data.product, addQuantity))
        .then(authApi.addToCart)
        .then(authApi.getCart)
        .then(authUI.onGetCartSuccess)
        .then(() => { store.item = null })
        .catch(itemUI.onGetFailure)
    } else {
      itemApi.getItem(store.item.product.id)
        .then(data => promiseAddCart(data.product, store.item.qty))
        .then(authApi.addToCart)
        .then(authApi.getCart)
        .then(authUI.onGetCartSuccess)
        .then(() => { store.item = null })
        .catch(itemUI.onGetFailure)
    }
  } else {
    const prodID = $(event.target).closest('button').attr('data-prodID')
    const input = $(event.target).closest('button').siblings('input')
    const quantity = $(input).val() || 1
    if (store.user) {
      const inCart = store.item ? store.user.cart.some(i => i[0].id === store.item.product.id) : store.user.cart.some(i => i[0].id === prodID)
      if (inCart) {
        const addQuantity = +store.user.cart.find(i => i[0].id === prodID)[1] + +quantity
        authApi.removeCartItem(prodID)
          .then(data => itemApi.getItem(prodID))
          .then(data => promiseAddCart(data.product, addQuantity))
          .then(authApi.addToCart)
          .then(authApi.getCart)
          .then(authUI.onGetCartSuccess)
          .catch(itemUI.onGetFailure)
      } else {
        itemApi.getItem(prodID)
          .then(data => promiseAddCart(data.product, quantity))
          .then(authApi.addToCart)
          .then(authApi.getCart)
          .then(authUI.onGetCartSuccess)
          .catch(itemUI.onGetFailure)
      }
    } else {
      $('#alert-modal-content').addClass('alert-danger')
      $('#alert-modal-content').html('<p>You must sign in to add to your cart.</p>')
      $('#alertModal').modal('show')
      $('#item-view-modal').modal('hide')
      $('#login-modal').modal('show')
      itemApi.getItem(prodID)
        .then(data => promiseAddCart(data.product, quantity))
        .then(item => {
          store.item = item
        })
    }
  }
}

const emptyCart = function () {
  authApi.clearCart()
    .then(authApi.getCart)
    .then(authUI.onGetCartSuccess)
    .catch(authUI.onGetCartFailure)
}

const removeFromCart = function (event) {
  const itemId = $(event.target).attr('data-delete')

  authApi.removeCartItem(itemId)
    .then(authApi.getCart)
    .then(authUI.onGetCartSuccess)
    .catch(authUI.onGetCartFailure)
}

const updateQuantity = function (event) {
  const itemId = $(event.target).attr('data-update')
  const quantity = $('input[data-quantity="' + itemId + '"]').val()

  authApi.removeCartItem(itemId)
    .then(data => itemApi.getItem(itemId))
    .then(data => promiseAddCart(data.product, quantity))
    .then(authApi.addToCart)
    .then(authApi.getCart)
    .then(authUI.onGetCartSuccess)
    .catch(itemUI.onGetFailure)
}

const promiseAddCart = function (product, qty) {
  return {product, qty}
}

const checkout = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)

  if (data.purchase.card.length === 16 && data.purchase.exp.length === 5 && data.purchase.cvc.length === 3) {
    authApi.buyCart()
      .then(authUI.onPurchaseSuccess)
      .catch(authUI.onPurchaseFailure)
  } else {
    // TODO: Add validation to fields
  }
}

const keyIgnores = [93, 91, 17, 18, 20, 16, 9, 13, 39, 38, 37, 40]

const cardExpHelper = function (event) {
  const keyCheck = keyIgnores.some(i => i === event.which)
  const val = $(event.target).val()
  if (event.which === 32) {
    $(event.target).val(val.substring(0, val.length - 1))// stop character from entering input
    return false
  }
  if (event.which !== 8 && val.length === 2) {
    if (+val[1] > 2) {
      $(event.target).val(val.substring(0, val.length - 1))
    } else {
      $(event.target).val(val + '/')
    }
  }
  if (event.which !== 8 && +val > 1 && val.length === 1) {
    $(event.target).val('0' + val + '/')
  }
  if (event.which !== 8 && isNaN(String.fromCharCode(event.which))) {
    if (!keyCheck) {
      $(event.target).val(val.substring(0, val.length - 1))// stop character from entering input
    }
  }
  if (val.length > 5) {
    $(event.target).val(val.substring(0, val.length - 1))
  }
  // if (val.substr(-2) < new Date().getFullYear().toString().substr(-2)) {
  //   // TODO: error to screen
  //   $(event.target).val(val.substring(0, val.length - 1))
  // }
}

const cardHelper = function (event) {
  const keyCheck = keyIgnores.some(i => i === event.which)
  const val = $(event.target).val()
  if (event.which === 32) {
    $(event.target).val(val.substring(0, val.length - 1))// stop character from entering input
  }
  if (event.which !== 8 && isNaN(String.fromCharCode(event.which))) {
    if (!keyCheck) {
      $(event.target).val(val.substring(0, val.length - 1))// stop character from entering input
    }
  }
  if (val.length > 16) {
    $(event.target).val(val.substring(0, val.length - 1))
  }
}

const cardCVCHelper = function (event) {
  const keyCheck = keyIgnores.some(i => i === event.which)
  const val = $(event.target).val()
  if (event.which === 32) {
    $(event.target).val(val.substring(0, val.length - 1))// stop character from entering input
  }
  if (event.which !== 8 && isNaN(String.fromCharCode(event.which))) {
    if (!keyCheck) {
      $(event.target).val(val.substring(0, val.length - 1))// stop character from entering input
    }
  }
  if (val.length > 3) {
    $(event.target).val(val.substring(0, val.length - 1))
  }
}

const loadAccountManagement = function () {
  authApi.getPurchases()
    .then(authUI.onGetPurchases)
    .catch(authUI.onGetFailure)
}

const addHandlers = function () {
  $('#sign-out').on('click', signOutUser)
  $('#signin').on('submit', formLoginAction)
  $('#content').on('submit', '#change-password-form', changePassword)
  $('.navbar-btn').on('click', tryCollapse)
  $('input[data-newuser]').on('change', showPasswordConfirmation)
  $('#account-management').on('click', loadAccountManagement)
  $('#content').on('click', 'button[data-cancelChange]', ui.hidePasswordChange)
  $('#content').on('click', 'a[data-changePassword]', ui.passwordChangeToggle)
  $('#alertModal').on('hidden.bs.modal', clearAlertModal)
  $('#alertModal').on('shown.bs.modal', fadeModal)
  $('#content').on('click', '.small-product', showItem)
  $('#item-view-modal').on('change keyup', 'input[data-itemqty]', qtyChange)
  $('#nav-cart').on('click', getUserCart)
  $('#item-view-modal').on('click', '#empty-cart', emptyCart)
  $('#item-view-modal').on('click', 'button[data-prodID]', addToCart)
  $('#content').on('click', 'button[data-prodID]', addToCart)
  $('#item-view-modal').on('click', 'button[data-delete]', removeFromCart)
  $('#item-view-modal').on('click', 'button[data-update]', updateQuantity)
  $('#item-view-modal').on('submit', '#checkout', checkout)
  $('#item-view-modal').on('click', '.checkout-btn', handlebars.checkoutView)
  $('#item-view-modal').on('keyup', 'input[name="purchase[exp]"]', cardExpHelper)
  $('#item-view-modal').on('keyup', 'input[name="purchase[card]"]', cardHelper)
  $('#item-view-modal').on('keyup', 'input[name="purchase[cvc]"]', cardCVCHelper)
  $('#content').on('click', 'a[data-backToShopping]', loadItemIndex)
}

module.exports = {
  addHandlers,
  loadItemIndex
}
