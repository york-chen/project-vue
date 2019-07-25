<template>
    <div class="page">
        <el-row class="btn-wrap">
            <AsyncButton @_click="openAddNewUser" _type="primary" exec_label="加载中" label="添加用户" size="medium"/>
            <el-button @click="openChangeRole" icon="el-icon-edit" size="medium" type="primary">更改角色</el-button>
            <el-button @click="deleteUser" icon="el-icon-delete" size="medium" type="primary">删除用户</el-button>
        </el-row>
        <TableBox :pagination="pagination"
                  class="table">
            <el-table :data="list"
                      @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column label="用户名" prop="userName">
                </el-table-column>
                <el-table-column label="账号" prop="loginName">
                </el-table-column>
                <el-table-column label="角色" prop="role">
                    <template slot-scope="{row}">
                        {{roleMenu.get(row.role)}}
                    </template>
                </el-table-column>
                <el-table-column label="部门" prop="deptName">
                </el-table-column>
                <el-table-column label="编辑">
                    <template slot-scope="{row,$index:index}">
                        <i @click="openEdit(row,index)" class="el-icon-edit-outline point"></i>
                    </template>
                </el-table-column>
            </el-table>
        </TableBox>
        <el-dialog :title="dialogTitle" :visible.sync="showDialog">
            <AddOrEditUser ref="addOrEditUser" v-if="dialogState[0]"></AddOrEditUser>
            <template v-if="dialogState[1]">
                <el-select placeholder="请选择" v-model="tempRole">
                    <el-option :key="index" :label="item.label" :value="item.value"
                               v-for="(item,index) in roleMenu.get('all')"></el-option>
                </el-select>
            </template>
            <div slot="footer">
                <template v-if="dialogState[0]">
                    <el-button @click="showDialog=false">取 消</el-button>
                    <AsyncButton @_click="saveData" _type="primary" exec_label="保存中" label="确 定"/>
                </template>
                <template v-if="dialogState[1]">
                    <el-button @click="showDialog=false">取 消</el-button>
                    <AsyncButton @_click="changeRole" _type="primary" exec_label="保存中" label="确 定"/>
                </template>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import AsyncButton from '@/components/asyncButton'
    import TableBox from '@/components/tableBox'
    import AddOrEditUser from '@/pages/organization/addOrEditUser'
    import constents from '@/constents/index'
    import {createNamespacedHelpers} from 'vuex'

    const {mapGetters, mapState, mapMutations, mapActions} = createNamespacedHelpers('organization/user');
    export default {
        name: "userList",
        components: {TableBox, AddOrEditUser, AsyncButton},
        data() {
            return {
                showDialog: false,
                dialogState: [0, 0],
                pagination: {
                    pageIndex: 1,
                    pageSize: 10,
                    total: 0,
                    handleCurrentChange: (pageIndex) => {
                        this.pagination.pageIndex = pageIndex;
                        this.queryList()
                    },
                    handleSizeChange(pageSize) {
                        this.pagination.pageIndex = 1;
                        this.pagination.pageSize = pageSize;
                        this.queryList()
                    }
                },
                tempRole: ''
            }
        },
        created() {
            this.roleMenu = constents.roleMenu;
            this.section = [];
        },
        computed: {
            ...mapState({
                list: 'list',
                targetUser: 'targetUser',
                targetIndex: 'targetIndex'
            }),
            dialogTitle() {
                let txt = '';
                if (this.dialogState[0]) {
                    txt = this.targetIndex === -1 ? '新增用户' : '编辑用户';
                }
                if (this.dialogState[1]) {
                    txt = '更改角色';
                }
                return txt;
            }
        },
        methods: {
            ...mapMutations({
                setTargetUser: 'setTargetUser'
            }),
            ...mapActions({
                sendGetUserList: 'sendGetUserList',
                sendGetDepList: 'sendGetDepList',
                sendAddUser: 'sendAddUser',
                sendEditUser: 'sendEditUser',
                sendDeleteUser: 'sendDeleteUser',
                sendChangeUserRole: 'sendChangeUserRole'
            }),
            openDialog(type) {
                if (type === 'add' || type === 'edit') {
                    this.dialogState = [1, 0];
                }
                if (type === 'changeRole') {
                    this.dialogState = [0, 1];
                }
                this.showDialog = true;
            },
            closeDialog() {
                this.showDialog = false;
            },
            openAddNewUser(promise) {
                promise(this.sendGetDepList().then(res => {
                    if (res) {
                        this.setTargetUser({data: {}, index: -1});
                        this.openDialog('add');
                    }
                }));
            },
            deleteUser() {
                if (!this.section.length) {
                    this.$message.error('请选择要删除的用户');
                    return false;
                }
                this.sendDeleteUser({ids: this.section.map(item => item.id).join(',')}).then(res => {
                    if (res) {
                        this.$message.success('操作成功');
                        this.queryList();
                    }
                })
            },
            openEdit(row, index) {
                this.sendGetDepList().then(res => {
                    if (res) {
                        this.setTargetUser({data: {...row}, index});
                        this.openDialog('edit');
                    }
                })
            },
            openChangeRole() {
                if (!this.section.length) {
                    this.$message.info('请选择用户');
                    return false
                }
                this.openDialog('changeRole');
            },
            changeRole(promise) {
                promise(this.sendChangeUserRole({
                    ids: this.section.map(item => item.id).join(','),
                    role: this.tempRole
                }).then(res => {
                    if (res) {
                        this.$message.success('操作成功');
                        this.closeDialog();
                        this.queryList();
                    }
                }));
            },
            handleSelectionChange(section) {
                this.section = section;
            },
            saveData(promise) {
                let flag = this.$refs['addOrEditUser'].checkForm();
                if (!flag) return;
                if (this.targetIndex === -1) {
                    this.handleAddUser(promise);
                } else {
                    this.handleEditUser(promise);
                }
            },
            handleAddUser(promise) {
                let data = this.targetUser;
                promise(this.sendAddUser(data).then(res => {
                    if (res) {
                        this.$message.success('操作成功');
                        this.closeDialog();
                        this.queryList();
                    }
                }));
            },
            handleEditUser(promise) {
                let data = this.targetUser;
                promise(this.sendEditUser(data).then(res => {
                    if (res) {
                        this.$message.success('操作成功');
                        this.closeDialog();
                        this.queryList();
                    }
                }));
            },
            queryList() {
                this.sendGetUserList({name: ''}).then(res => {
                    if (res) {
                        this.pagination.total = res.total;
                    }
                })
            }
        },
        mounted() {
            return this.queryList();
        },
        watch: {
            showDialog(val) {
                if (!val) {
                    this.tempRole = '';
                    this.$refs['addOrEditUser'] && this.$refs['addOrEditUser'].resetForm();
                }
            }
        }
    }
</script>

<style scoped>

</style>