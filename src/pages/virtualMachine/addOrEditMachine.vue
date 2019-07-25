<template>
    <div>
        <el-form :model="targetMachine" :rules="rule" label-width="130px" ref="form">
            <el-form-item label="资源名称" prop="name">
                <el-input v-model="targetMachine.name"></el-input>
            </el-form-item>
            <el-form-item label="ip地址" prop="ip">
                <el-input v-model="targetMachine.ip"></el-input>
            </el-form-item>
            <el-form-item label="端口" prop="port">
                <el-input v-model="targetMachine.port"></el-input>
            </el-form-item>
            <el-form-item label="资源描述" prop="descInfo">
                <el-input v-model="targetMachine.descInfo"></el-input>
            </el-form-item>
            <el-form-item label="部门" prop="deptId">
                <el-select placeholder="请选择" v-model="targetMachine.deptId">
                    <el-option :key="index" :label="item.name" :value="item.id"
                               v-for="(item,index) in depList"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="root账户账户名" prop="rootUsername">
                <el-input v-model="targetMachine.rootUsername"></el-input>
            </el-form-item>
            <el-form-item label="root账户密码" prop="rootPwd">
                <el-input v-model="targetMachine.rootPwd"></el-input>
            </el-form-item>
            <div :key="index" class="dynamic-account" v-for="(item,index) in targetMachine.accounts">
                <i @click="deleteAccount(index)" class="el-icon-remove remove"
                   v-if="targetMachine.accounts.length>1"></i>
                <el-form-item :prop="'accounts.'+ index +'.account'" :rules="accountRule.account" label="普通账户用户名">
                    <el-input v-model="item.account"></el-input>
                </el-form-item>
                <el-form-item :prop="'accounts.'+ index +'.pwd'" :rules="accountRule.pwd" label="普通账户密码">
                    <el-input v-model="item.pwd"></el-input>
                </el-form-item>
            </div>
        </el-form>
        <div class="center plus point" v-if="targetMachine.accounts.length<3"><i @click="addAccount"
                                                                                 class="el-icon-circle-plus"></i></div>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'

    const {mapGetters, mapState, mapMutations, mapActions} = createNamespacedHelpers('virtualMachine');

    export default {
        name: "addOrEditMachine",
        computed: {
            ...mapState({
                targetMachine: 'targetMachine',
                depList: 'depList'
            })
        },
        created() {
            this.rule = {
                name: [{required: true, message: '请输入资源名称', trigger: 'blur'}],
                ip: [{required: true, message: '请输入ip地址', trigger: 'blur'}],
                port: [{required: true, message: '请输入端口', trigger: 'blur'}],
                descInfo: [{required: true, message: '请输入资源描述', trigger: 'blur'}],
                deptId: [{required: true, message: '请选择部门', trigger: 'change'}],
                rootUsername: [{required: true, message: '请输入root账户账户名', trigger: 'blur'}],
                rootPwd: [{required: true, message: '请输入root账户密码', trigger: 'blur'}]
            };
            this.accountRule = {
                account: [
                    {required: true, message: '请输入普通账户用户名', trigger: 'blur'}
                ],
                pwd: [
                    {required: true, message: '请输入普通账户密码', trigger: 'blur'}
                ]
            }
        },
        methods: {
            addAccount() {
                this.targetMachine.accounts.push({
                    account: '',
                    pwd: ''
                })
            },
            deleteAccount(index) {
                this.targetMachine.accounts.splice(index, 1);
            },
            checkForm() {
                let flag = false;
                this.$refs['form'].validate((valid) => {
                    flag = valid
                });
                return flag;
            },
            resetForm() {
                this.$refs['form'].resetFields();
            }
        }
    }
</script>

<style scoped>
    .plus {
        width: 100px;
    }

    .dynamic-account {
        padding: 20px;
        border: 1px solid #ccc;
        position: relative;
        margin-bottom: 20px;
    }

    .remove {
        color: red;
        font-size: 20px;
        position: absolute;
        top: -10px;
        left: -10px;
    }
</style>