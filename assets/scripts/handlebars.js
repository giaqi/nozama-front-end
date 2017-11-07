'use strict'

const accountManagementHandlebar = require('./templates/account-management.handlebars')
const showItemIndexTemplate = require('./templates/index_items.handlebars')
const showItemTemplate = require('./templates/item.handlebars')
const itemFailureTemplate = require('./templates/item_failure.handlebars')

const accountManagement = function () {
  showContent(accountManagementHandlebar())
}

const showItemIndex = function (data) {
  const showItemIndexHtml = showItemIndexTemplate({products: data})
  showContent(showItemIndexHtml)
}

const showItemSmall = function (data) {
  const showItemSmallHtml = showItemTemplate({product: data})
  showItemView(showItemSmallHtml)
}

const showContent = function (data) {
  $('#content').empty()
  $('#content').append(data)
}

const itemFailure = function () {
  showItemView(itemFailureTemplate())
}

const showItemView = function (data) {
  $('#item-view').empty()
  $('#item-view').append(data)
}

module.exports = {
  accountManagement,
  showItemSmall,
  showItemIndex,
  itemFailure
}
