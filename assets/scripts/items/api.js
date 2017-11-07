'use strict'
const config = require('../config')
const store = require('../store.js')

const indexItems = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/products',
    method: 'GET',
    data: data
  })
}

module.exports = {
  indexItems
}
