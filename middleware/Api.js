import axios from 'axios'
// import store from '@/store'
export default ( token) => {
  console.log("tokenAPI")
  console.log(token)
  return axios.create({
    baseURL: `http://localhost:3443/` ,
    // baseURL: `https://mamaniniha.ir:3443`,
    headers: {
      Authorization: `Bearer ${token}`
    },
     withCredentials: true,
    // timeout: 60000
  })
}