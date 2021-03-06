import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import Qs from "qs"

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  transformRequest: [function (data) {
    return Qs.stringify(data) // Send with Form Data, not Request payload
  }],
  timeout: 15000                  // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
      * code为非000000是抛错
      */
    const res = response.data
    if (res.code != "000000") {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })

      // TOKEN_000005:非法请求; 50012:其他客户端登录了;  TOKEN_000002:Token 过期了;
      if (res.code == "TOKEN_000005" || res.code == "TOKEN_000002" || res.code === 'USER_000014') {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录，登出原因：' + res.msg, '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject(res.msg)
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
