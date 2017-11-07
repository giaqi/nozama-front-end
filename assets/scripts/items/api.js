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

module.exports = {
  indexItems,
  getItem
}
