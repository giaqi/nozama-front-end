'use strict'
const config = require('../config')
const store = require('../store.js')

const indexItems = function () {
  return $.ajax({
    url: config.apiOrigin + '/products',
    method: 'GET'
  })
}

const getItem = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/products/' + data,
    method: 'GET'
  })
}

const getByName = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/products?name=' + data,
    method: 'GET'
  })
}

const updateItem = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/products/' + store.user.currentProduct.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  indexItems,
  getItem,
  getByName,
  updateItem
}
