import Main from '../components/layout/Main.vue';
import Login from '../views/login.vue'
import Home from '../views/home.vue'
import Demo1 from '../views/test/demo1.vue'
import Demo2 from '../views/test/demo2.vue'
import Demo3 from '../views/test/demo3.vue'
import Page403 from '../views/error/403.vue'
import Page404 from '../views/error/404.vue'
import Page500 from '../views/error/500.vue'

export const constantRouter = [
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录'
        },
        hidden: true,
        component: Login
    },
    {
        path: '/403',
        name: 'error-403',
        meta: {
            title: '权限不足'
        },
        hidden: true,
        component: Page403
    },
    {
        path: '/404',
        name: 'error-404',
        meta: {
            title: '页面不存在'
        },
        hidden: true,
        component: Page404
    },
    {
        path: '/500',
        name: 'error-500',
        meta: {
            title: '服务端错误'
        },
        hidden: true,
        component: Page500
    },
    {
        path: '/',
        redirect: '/home',
        meta: {
            icon: 'fa-tachometer',
            expanded: false
        },
        component: Main,
        children: [
            {
                path: 'home',
                name: '首页',
                meta: {
                    title: '首页'
                },
                component: Home
            }
        ]
    },
    {
        path: '/test',
        name: 'test',
        meta: {
            icon: 'fa-table',
            expanded: true,
            permissions: ['t']
        },
        component: Main,
        children: [
            {
                path: 'demo1',
                name: 'demo1',
                meta: {
                    title: 'demo1',
                    permissions: ['t_1']
                },
                component: Demo1
            },
            {
                path: 'demo2',
                name: 'demo2',
                meta: {
                    title: 'demo2',
                    permissions: ['t_2']
                },
                component: Demo2,
                children: [
                    {
                        path: 'demo3',
                        name: 'demo3',
                        meta: {
                            title: 'demo3',
                            permissions: ['t_3']
                        },
                        component: Demo3
                    }
                ]
            }
        ]
    },
    {
        path: '/*',
        redirect: '/404',
        hidden: true
    }
];

export const asyncRouter = [
    // {
    //     path: '/',
    //     redirect: '/home',
    //     meta: {
    //         icon: 'fa-tachometer',
    //         expanded: false
    //     },
    //     component: Main,
    //     children: [
    //         {
    //             path: 'home',
    //             name: '首页',
    //             meta: {
    //                 title: '首页'
    //             },
    //             component: Home
    //         }
    //     ]
    // },
    // {
    //     path: '/test',
    //     name: 'test',
    //     meta: {
    //         icon: 'fa-table',
    //         expanded: false,
    //         permissions: ['t']
    //     },
    //     component: Main,
    //     children: [
    //         {
    //             path: 'demo1',
    //             name: 'demo1',
    //             meta: {
    //                 title: 'demo1',
    //                 permissions: ['t_1']
    //             },
    //             component: Demo1
    //         },
    //         {
    //             path: 'demo2',
    //             name: 'demo2',
    //             meta: {
    //                 title: 'demo2',
    //                 permissions: ['t_2']
    //             },
    //             component: Demo2,
    //             children: [
    //                 {
    //                     path: 'demo3',
    //                     name: 'demo3',
    //                     meta: {
    //                         title: 'demo3',
    //                         permissions: ['t_3']
    //                     },
    //                     component: Demo3
    //                 }
    //             ]
    //         }
    //     ]
    // },
    // {
    //     path: '*',
    //     redirect: '/404',
    //     hidden: true
    // }
];
