'use strict'
const store = require('./store')

const showAccountManagementTemplate = require('./templates/account-management.handlebars')
const showItemIndexTemplate = require('./templates/index_items.handlebars')
const showItemTemplate = require('./templates/item.handlebars')
const itemFailureTemplate = require('./templates/item_failure.handlebars')
const showCartTemplate = require('./templates/cart.handlebars')
const checkoutTemplate = require('./templates/checkout.handlebars')
const adminDashboardTemplate = require('./templates/admin-dashboard.handlebars')

const accountManagement = function (data) {
  data.forEach(purchase => {
    const date = new Date(purchase.createdAt)
    purchase.createdAt = date.toLocaleDateString() + ' at ' + date.toLocaleTimeString()
    purchase.totalPrice = purchase.totalPrice.toFixed(2)
    purchase.products.forEach(i => {
      i[0].price = (i[1] * i[0].price).toFixed(2)
    })
  })

  const showAccountManagementHtml = showAccountManagementTemplate({purchases: data})
  showContent(showAccountManagementHtml)
}
const adminDashboard = function () {
  showContent(adminDashboardTemplate())
}

const showItemIndex = function (data) {
  data.forEach(i => { i.price = i.price.toFixed(2) })
  const showItemIndexHtml = showItemIndexTemplate({products: data})
  showContent(showItemIndexHtml)
}

const showItemSmall = function (data) {
  data.price = data.price.toFixed(2)
  const showItemSmallHtml = showItemTemplate({product: data})
  showItemView(showItemSmallHtml)
}

const showCartView = function () {
  const data = store.user.cart
  data.forEach(i => { i[0].price = (i[0].price * i[1]).toFixed(2) })
  data.forEach(i => { i[0].quantity = i[1] })
  const cart = data.map(i => i[0])
  const showCartHtml = showCartTemplate({ cart: cart, price: store.user.cartItemPrice, total: store.user.cartItemTotal })
  showItemView(showCartHtml)
}

const checkoutView = function () {
  const data = store.user.cart
  const cart = data.map(i => i[0])
  const checkoutHtml = checkoutTemplate({ cart: cart, price: store.user.cartItemPrice, total: store.user.cartItemTotal })
  showItemView(checkoutHtml)
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
  showCartView,
  checkoutView,
  adminDashboard
}
