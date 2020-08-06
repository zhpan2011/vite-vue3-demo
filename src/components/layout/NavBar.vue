<template>
    <nav class="navbar is-bold app-navbar animated" :class="{ slideInDown: show, slideOutDown: !show }">
        <div class="navbar-brand">
            <a class="navbar-item is-hidden-mobile">
                <router-link :to="'/'">
                    <img :src="brandUrl" alt="">
                </router-link>
            </a>
            <a class="navbar-item is-hidden-tablet" @click="toggleSidebar({opened: !state.sidebar.opened})">
<!--                <b-icon icon="home" aria-hidden="true" v-show="!state.sidebar.hidden"></b-icon>-->
            </a>
            <div class="navbar-burger burger" data-target="navMenu" @click="showBurger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div class="navbar-menu" id="navMenu">
            <div class="navbar-start">
            </div>

            <div class="navbar-end">
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link" href="#">
                        {{ state.username }}
                    </a>
                    <div class="navbar-dropdown is-right">
                        <router-link class="navbar-item" :to="'/me'">
                            个人中心
                        </router-link>
                        <hr class="navbar-divider">
                        <label>
                            <a class="navbar-item is-warning" href="#">
                                <span @click="logout">注销</span>
                            </a>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    import {ref, onMounted} from 'vue';
    import {useStore} from 'vuex'
    import {useRouter} from "vue-router";
    import {IMG_URL, BRAND} from '../../utils/constant'
    import {toast} from "bulma-toast";

    export default {
        name: "NavBar",
        props: ['show'],
        setup() {
            const router = useRouter()
            const brandUrl = ref(IMG_URL + BRAND)
            const {state, dispatch, commit} = useStore();

            const showBurger = () => {
                const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
                if ($navbarBurgers.length > 0) {
                    $navbarBurgers.forEach(function ($el) {
                        const target = $el.dataset.target;
                        const $target = document.getElementById(target);
                        $el.classList.toggle('is-active');
                        $target.classList.toggle('is-active');
                    });
                }
            }
            const hideBurger = () => {
                const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
                if ($navbarBurgers.length > 0) {
                    $navbarBurgers.forEach(function ($el) {
                        const target = $el.dataset.target;
                        const $target = document.getElementById(target);
                        $el.classList.remove('is-active');
                        $target.classList.remove('is-active');
                    });
                }
            }
            const toggleSidebar = (config) => {
                commit('ToggleSidebar', config)
            }
            const logout = () => {
                dispatch('Logout').then(() => {
                    toast({
                        message: "已安全退出！",
                        type: "is-success",
                        duration: 1500,
                        dismissible: true,
                        animate: {in: 'bounceInRight', out: 'bounceOutRight'}
                    })
                    setTimeout(() => {
                        router.push('/login');
                    }, 2000);
                })
            }

            onMounted(() => {
                const handler = () => {
                    hideBurger()
                };
                window.addEventListener('scroll', handler);
            })

            return {
                brandUrl,
                state,
                showBurger,
                toggleSidebar,
                logout
            }
        }
    }
</script>

<style lang="scss" scoped>
    .app-navbar {
        position: fixed;
        min-width: 100%;
        z-index: 1024;
        box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
    }
</style>
