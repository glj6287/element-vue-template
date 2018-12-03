import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import Qs from "qs"

// 创建axios实例
const service = axios.create({
  responseType: 'arraybuffer',
  baseURL: process.env.BASE_API, // api的base_url
  transformRequest: [function (data) {
    return Qs.stringify(data) // Send with Form Data, not Request payload
  }],
  timeout: 500000                  // 请求超时时间
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
    const content = response.data
    const elink = document.createElement('a') // 创建a标签
    // 获取文件名
    let fileName = decodeURI(response.headers[ "content-type" ].split(";")[2].replace("[","").replace("]",""));
    elink.download = fileName // 文件名
    elink.style.display = 'none'
    const blob = new Blob([content])
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click() // 触发点击a标签事件
    document.body.removeChild(elink)
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
