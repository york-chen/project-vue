<template>
    <div class="login-wrap">
        <div><img :src="imgFinger" alt="指纹登录" class="img-finger"></div>
        <div>请录入指纹</div>
        <div class="btn-wrap">
            <el-button @click="loginByPwd" type="text">账号密码登录</el-button>
        </div>
    </div>
</template>

<script>
    import imgFinger from '@/assets/images/finger.jpg'

    export default {
        name: "finger",
        created() {
            this.imgFinger = imgFinger;
        },
        methods: {
            loginByPwd() {
                this.$router.push('/login/index')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .login-wrap {
        width: 450px;
        margin: 0 auto;
        text-align: center;
        padding-left: 100px;

        .img-finger {
            width: 150px;
        }

        .btn-wrap {
            margin-top: 20px;
        }
    }
</style>