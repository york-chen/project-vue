<template>
    <div class="">
        <h3 class="route-name">密码管理</h3>
        <el-row class="btn-wrap">
            <el-button @click="openChangePwd" icon="el-icon-edit" size="medium" type="primary">更改密码</el-button>
            <el-button @click="openFingerprint" icon="el-icon-goods" size="medium" type="primary">指纹管理</el-button>
        </el-row>
        <el-dialog :title="dialogTitle" :visible.sync="showDialog">
            <template v-if="dialogState[0]">
                <el-form :model="form" :rules="rule" label-width="110px" ref="form">
                    <el-form-item label="旧密码" prop="oldPwd">
                        <el-input show-password v-model="form.oldPwd"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="pwd">
                        <el-input show-password v-model="form.pwd"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="confirmPwd">
                        <el-input show-password v-model="form.confirmPwd"></el-input>
                    </el-form-item>
                </el-form>
            </template>
            <template v-if="dialogState[1]">
                <FingerList :list="fingerprintList"/>
            </template>
            <div slot="footer">
                <template v-if="dialogState[0]">
                    <el-button @click="showDialog=false">取 消</el-button>
                    <AsyncButton @_click="changePwd" exec_label="保存中" label="确 定"/>
                </template>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import FingerList from '@/components/fingerList'
    import AsyncButton from '@/components/asyncButton'
    import {createNamespacedHelpers} from 'vuex'

    const {mapGetters, mapState, mapMutations, mapActions} = createNamespacedHelpers('manage');
    export default {
        name: "index",
        components: {FingerList, AsyncButton},
        data() {
            return {
                showDialog: false,
                dialogState: [0, 0],
                form: {
                    oldPwd: '',
                    pwd: '',
                    confirmPwd: ''
                }
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
                oldPwd: [
                    {required: true, message: '请输入旧密码', trigger: 'blur'}
                ],
                pwd: [{required: true, message: '请输入新密码', trigger: 'blur'}],
                confirmPwd: [{required: true, message: '请再次输入新密码', trigger: 'blur'}, {
                    validator: validatePwd,
                    trigger: 'blur'
                }
                ]
            }
        },
        computed: {
            ...mapState({
                list: 'list',
                fingerprintList: 'fingerprintList'
            }),
            dialogTitle() {
                let txt = '更改密码';
                if (this.dialogState[0]) {
                    txt = '密码更改';
                }
                if (this.dialogState[1]) {
                    txt = '指纹管理';
                }
                return txt;
            }
        },
        methods: {
            ...mapActions({
                sendChangePws: 'sendChangePws'
            }),
            openDialog(type) {
                if (type === 'changePwd') {
                    this.dialogState = [1, 0];
                }
                if (type === 'fingerList') {
                    this.dialogState = [0, 1];
                }
                this.showDialog = true;
            },
            closeDialog() {
                this.showDialog = false;
            },
            handleCurrentChange() {

            },
            handleSizeChange() {

            },
            openChangePwd() {
                this.openDialog('changePwd');
            },
            changePwd(promise) {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        promise(this.sendChangePws({oldPwd: this.form.oldPwd, newPwd: this.form.pwd}).then(res => {
                            if (res) {
                                this.$message.success('操作成功');
                                this.closeDialog();
                            }
                        }));
                    }
                });
            },
            openFingerprint() {
                this.openDialog('fingerList')
            }
        },
        watch: {
            showDialog(val) {
                if (!val) {
                    this.form = new Object(null);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>