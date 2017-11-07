'use strict'
const store = require('../store.js')
const handlebars = require('../handlebars.js')

const onIndexSuccess = function (response, status, xhr) {
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
  $('#item-view-modal').modal('show')
}

module.exports = {
  onIndexSuccess,
  onIndexFailure,
  onGetSuccess,
  onGetFailure
}
