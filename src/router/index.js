import {createRouter, createWebHistory} from 'vue-router';
import {constantRouter} from './router';
// import store from '../store'
// import {hasPermission} from '../utils'
import {getToken} from '../utils/localStorage'
// import {openMessage} from '../utils/extends'
import NProgress from 'nprogress'
import 'nprogress/css/nprogress.css'
import Login from "../views/login.vue";


const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'is-active',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            if (to.matched.every((record, i) => from.matched[i] !== record)) {
                return {x: 0, y: 0};
            }
        }
        return false;
    },
    routes: constantRouter
});

// 进度条配置
NProgress.configure({showSpinner: false, easing: 'ease', speed: 500, minimum: 0.1});

// 免登录白名单
const whiteList = ['/login'];

router.beforeEach((to, from, next) => {
    NProgress.start();
    window.document.title = to.meta.title || 'Vue Admin';
    if (getToken()) { // 是否存在token
        if (to.path === '/login') {
            next('/');
            NProgress.done()
        } else {
            // if (store.getters.username.length === 0) {
            //     store.dispatch('GetInfo').then(res => {
            //         const { permissions } = to.meta.permissions;
            //         if (permissions) {
            //             const hasPermission = hasPermission(permissions)
            //             if (!hasPermission) {
            //                 next('/403')
            //             }
            //         }
            next()
            //     }).catch(() => {
            //         store.dispatch('FedLogout').then(() => {
            //             openMessage({
            //                 message: '验证信息失败，请重新登录',
            //                 type: 'warning'
            //             });
            //             next('/')
            //         })
            //     })
            // } else {
            //     if (hasPermission(store.getters.role, to)) {
            //         next()
            //     } else {
            //         next({path: '/403', replace: true, query: {noGoBack: true}})
            //     }
            // }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next()
        } else {
            next('/login'); // 否则全部重定向到登录页
            NProgress.done()
        }
    }
});
router.afterEach(() => {
    NProgress.done();
});

export default router;
