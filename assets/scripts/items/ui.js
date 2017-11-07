'use strict'
const store = require('../store.js')
const handlebars = require('../handlebars.js')

const onIndexSuccess = function (response, status, xhr) {
  handlebars.showItemIndex(response.products)
  // console.log(response)
  // console.log('In onIndexSuccess, status is ')
  // console.log(status)
  // console.log('In onIndexSuccess, xhr is ')
  // console.log(xhr)
}

const onIndexFailure = function (response, status, xhr) {
  console.log('In onIndexFailure, response is ')
  console.log(response)
  console.log('In onIndexFailure, status is ')
  console.log(status)
  console.log('In onIndexFailure, xhr is ')
  console.log(xhr)
}

module.exports = {
  onIndexSuccess,
  onIndexFailure
}
