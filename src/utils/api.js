// 引入 axios、Element UI 的 Message 组件以及路由对象
import axios from 'axios'
import { Message } from "element-ui"
import router from '../router'

// axios 全局响应拦截器
axios.interceptors.response.use(success => {
  // 请求成功，但后端返回状态码为 500（业务错误）的情况
  if (success.status && success.status === 200 && success.data.status === 500) {
    Message.error({ message: success.data.msg })
    return
  }
  // 请求成功且服务器返回消息时，显示成功提示
  if (success.data.msg) {
    Message.success({ message: success.data.msg })
  }
  // 返回响应数据
  return success.data
}, error => {
  // 根据 HTTP 状态码显示不同的错误提示
  if (error.response.status === 504) {
    Message.error({ message: '找不到服务器' })
  } else if (error.response.status === 403) {
    Message.error({ message: '权限不足，请联系管理员' })
  } else if (error.response.status === 401) {
    Message.error({ message: '尚未登录，请登录' })
    router.replace("/")  // 跳转到登录页
  } else if (error.response.status === 404) {
    Message.error({ message: '服务器无法根据客户端的请求找到资源' })
  } else if (error.response.status === 500) {
    Message.error({ message: '服务器内部错误，无法完成请求' })
  } else {
    if (error.response.data) {
      Message.error({ message: error.response.data.msg })
    } else {
      Message.error({ message: '未知错误!' })
    }
  }
  return
})

// 定义基础 URL 前缀（如有需要可修改）
let base = ''

/**
 * 封装表单数据格式的 POST 请求
 * 将数据转换为 application/x-www-form-urlencoded 格式
 */
export const postKeyValueRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let i in data) {
        ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

/**
 * 封装普通 POST 请求
 */
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params
  })
}

/**
 * 封装 PUT 请求
 */
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params
  })
}

/**
 * 封装 GET 请求
 */
export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    data: params
  })
}

/**
 * 封装 DELETE 请求
 */
export const deleteRequest = (url, params) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`,
    data: params
  })
}
