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
import NavBar from './NavBar.vue';
import SideBar from './SideBar.vue';
import LevelBar from './LevelBar.vue';
import FooterBar from './FooterBar.vue';
import {computed, onMounted, reactive, toRefs} from 'vue';
import {useStore} from 'vuex';

export default {
  components: {
    NavBar,
    SideBar,
    LevelBar,
    FooterBar,
  },
  setup() {
    const {getters, dispatch} = useStore();
    const data = reactive({
      width: 400,
      ratio: 3,
    });

    const hiddenSidebarStyle = computed(() => {
      return getters.sidebar.hidden ? {'margin-left': 0} : null;
    });

    const handleSidebar = () => {
      if (!document.hidden) {
        let rect = document.body.clientWidth;
        let isMobile = rect - data.ratio < data.width;
        dispatch('ToggleDevice', isMobile ? 'mobile' : 'other');
        dispatch('ToggleSidebar', {opened: !isMobile});
      }
    };

    onMounted(() => {
      // 因为监听DOMContentLoaded失效，故加载前先执行一次
      handleSidebar();
      const handler = () => {
        handleSidebar();
      };
      window.addEventListener('scroll', handler);
      window.addEventListener('resize', handler);
      document.addEventListener('visibilitychange', handler);
    });

    return {
      ...toRefs(data),
      hiddenSidebarStyle,
    };
  },
};
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