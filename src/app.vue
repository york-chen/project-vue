<template>
    <p class="demo">
        这是我的第一个vue自建项目 by york.chen
        <Home :users="users"/>
        parent:{{users.age}}
        <button @click="changeUser">点击我</button>
        {{_isVue}} {{_uid}}
    </p>
</template>

<script>
    import Home from '@/pages/home'

    export default {
        data() {
            return {
                users: {name: 'we'}
            }
        },
        components: {
            Home
        },
        methods: {
            changeUser() {
                this.users = {age: 30};
                console.log(this.$options);
            }
        }
    }
</script>

<style lang="css" scoped>
    p {
        color: red;
    }

    .demo {
        font-size: 18px;
    }
</style>