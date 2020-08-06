import {axios} from '@bundled-es-modules/axios'
import store from '../store'
import NProgress from 'nprogress'
import {BASE_URL, USER_TOKEN} from './constant'
import {getToken} from './localStorage'
// import {openMessage} from './extends'


// 创建axios实例
const service = axios.create({
    baseURL: BASE_URL, // api的base_url
    timeout: 5000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
    NProgress.start();
    if (store.getters.token) {
        config.headers[USER_TOKEN] = getToken()
    }
    return config
}, error => {
    console.log('requestErr: ' + error);
    Promise.reject(error).then()
});

// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;
        const code = res.status;
        if (code === 1000) {
            NProgress.done();
            return res;
        }
        // 90002:登录超时，请重新登录 90004:token已过期
        else if (code === 90002 || code === 90004) {
            // openMessage({
            //     message: res.message,
            //     type: 'warning'
            // }).then(() => {
            //     store.dispatch('FedLogout').then(() => {
            //         location.reload(); // 重新实例化vue-router对象
            //     });
            // })
        }
        // else {
        //     openMessage({
        //         message: res.message,
        //         type: 'danger'
        //     });
        //     NProgress.done();
        //     return Promise.reject('error');
        // }
    },
    error => {
        console.log(error);
        // openMessage({
        //     message: error.message,
        //     type: 'danger'
        // });
        NProgress.done();
        return Promise.reject(error)
    });

export default service;
