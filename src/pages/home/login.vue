<template>
    <div class="login-wrap">
        <el-form :model="userInfo" :rules="rule" label-width="80px" ref="loginForm">
            <el-form-item label="账号" prop="username">
                <el-input maxlength="11" v-model="userInfo.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input show-password v-model="userInfo.password"></el-input>
            </el-form-item>
            <el-form-item>
                <AsyncButton @_click="checkForm" _style="width:100%" _type="primary" exec_label="登录中" label="登录"/>
            </el-form-item>
            <el-form-item>
                <div class="btn-wrap">
                    <el-button @click="findPwd" type="text">忘记密码？</el-button>
                    <el-button @click="loginByFinger" type="text">指纹登录</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import AsyncButton from '@/components/asyncButton'
    import {createNamespacedHelpers} from 'vuex'

    const {mapGetters, mapState, mapMutations, mapActions} = createNamespacedHelpers('home');
    import {validatePhone} from '@/validator'

    export default {
        name: "login",
        components: {
            AsyncButton
        },
        data() {
            return {
                userInfo: {
                    username: '',
                    password: ''
                }
            }
        },
        created() {
            this.rule = {
                username: [
                    {required: true, message: '请输入账号', trigger: 'blur'},
                    {validator: validatePhone, trigger: 'blur'}
                ],
                password: [{required: true, message: '请输入密码', trigger: 'blur'}]
            }
        },
        methods: {
            ...mapActions({
                sendLogin: 'sendLogin'
            }),
            login(promise) {
                promise(this.sendLogin({
                    username: this.userInfo.username,
                    password: this.userInfo.password
                }).then((res) => {
                    if (res) {
                        this.$router.push('/resource');
                    }
                }));
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
            },
            loginByFinger() {
                this.$router.push('/login/finger');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .login-wrap {
        width: 450px;
        margin: 0 auto;

        .btn-wrap {
            display: flex;
            justify-content: space-between;
        }
    }
</style>