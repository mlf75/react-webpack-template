/**
 * 根据每个项目的后端接口约定返回结构调整此文件
 * */

import axios from "axios";
import {notification} from "antd";

axios.defaults.retry = 0;
axios.defaults.retryDelay = 1000;
axios.defaults.headers.common['Cache-Control'] = 'no-cache'
// axios.defaults.baseURL = '/dataassets/api' // 后端接口前缀，统一配置处

/**
 * axios拦截器
 */
axios.interceptors.response.use(
  response => {
    if (response.data && response.data.success === false) {
      return Promise.reject(response);
    }
    return Promise.resolve(response);
  },
  error => {
    const {config, response} = error;
    // If config does not exist or the retry option is not set, reject
    if (!config || (config.retry && config.retry === 0)) {
      return Promise.reject(error);
    }
    // Set the variable for keeping track of the retry count
    config.retryCount = config.retryCount || 0;

    // Check if we've maxed out the total number of retries
    if (config.retryCount >= config.retry) {
      if (error) {
        const status = response && response.status
        switch (status) {
          case 404:
            notification.error({
              message: `请求接口不存在 ${status}`,
              // description: errRes.data.description,
              duration: 3,
              style: {
                width: 484,
                marginLeft: 384 - 484,
              },
            });
        }
      }
      // Reject with the error
      return Promise.reject(error);
    }

    // Increase the retry count
    config.retryCount += 1;

    // Create new promise to handle exponential backoff
    const backoff = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, config.retryDelay || 1);
    });

    // Return the promise in which recalls axios to retry the request
    return backoff.then(() => axios(config));
  }
);

/**
 * ajax请求同意封装
 *
 * @param    {{config: object axios请求配置, success: object 请求成功配置, error: object 请求失败配置}}
 * @return   {Promise} response   ajax请求结果
 *
 * @date     18-3-22
 * @author   gongtiexin
 */
const request = ({config, success, error}) =>
  axios(config).then(
    response => {
      if (success) {
        notification.success(success);
      }
      return Promise.resolve(response);
    },
    (errRes) => {
      if (error) {
        notification.error(error);
      } else {
        if (errRes.data && !errRes.data.success) {
          if (errRes.data && errRes.data.code) {
            const code = errRes.data.code || ''
            const data = errRes.data.data || {}
            if (code != 200) {
              switch (Number(code)) {
                case 401:
                case 402:
                case 403: {
                  return window.location.href = `${data.loginPage}?clientId=${data.clientId}&gotoPage=${`${window.location.protocol + "//:" +window.location.href}`}`;
                }
                case 300:
                  notification.warn({
                    message: '警告',
                    description: errRes.data.msg,
                    duration: 3,
                    style: {
                      width: 484,
                      marginLeft: 384 - 484,
                    },
                  });
                  break
                default:
                  notification.error({
                    message: `请求错误 ${code}`,
                    description: errRes.data.description,
                    duration: 3,
                    style: {
                      width: 484,
                      marginLeft: 384 - 484,
                    },
                  });
              }
            }
          } else {
            notification.error({
              message: `请求错误 ${errRes.data.code || ''}`,
              description: errRes.data.description,
              duration: 3,
              style: {
                width: 484,
                marginLeft: 384 - 484,
              },
            });
          }
        }
      }
      return Promise.reject(errRes);
    }
  );

export default request;
