import Api from '@/middleware/Api'

export default {
  register(credentials) {
    return Api().post('register', credentials)
  },
  confirmRegister(credentials) {
    return Api().post('confirmRegister', credentials)
  },
  completeSpecification(data,token) {
    return Api(token).post('completeSpecification', data)
  },
  login(credentials) {
    return Api().post('login', credentials)
  }
}
