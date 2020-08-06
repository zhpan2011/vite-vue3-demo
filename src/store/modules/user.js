import * as ls from '../../utils/localStorage'
import {login, getInfo, logout} from '../../api/loginApi'

const user = {
    state: {
        token: ls.getToken(),
        username: '',
        avatar: '',
        permissions: []
    },
    getters: {
        token: state => state.token,
        username: state => state.username,
        avatar: state => state.avatar,
        permissions: state => state.permissions
    },
    actions: {
        // 登录
        Login({commit}, loginInfo) {
            return new Promise((resolve, reject) => {
                login(loginInfo).then(res => {
                    const data = res.data;
                    commit('SET_TOKEN', data.token);
                    ls.setToken(data.token);
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取登录信息
        GetInfo({commit}) {
            return new Promise((resolve, reject) => {
                getInfo().then(res => {
                    const data = res.data;
                    commit('SET_USERNAME', data.userInfo.userName)
                    commit('SET_AVATAR', data.userInfo.avatar)
                    commit('SET_PERMISSIONS', data.permissions)
                    resolve(data.permissions)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        Logout({commit}) {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    commit('SET_TOKEN', '');
                    ls.removeToken();
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端登出
        FedLogout({commit}) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                ls.removeToken();
                resolve()
            })
        }
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_USERNAME: (state, username) => {
            state.username = username;
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_PERMISSIONS: (state, permissions) => {
            state.permissions = permissions
        }
    }
}

export default user