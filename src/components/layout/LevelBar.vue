<template>
    <nav class="level app-levelbar">
        <div class="level-left">
            <div class="level-item">
                <h3 class="title is-5">
                    <strong>{{ name }}</strong>
                </h3>
            </div>
        </div>

        <div class="level-right is-hidden-mobile">
            <breadcrumb :list="list"/>
        </div>
    </nav>
</template>

<script>
    import {reactive, toRefs, onMounted, watch, computed} from 'vue'
    import {useRouter} from "vue-router";
    import Breadcrumb from 'vue-bulma-breadcrumb'

    export default {
        name: "LevelBar",
        components: {
            Breadcrumb
        },
        setup() {
            const router = useRouter()
            const data = reactive({
                list: null,
                name: router.name
            })

            const getList = () => {
                // let matched = router.matched.filter(item => item.name);
                // let matched = router.matched.filter(item => item.name);
                // let first = matched[0];
                // if (first && (first.name !== 'Home' || first.path !== '')) {
                //     matched = [{name: 'Home', path: '/'}].concat(matched)
                // }
                // this.list = matched
            }

            onMounted(() => {
                getList()
            })

            watch(router, () => {
                getList()
            })

            return {
                ...toRefs(data)
            }
        }
    }
</script>
