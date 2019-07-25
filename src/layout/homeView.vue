<template>
    <div class="home-wrap">
        <p class="pro-name">企业级密码关系系统</p>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "homeView",
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    .home-wrap {
        height: 100%;
        background-color: rgb(220, 223, 230);
        padding-top: 1px;

        .pro-name {
            font-size: 20px;
            margin-bottom: 70px;
            margin-top: 10%;
            text-align: center;
            padding-left: 100px;
        }
    }
</style>