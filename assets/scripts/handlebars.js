'use strict'

const accountManagementHandlebar = require('./templates/account-management.handlebars')

const accountManagement = function () {
  showContent(accountManagementHandlebar())
}

const showContent = function (data) {
  $('#content').empty()
  $('#content').append(data)
}

module.exports = {
  accountManagement
}
