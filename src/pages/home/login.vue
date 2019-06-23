<template>
    <div class="login-wrap">
        <el-form :model="userInfo" :rules="rule" label-width="100px" ref="loginForm">
            <el-form-item label="账号" prop="account">
                <el-input v-model="userInfo.account"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
                <el-input show-password v-model="userInfo.pwd"></el-input>
            </el-form-item>
            <el-form-item>
                <AsyncButton @_click="checkForm" _style="width:100%" _type="primary" label="登录"/>
            </el-form-item>
            <el-form-item>
                <el-button @click="findPwd" type="text">忘记密码？</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import AsyncButton from '@/components/asyncButton'

    export default {
        name: "login",
        components: {
            AsyncButton
        },
        data() {
            return {
                userInfo: {
                    account: '',
                    pwd: ''
                }
            }
        },
        created() {
            this.rule = {
                account: [
                    {required: true, message: '请输入账号', trigger: 'blur'}
                ],
                pwd: [{required: true, message: '请输入密码', trigger: 'blur'}]
            }
        },
        methods: {
            login(promise) {
                if (this.userInfo.account === 'york' && this.userInfo.pwd === '000000') {
                    this.$router.push('/resource');

                } else {
                    this.$message.error('账户或者密码错误');
                }
            },
            checkForm(promise) {
                this.$refs['loginForm'].validate((valid) => {
                    if (valid) {
                        this.login(promise);
                    }
                });
            },
            findPwd() {
                this.$router.push('/login/findPwd');
            }
        }
    }
</script>

<style scoped>
    .login-wrap {
        width: 450px;
        margin: 0 auto;
    }
</style>