'use strict'

const handlebars = require('../handlebars.js')

const onIndexSuccess = function (response, status, xhr) {
  if (response.products.length === 0) {
    throw new Error()
  }
  $('#item-view-modal').modal('hide')
  handlebars.showItemIndex(response.products)
}

const onIndexFailure = function (response, status, xhr) {
  $('#content').html('<h4> Failed to load the store, please try again later</h4>')
}

const onGetSuccess = function (response, status, xhr) {
  handlebars.showItemSmall(response.product)
  $('#item-view-modal').modal('show')
}

const onGetFailure = function (response, status, xhr) {
  handlebars.itemFailure()
  $('input[data-search]').val('')
  $('#item-view-modal').modal('show')
}

module.exports = {
  onIndexSuccess,
  onIndexFailure,
  onGetSuccess,
  onGetFailure
}
