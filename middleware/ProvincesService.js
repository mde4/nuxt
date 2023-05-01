import Api from '@/middleware/Api'

export default {
  provinces() {
    return Api().get('provinces')
  },
  cities(provinceId) {
    return Api().get(`provinces/${provinceId}`)
  },  
  login(credentials) {
    return Api().post('login', credentials)
  }
}
