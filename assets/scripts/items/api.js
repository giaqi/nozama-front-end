'use strict'
const config = require('../config')

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

module.exports = {
  indexItems,
  getItem,
  getByName
}
