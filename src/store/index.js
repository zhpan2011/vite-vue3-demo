import {createStore} from 'vuex';
import layout from './modules/layout'
import user from './modules/user'

export default createStore({
    modules: {
        layout,
        user
    }
});