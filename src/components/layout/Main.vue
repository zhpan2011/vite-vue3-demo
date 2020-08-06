<template>
    <div id="main">
        <nav-bar :show="true"></nav-bar>
<!--        <side-bar :show="sidebar.opened && !sidebar.hidden"></side-bar>-->
        <side-bar :show="true"></side-bar>
        <section class="app-main" :style="[hiddenSidebarStyle]">
            <div class="container is-fluid is-marginless app-content">
                <level-bar></level-bar>
                <router-view v-slot="{ Component }" class="animated">
                    <transition mode="out-in"
                                enter-active-class="fadeIn"
                                leave-active-class="fadeOut"
                                appear>
                        <keep-alive>
                            <component :is="Component"/>
                        </keep-alive>
                    </transition>
                </router-view>
            </div>
        </section>
<!--        <footer-bar></footer-bar>-->
    </div>
</template>

<script>
    // import {mapGetters, mapActions} from 'vuex'
    import NavBar from './NavBar.vue'
    import SideBar from './SideBar.vue'
    import LevelBar from './LevelBar.vue'
    import FooterBar from './FooterBar.vue'

    export default {
        components: {
            NavBar,
            SideBar,
            LevelBar,
            FooterBar
        },
        //     data() {
        //         return {
        //             width: 768,
        //             ratio: 3
        //         }
        //     },
        //     computed: {
        //         ...mapGetters([
        //             'sidebar'
        //         ]),
        //         hiddenSidebarStyle() {
        //             return this.sidebar.hidden ? {'margin-left': 0} : null
        //         }
        //     },
        //     methods: {
        //         ...mapActions([
        //             'ToggleDevice',
        //             'ToggleSidebar'
        //         ]),
        //         handleSidebar() {
        //             if (!document.hidden) {
        //                 let rect = document.body.clientWidth;
        //                 let isMobile = rect - this.ratio < this.width;
        //                 this.ToggleDevice(isMobile ? 'mobile' : 'other');
        //                 this.ToggleSidebar({opened: !isMobile})
        //             }
        //         }
        //     },
        //     mounted() {
        //         // 因为监听DOMContentLoaded失效，故加载前先执行一次
        //         this.handleSidebar();
        //         const handler = () => {
        //             this.handleSidebar()
        //         };
        //         window.addEventListener('scroll', handler);
        //         window.addEventListener('resize', handler);
        //         document.addEventListener('visibilitychange', handler)
        //     }
    }
</script>

<style lang="scss" scoped>
    @import './node_modules/bulma/sass/utilities/_all';

    .app-main {
        padding-top: 50px;
        margin-left: 180px;
        transform: translate3d(0, 0, 0);

        @include mobile() {
            margin-left: 0;
        }

    }

    .app-content {
        padding: 20px;
    }
</style>
