import Api from '@/middleware/Api'

export default {
  index(search) {
    return Api().get('products', {
      params: {
        search: search
      }
    })
  },
  show() {
    return Api().get(`shopping-cart`)
  },
  addToCart(productId, count) {
    return Api().get(`shopping-cart/${productId}/count/${count}`)
  },
  deleteFromCart(productId) {
    return Api().delete(`shopping-cart/remove/${productId}`)
  },
  put(product) {
    return Api().put(`products/${product.id}`, product)
  },
  applyCoupon(productId,coupon) {
    return Api().post(`applyCoupon`,{productId,coupon})
  },
  registerOrder() {
    return Api().post(`orderpay`)
  },
  changePostApproach(approach) {
    return Api().post(`changePostApproach`,{approach})
  }
}
