import request from '../utils/request'

export function login(data) {
    return request({
        url: '/login-direct',
        method: 'post',
        data: data
    })
}

export function getInfo() {
    return request({
        url: '/getInfo',
        method: 'get'
    })
}

export function logout() {
    return request({
        url: '/logout',
        method: 'get'
    })
}
