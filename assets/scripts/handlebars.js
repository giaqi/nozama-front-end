'use strict'
const store = require('./store')

const accountManagementTemplate = require('./templates/account-management.handlebars')
const showItemIndexTemplate = require('./templates/index_items.handlebars')
const showItemTemplate = require('./templates/item.handlebars')
const itemFailureTemplate = require('./templates/item_failure.handlebars')
const showCartTemplate = require('./templates/cart.handlebars')

const accountManagement = function () {
  showContent(accountManagementTemplate())
}

const showItemIndex = function (data) {
  const showItemIndexHtml = showItemIndexTemplate({products: data})
  showContent(showItemIndexHtml)
}

const showItemSmall = function (data) {
  const showItemSmallHtml = showItemTemplate({product: data})
  showItemView(showItemSmallHtml)
}

const showCartView = function () {
  const data = store.user.cart
  // data.forEach(i => { data[i]['total'] = data[i][1] * data[i][0]['price'] })
  data.forEach(i => { i[0].price = (i[0].price * i[1]).toFixed(2) })
  data.forEach(i => { i[0].quantity = i[1] })
  // data.forEach(i => console.log(i[0]))
  const cart = data.map(i => i[0])
  const showCartHtml = showCartTemplate({ cart: cart, price: store.user.cartItemPrice, total: store.user.cartItemTotal })
  showItemView(showCartHtml)
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
  itemFailure,
  showCartView
}
