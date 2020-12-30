// 1、引入axios模块
import axios from 'axios';

/**
 * 获取头部信息
 */
function getHeaders() {
  const headers = new Headers()
  headers.append('accept', 'application/json')
  headers.append('content-type', 'application/json; charset=utf-8')
  return headers
}

// 2、判断是什么环境 -- 开发环境 -- 生产环境
const isDev = process.env.NODE_ENV === 'development'

// 3、自定义axios
let request = axios.create({
  // 基础的请求地址
  baseURL: isDev ? '' : 'http://172.25.0.125'
})

// 4、给全部请求添加头信息
// request.defaults.headers['token'] = localStorage.getItem('token')
request.defaults.headers.get['Accept'] = 'application/json'
request.defaults.headers.get['Content-Type'] = 'application/json; charset=utf-8'

/**
 * axios请求与响应拦截器
 * http://www.axios-js.com/zh-cn/docs/#%E6%8B%A6%E6%88%AA%E5%99%A8
 */
// axios添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前
  // 所有的请求都需要的字段，所有的请求添加loading效果
  // token
  config.headers['token'] = localStorage.getItem('token')
  return config;
});

// axios添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // 消除请求的loading效果
  return response.data;
});

// 5、暴露axios模块
export default request;