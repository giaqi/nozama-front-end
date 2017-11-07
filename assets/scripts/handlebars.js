'use strict'

const accountManagementHandlebar = require('./templates/account-management.handlebars')
const showItemIndexTemplate = require('./templates/index_items.handlebars')
const showItemTemplate = require('./templates/item.handlebars')

const accountManagement = function () {
  showContent(accountManagementHandlebar())
}

const showItemIndex = function (data) {
  const showItemIndexHtml = showItemIndexTemplate({products: data})
  showContent(showItemIndexHtml)
}

const showItemSmall = function (data) {
  const showItemSmallHtml = showItemTemplate({product: data})
  $('#item-view').empty()
  $('#item-view').append(showItemSmallHtml)
}

const showContent = function (data) {
  $('#content').empty()
  $('#content').append(data)
}

module.exports = {
  accountManagement,
  showItemSmall,
  showItemIndex
}
