<template>
    <div class="content has-text-centered">
        <div class="column is-4 is-offset-4">
            <div class="box">
                <h2 class="is-title is-bold">请登录</h2>

                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">用户名</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <p class="control">
                                <label>
                                    <input v-model="loginInfo.username" maxlength="10" minlength="5"
                                           class="input" type="text"
                                           placeholder="请输入用户名" required>
                                </label>
                            </p>
                        </div>
                    </div>
                </div>

                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">密码</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <p class="control">
                                <label>
                                    <input v-model="loginInfo.password"
                                           class="input" type="password"
                                           placeholder="请输入密码" @keyup.enter.native="login" required>
                                </label>
                            </p>
                        </div>
                    </div>
                </div>
                <p class="control">
                    <button class="button is-primary" @click="login">登录</button>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import {reactive, toRefs} from 'vue';
    import {useStore} from 'vuex'
    import {useRouter} from "vue-router";
    import {toast} from "bulma-toast";

    export default {
        setup() {
            const router = useRouter()
            const {dispatch} = useStore();
            const data = reactive({
                loginInfo: {
                    username: 'admin',
                    password: '123456'
                }
            })
            const login = () => {
                dispatch('Login', data.loginInfo).then(() => {
                    toast({
                        message: "登录成功！",
                        type: "is-success",
                        duration: 1500,
                        dismissible: true,
                        animate: {in: 'bounceInRight', out: 'bounceOutRight'}
                    });
                    setTimeout(() => {
                        router.push('/');
                    }, 2000);
                });
            }
            return {
                ...toRefs(data),
                login
            }
        }
    }
</script>

<style scoped>
    .content {
        padding: 30px;
    }
</style>