<template>
    <el-form :model="form" :rules="rule" class="findPwd-wrap" label-width="100px" ref="findPwdForm">
        <el-form-item label="账号" prop="account">
            <el-input maxlength="11" v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="verifyCode">
            <el-input class="pwd1" v-model="form.verifyCode"></el-input>
            <el-button :disabled="startTime" @click="bindSendSms" plain round type="gold">
                <SmsCode :startTime="startTime" @end="bindEndTime"/>
            </el-button>
        </el-form-item>
        <el-form-item label="新密码" prop="pwd1">
            <el-input show-password v-model="form.pwd1"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="pwd2">
            <el-input show-password v-model="form.pwd2"></el-input>
        </el-form-item>
        <el-form-item>
            <AsyncButton @_click="checkForm" _style="width:100%" _type="primary" label="确认修改"/>
        </el-form-item>
    </el-form>
</template>

<script>
    import AsyncButton from '@/components/asyncButton'
    import SmsCode from '@/components/smsCode'
    import {createNamespacedHelpers} from 'vuex'
    import {validatePhone} from '@/validator'

    const {mapGetters, mapState, mapMutations, mapActions} = createNamespacedHelpers('home');

    export default {
        name: "findPwd",
        components: {
            AsyncButton,
            SmsCode
        },
        data() {
            return {
                form: {
                    account: '',
                    verifyCode: '',
                    pwd1: '',
                    pwd2: ''
                },
                startTime: false
            }
        },
        created() {
            const validatePwd = (rule, value, callback) => {
                if (value !== this.form.pwd) {
                    callback(new Error('两次输入的密码不一致'));
                    return
                }
                callback();
            };
            this.rule = {
                account: [
                    {required: true, message: '请输入账号', trigger: 'blur'},
                    {validator: validatePhone, trigger: 'blur'}
                ],
                verifyCode: [
                    {required: true, message: '请输入验证码', trigger: 'blur'}
                ],
                pwd1: [
                    {required: true, message: '请输入密码', trigger: 'blur'}
                ],
                pwd2: [{required: true, message: '请确认密码', trigger: 'blur'}, {
                    validator: validatePwd,
                    trigger: 'blur'
                }]
            }
        },
        methods: {
            checkForm(promise) {
                this.$refs['findPwdForm'].validate((valid) => {
                    if (valid) {
                        this.updateUserPwd(promise);
                    }
                });
            },
            updateUserPwd(promise) {
                this.$router.push('/login');
            },
            bindSendSms() {
                if (this.form.account) {
                    this.startTime = true;
                    //请求接口
                } else {
                    this.$message.error('请输入账户')
                }
            },
            bindEndTime() {
                this.startTime = false
            },
        }
    }
</script>

<style lang="scss" scoped>
    .findPwd-wrap {
        width: 450px;
        margin: 0 auto;

        .pwd1 {
            width: 60%;
        }
    }
</style>