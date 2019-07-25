<template>
    <el-form :model="targetUser" :rules="rule" label-width="110px" ref="form">
        <el-form-item label="姓" prop="firstName">
            <el-input v-model="targetUser.firstName"></el-input>
        </el-form-item>
        <el-form-item label="名" prop="secondName">
            <el-input v-model="targetUser.secondName"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="loginName">
            <el-input maxlength="11" v-model="targetUser.loginName"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
            <el-select placeholder="请选择" v-model="targetUser.role">
                <el-option label="管理员" value="mgr"></el-option>
                <el-option label="普通用户" value="normal"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="deptId">
            <el-select placeholder="请选择" v-model="targetUser.deptId">
                <el-option :key="index" :label="item.name" :value="item.id + ''"
                           v-for="(item,index) in depList"></el-option>
            </el-select>
        </el-form-item>
    </el-form>
</template>

<script>
    import {validatePhone} from '@/validator'
    import {createNamespacedHelpers} from 'vuex'

    const {mapGetters, mapState, mapMutations, mapActions} = createNamespacedHelpers('organization/user');
    export default {
        name: "addOrEditUser",
        computed: {
            ...mapState({
                targetUser: 'targetUser',
                depList: 'depList'
            })
        },
        created() {
            this.rule = {
                firstName: [{required: true, message: '请输入姓', trigger: 'blur'}],
                secondName: [{required: true, message: '请输入名', trigger: 'blur'}],
                loginName: [{required: true, message: '请输入账号', trigger: 'blur'}, {
                    validator: validatePhone,
                    trigger: 'blur'
                }],
                role: [{required: true, message: '请选择角色', trigger: 'change'}],
                deptId: [{required: true, message: '请选择部门', trigger: 'change'}]
            };
        },
        methods: {
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

</style>