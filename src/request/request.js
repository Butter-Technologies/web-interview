import axios from 'axios';
import router from '../router';
// import store from '../store';
// console.log(store);

let BASEURL = '';
if (process.env.NODE_ENV === 'dev') {
  BASEURL = ''; // 开发环境
} else if (process.env.NODE_ENV === 'production') {
  BASEURL = 'http://116.236.59.98:8019/'; // 生产环境
}
import {Message} from 'element-ui';

axios.defaults.withCredentials = true; //配置允许跨域携带cookie
const HttpError = {
  400: '请求错误',
  401: '未授权，请登录',
  403: '拒绝访问',
  404: '求地址出错',
  408: '请求超时',
  500: '服务器开个小差，请稍后再试',
  501: '服务器开个小差，请稍后再试',
  502: '服务器开个小差，请稍后再试',
  503: '服务器开个小差，请稍后再试',
  504: '服务器开个小差，请稍后再试',
  505: 'HTTP版本不受支持'
};

axios.interceptors.request.use(
  config => {
    config.headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    };
    // if(store.token){
    //   let token="Bearer " + store.token;
    //   config.headers.authorization = token;
    // }
    config.crossDomain = true; //配置跨域状态
    config.timeout = 200000; //配置超时时间
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 拦截响应response，并做一些错误处理
axios.interceptors.response.use(
  res => {
    return res;
  },

  error => {
    return Promise.reject(error);
  }
);

/**
 * @func axios的二次封装
 * @param method-请求方法，url-接口地址，data-请求参数 config配置参数 rouleData路由拼接参数，noCatch不适用默认的catch拦截提示
 */
const request = (
  url,
  data = {},
  method = 'GET',
  config = {
    rouleData: '',
    noCatch: false
  }
) => {
  let params;
  if (['GET', 'PUT'].indexOf(method.toUpperCase()) !== -1) {
    params = 'params';
  } else {
    params = 'data';
  }
  return new Promise((resolve, reject) => {
    axios({
      url: BASEURL + url + config.rouleData,
      method: method,
      [params]: data
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(e => {
        reject(e);
        if (config.noCatch) return false;
        if (e.response.data.code != 200) {
          if (e.response.data.code == 401) {
            router.replace({
              path: '/login',
              query: {redirect: router.currentRoute.fullPath}
            });
          } else {
            Message({
              type: 'error',
              message:
                e.response.data.message || HttpError[e.response.data.code]
            });
          }
        }
      });
  });
};

export default request;
