import axios from 'axios';
import router from '../router';
import Vue from 'vue'
const config = require('../config/config.dev')
// 创建axios实例
let options = {
  // baseURL: config.baseURL,
  baseURL: config.product,//服务器
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json',
    'AuthorizationKey': window.localStorage.user ,
  }

}
let service = axios.create(options)

// request拦截器
service
  .interceptors
  .request
  .use(request => {
    request.headers = { "AuthorizationKey": window.localStorage.getItem("user") };
    // request.headers.common["Access-Control-Allow-Origin"]="*"
    return request
  }, error => {
    console.log(error)
    Promise.reject(error)

  })

// respone拦截器
service
  .interceptors
  .response
  .use(response => {
    console.log(JSON.stringify(response))
  

    if (response.status !== 200) {
      return Promise.reject('error')
    } else {
      // var res = JSON.parse(response.data)
      // Params.reslove()

      return response.data
    }
  }, error => {
    console.log(error)
    // 错误提示
    // ElementUI.Message({
    //   type: 'error',
    //   message: error.response.data.msg
    // })
    // MintUI.MessageBox('提示', error.message);
    // document.dispatchEvent(new Event('error'))

    return Promise.reject(error)
  })

export default service