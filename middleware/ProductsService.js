import Api from '@/middleware/Api'

export default {
  index (store) {
    console.log("store1")
    console.log(store)
    return Api(store.state.token).get('products?page=0&pageSize=20', {
      // params: {
      //   search: search
      // }
    })
  },
  show (productId) {
    return Api().get(`products/${productId}`,{withCredentials: true})
  },
  showMyOrder (productId) {
    return Api().get(`showMyOrder/${productId}`,{withCredentials: true})
  },
  myOrders(){
    return Api().get(`myorders`,{withCredentials: true})
  },
  post (product) {
    return Api().post('products', product)
  },
  put (product) {
    return Api().put(`products/${product.id}`, product)
  }
}
