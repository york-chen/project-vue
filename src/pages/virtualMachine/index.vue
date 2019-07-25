<template>
    <div class="page">
        <div class="route-name">虚拟机资源</div>
        <el-row class="btn-wrap">
            <AsyncButton @_click="addNewMachine" _type="primary" exec_label="加载中" label="添加资源" size="medium"/>
            <el-dropdown @command="handleCommand" trigger="click">
                <el-button size="medium" type="primary">
                    <i class="el-icon-setting"></i>&nbsp;资源操作
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="edit">编辑资源</el-dropdown-item>
                    <el-dropdown-item command="share">资源共享</el-dropdown-item>
                    <el-dropdown-item command="delete">删除资源</el-dropdown-item>
                    <el-dropdown-item command="assign">指定所有人</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-row>
        <TableBox :pagination="pagination" :total="pagination.total"
                  class="table">
            <el-table :data="list"
                      @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column label="资源名称" prop="name">
                </el-table-column>
                <el-table-column label="描述" prop="descInfo">
                </el-table-column>
                <el-table-column label="部门" prop="deptName">
                </el-table-column>
                <el-table-column label="登录账号" prop="loginName">
                </el-table-column>
                <el-table-column label="指定人" prop="assignOwnerName">
                </el-table-column>
                <el-table-column label="root账号">
                    <template slot-scope="scope">
                        <span v-if="!scope.row.showAccountRoot">***</span>
                        <span v-else>{{scope.row.rootPwd}}</span>
                        <i :class="i_class(scope.row.showAccountRoot)" @click="chanePwdStatus(scope,1)"
                           class="point"></i>
                    </template>
                </el-table-column>
                <el-table-column label="普通账户1">
                    <template slot-scope="scope">
                        <span v-if="!scope.row.showAccount1">***</span>
                        <span v-else>{{scope.row.normalPwd1}}</span>
                        <i :class="i_class(scope.row.showAccount1)" @click="chanePwdStatus(scope,2)"
                           class="point"></i>
                    </template>
                </el-table-column>
                <el-table-column label="普通账户2">
                    <template slot-scope="scope">
                        <span v-if="!scope.row.showAccount2">***</span>
                        <span v-else>{{scope.row.normalPwd2}}</span>
                        <i :class="i_class(scope.row.showAccount2)" @click="chanePwdStatus(scope,3)"
                           class="point"></i>
                    </template>
                </el-table-column>
                <el-table-column label="普通账户3">
                    <template slot-scope="scope">
                        <span v-if="!scope.row.showAccount3">***</span>
                        <span v-else>{{scope.row.normalPwd3}}</span>
                        <i :class="i_class(scope.row.showAccount3)" @click="chanePwdStatus(scope,4)"
                           class="point"></i>
                    </template>
                </el-table-column>
            </el-table>
        </TableBox>
        <el-dialog :visible.sync="showDialog" :width="'60%'" title="添加资源">
            <AddOrEditMachine ref="addOrEditMachine" v-if="dialogState[0]"/>
            <ShareMachine :source="section" ref="shareMachine" v-if="dialogState[1]"/>
            <Assign ref="assign" v-if="dialogState[2]"/>
            <div slot="footer">
                <template v-if="dialogState[0]">
                    <el-button @click="showDialog=false">取 消</el-button>
                    <AsyncButton @_click="saveData" _type="primary" exec_label="保存中" label="确 定"/>
                </template>
                <template v-if="dialogState[2]">
                    <el-button @click="showDialog=false">取 消</el-button>
                    <AsyncButton @_click="assignMachine" _type="primary" exec_label="保存中" label="确 定"/>
                </template>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import TableBox from '@/components/tableBox'
    import AddOrEditMachine from '@/pages/virtualMachine/addOrEditMachine'
    import ShareMachine from '@/pages/virtualMachine/shareMachine'
    import Assign from '@/pages/virtualMachine/assign'
    import AsyncButton from '@/components/asyncButton'
    import {createNamespacedHelpers} from 'vuex'

    const {mapGetters, mapState, mapMutations, mapActions} = createNamespacedHelpers('virtualMachine');
    export default {
        name: "index",
        components: {TableBox, AddOrEditMachine, ShareMachine, AsyncButton, Assign},
        data() {
            return {
                showDialog: false,
                dialogState: [0, 0, 0],
                section: [],
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
                }
            }
        },
        computed: {
            ...mapState({
                list: 'list',
                targetMachine: 'targetMachine'
            }),
            ...mapGetters({
                targetIndex: 'targetIndex'
            }),
            assignId: {
                get() {
                    return this.$store.state.virtualMachine.assignId;
                },
                set(value) {
                    this.setAssignId(value);
                }
            }
        },
        methods: {
            ...mapMutations({
                setTargetMachine: 'setTargetMachine',
                changePwdStatus: 'changePwdStatus',
                setAssignId: 'setAssignId'
            }),
            ...mapActions({
                sendQueryList: 'sendQueryList',
                sendAddVirtualMachine: 'sendAddVirtualMachine',
                sendQueryDepList: 'sendQueryDepList',
                sendGetMachinePwd: 'sendGetMachinePwd',
                sendEditVirtualMachine: 'sendEditVirtualMachine',
                sendDeleteVirtualMachine: 'sendDeleteVirtualMachine',
                sendGetAssignUserList: 'sendGetAssignUserList',
                sendSetAssignOwner: 'sendSetAssignOwner'
            }),
            assignMachine(promise) {
                promise(this.sendSetAssignOwner({
                    resourceId: this.section.map(item => item.id).join(','),
                    userId: this.assignId
                }).then(res => {
                    if (res) {
                        this.$message.success('操作成功');
                        this.closeDialog();
                        this.queryList();
                    }
                }))
            },
            i_class(flag) {
                if (flag) {
                    return 'el-icon-error'
                }
                return 'el-icon-view'
            },
            chanePwdStatus(scope, type) {
                //判断当前要查看的密码是否已经从后端获取到了，如果没有的话发请求，否则展示出来即可
                let {row, $index: index} = scope, txt = type === 1 ? 'rootPwd' : `normalPwd${type - 1}`;
                if (row[txt]) {
                    this.changePwdStatus({index, type});
                } else {
                    this.sendGetMachinePwd({id: scope.row.id, type, index});
                }
            },
            openDialog(type) {
                if (type === 'edit' || type === 'add') {
                    this.dialogState = [1, 0, 0];
                } else if (type === 'share') {
                    this.dialogState = [0, 1, 0];
                } else if (type === 'assign') {
                    this.dialogState = [0, 0, 1];
                }
                this.showDialog = true;
            },
            closeDialog() {
                this.showDialog = false;
            },
            openEdit() {
                if (!this.section.length) {
                    this.$message.info('请选择要编辑的虚拟机资源');
                    return false;
                }
                if (this.section.length > 1) {
                    this.$message.info('只能同时操作一条虚拟机信息');
                    return false;
                }
                let temp = {...this.section[0], accounts: []};
                if (temp.normalUsername1) {
                    temp.accounts.push({account: temp.normalUsername1, pwd: temp.normalPwd1});
                    if (temp.normalUsername2) {
                        temp.accounts.push({account: temp.normalUsername2, pwd: temp.normalPwd2});
                        if (temp.normalUsername3) {
                            temp.accounts.push({account: temp.normalUsername3, pwd: temp.normalPwd3});
                        }
                    }
                }
                this.setTargetMachine(temp);
                this.sendQueryDepList({name: ''}).then(res => {
                    if (res) {
                        this.openDialog('edit');
                    }
                });
            },
            openAssign() {
                if (!this.section.length) {
                    this.$message.info('请选择虚拟机');
                    return false;
                }
                this.sendGetAssignUserList().then(res => {
                    if (res) {
                        this.openDialog('assign');
                    }
                })
            },
            openShare() {
                if (!this.section.length) {
                    this.$message.info('请选择要共享的虚拟机资源');
                    return false;
                }
                if (this.section.length > 1) {
                    this.$message.info('只能同时操作一条虚拟机信息');
                    return false;
                }
                this.openDialog('share');
            },
            handleCommand(command) {
                switch (command) {
                    case 'edit':
                        this.openEdit();
                        break;
                    case 'share':
                        this.openShare();
                        break;
                    case 'delete':
                        this.deleteMachine();
                        break;
                    case 'assign':
                        this.openAssign();
                        break;
                }
            },
            handleSelectionChange(section) {
                this.section = section;
            },
            addNewMachine(promise) {
                this.setTargetMachine({
                    name: '',
                    ip: '',
                    port: '',
                    descInfo: '',
                    deptId: '',
                    rootUsername: '',
                    rootPwd: '',
                    accounts: [{account: '', pwd: ''}]
                });
                promise(this.sendQueryDepList({name: ''}).then(res => {
                    if (res) {
                        this.openDialog('add');
                    }
                }));
            },
            deleteMachine() {
                if (!this.section.length) {
                    this.$message.error('请选择要删除的虚拟机资源');
                    return false;
                }
                this.sendDeleteVirtualMachine({ids: this.section.map(item => item.id).join(',')}).then(res => {
                    if (res) {
                        this.$message.success('操作成功');
                        this.queryList();
                    }
                });
            },
            saveData(promise) {
                let flag = this.$refs['addOrEditMachine'].checkForm();
                if (!flag) return;
                if (this.targetIndex !== -1) {//编辑
                    this.handleEditMachine(promise);
                } else {
                    //新增，
                    this.handleAddNewMachine(promise)

                }
            },
            handleEditMachine(promise) {
                let data = this.targetMachine;
                data.accounts.forEach((item, index) => {
                    if (item.account) {
                        data[`normalUsername${index + 1}`] = item.account;
                        data[`normalPwd${index + 1}`] = item.pwd;
                    }
                });
                delete data.accounts;
                promise(this.sendEditVirtualMachine(data).then(res => {
                    if (res) {
                        this.$message.success('操作成功');
                        this.closeDialog();
                        this.queryList();
                    }
                }))
            },
            handleAddNewMachine(promise) {
                let data = this.targetMachine;
                data.accounts.forEach((item, index) => {
                    if (item.account) {
                        data[`normalUsername${index + 1}`] = item.account;
                        data[`normalPwd${index + 1}`] = item.pwd;
                    }
                });
                delete data.accounts;
                promise(this.sendAddVirtualMachine(data).then(res => {
                    if (res) {
                        this.$message.success('操作成功');
                        this.closeDialog();
                        this.pagination.pageIndex = 1;
                        this.queryList();
                    }
                }))
            },
            queryList() {
                this.sendQueryList({
                    pageIndex: this.pagination.pageIndex,
                    pageSize: this.pagination.pageSize
                })
            }
        },
        mounted() {
            this.queryList();
        },
        watch: {
            showDialog(val) {
                if (!val) {
                    this.assignId = '';
                    this.$refs['addOrEditMachine'] && this.$refs['addOrEditMachine'].resetForm();
                }
            }
        }
    }
</script>

<style scoped>

</style>