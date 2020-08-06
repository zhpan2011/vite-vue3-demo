<template>
    <footer class="footer">
        <div class="container">
            <div class="content has-text-centered">
                <p>
                    @2020 杭州财务管理系统
                </p>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {}
</script>

<style lang="scss" scoped>
    @import './node_modules/bulma/sass/utilities/_all';

    .footer {
        margin-left: 90px;

        @include mobile() {
            margin-left: 0;
        }
    }
</style>