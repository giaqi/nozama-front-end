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

const productIdToggle = function (event) {
  // check to see if the product update area is out
  if ($('#edit-product-area').hasClass('hidden')) {
    const hidden = $('#product-id-area').hasClass('hidden')

    if (hidden) {
      $('#product-id-area').removeClass('hidden')
    } else {
      $('input[name="product[id]"]').val('')
      $('#product-id-area').addClass('hidden')
    }
  }
}

const productUpdateToggle = function (event) {
  const hidden = $('#edit-product-area').hasClass('hidden')

  if (hidden) {
    $('#edit-product-area').removeClass('hidden')
  } else {
    $('input[name="product[name]"]').val('')
    $('input[name="product[price]"]').val('')
    $('input[name="product[description]"]').val('')
    $('input[name="product[picture_URL]"]').val('')
    $('#edit-product-area').addClass('hidden')
  }
}

const populateProduct = function (product) {
  $('input[name="product[name]"]').val(product.name)
  $('input[name="product[price]"]').val(product.price)
  $('input[name="product[description]"]').val(product.description)
  $('input[name="product[picture_URL]"]').val(product.picture_URL)
}

const productLoadFailure = function () {
  $('#alert-modal-content').addClass('alert-danger')
  $('#alert-modal-content').html('<p>Failed to load the product, please try again later</p>')
  $('#alertModal').modal('show')
  productIdToggle()
}

const productUpdateSuccess = function () {
  $('#alert-modal-content').addClass('alert-success')
  $('#alert-modal-content').html('<p>Product updated!</p>')
  $('#alertModal').modal('show')
}

const productUpdateFailure = function () {
  $('#alert-modal-content').addClass('alert-danger')
  $('#alert-modal-content').html('<p>Failed to update product!</p>')
  $('#alertModal').modal('show')
  productUpdateToggle()
}

module.exports = {
  passwordChangeToggle,
  hidePasswordChange,
  clearUpdatePassword,
  productIdToggle,
  productUpdateToggle,
  populateProduct,
  productLoadFailure,
  productUpdateSuccess,
  productUpdateFailure
}
