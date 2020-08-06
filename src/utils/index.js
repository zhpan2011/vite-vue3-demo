import store from '../store'

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 */
export function filterAsyncRouter(asyncRouter, role) {
    return asyncRouter.filter(route => {
        if (hasPermission(role, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, role)
            }
            return true
        }
        return false
    })
}

/**
 * 判断是否拥有权限
 * @param {Array<string>} permissions - 要判断的权限列表
 */
export function hasPermission(permissions = []) {
    // 这里要判断的权限没有设置的话，就等于不需要权限，直接返回 true
    if (!permissions.length) return true
    const permissionList = store.getters.permissions;
    return !!permissions.find(permission => permissionList.includes(permission))
}