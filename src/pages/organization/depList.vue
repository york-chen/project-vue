<template>
    <div class="page">
        <el-row class="btn-wrap">
            <el-button @click="openAddNewDep" icon="el-icon-plus" size="medium" type="primary">添加部门</el-button>
            <el-button @click="deleteDep" icon="el-icon-edit" size="medium" type="primary">删除部门</el-button>
        </el-row>
        <TableBox :pagination="pagination" class="table">
            <el-table :data="list"
                      @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column label="部门名称" prop="name">
                </el-table-column>
                <el-table-column label="描述" prop="descInfo">
                </el-table-column>
                <el-table-column label="关联用户">
                    <template slot-scope="{row}">
                        <i @click="openRelateUsers(row.id)" class="el-icon-user-solid point"></i>
                    </template>
                </el-table-column>
                <el-table-column label="编辑">
                    <template slot-scope="{row,$index:index}">
                        <i @click="openEditDep(row,index)" class="el-icon-edit-outline point"></i>
                    </template>
                </el-table-column>
            </el-table>
        </TableBox>
        <el-dialog :title="dialogTitle" :visible.sync="showDialog">
            <template v-if="showDialog">
                <el-form :model="targetDep" :rules="rule" label-width="110px" ref="form">
                    <el-form-item label="部门名称" prop="name">
                        <el-input v-model="targetDep.name"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" prop="descInfo">
                        <el-input :rows="3" type="textarea" v-model="targetDep.descInfo"></el-input>
                    </el-form-item>
                </el-form>
            </template>
            <div slot="footer">
                <template v-if="showDialog">
                    <el-button @click="showDialog=false">取 消</el-button>
                    <AsyncButton @_click="saveData" _type="primary" exec_label="保存中" label="确 定"/>
                </template>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import AsyncButton from '@/components/asyncButton'
    import TableBox from '@/components/tableBox'
    import {createNamespacedHelpers} from 'vuex'

    const {mapGetters, mapState, mapMutations, mapActions} = createNamespacedHelpers('organization/dep');
    export default {
        name: "depList",
        components: {TableBox, AsyncButton},
        created() {
            this.section = [];
            this.rule = {
                name: [{required: true, message: '请输入部门名称', trigger: 'blur'}],
                descInfo: [{required: true, message: '请输入描述', trigger: 'blur'}]
            };
        },
        data() {
            return {
                showDialog: false,
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
                targetDep: 'targetDep',
                targetIndex: 'targetIndex'
            }),
            dialogTitle() {
                let txt = '新增部门';
                if (this.targetIndex !== -1) {
                    txt = '编辑部门';
                }
                return txt;
            }
        },
        methods: {
            ...mapMutations({
                setTargetDep: 'setTargetDep'
            }),
            ...mapActions({
                sendGetDepList: 'sendGetDepList',
                sendAddDep: 'sendAddDep',
                sendEditDep: 'sendEditDep',
                sendDeleteDep: 'sendDeleteDep'
            }),
            openDialog() {
                this.showDialog = true;
            },
            closeDialog() {
                this.showDialog = false;
            },
            openAddNewDep() {
                this.setTargetDep({data: {}, index: -1});
                this.openDialog();
            },
            openEditDep(row, index) {
                this.setTargetDep({data: {...row}, index});
                this.openDialog();
            },
            deleteDep() {
                if (!this.section.length) {
                    this.$message.error('请选择要删除的部门');
                    return false
                }
                this.sendDeleteDep({ids: this.section.map(item => item.id).join(',')}).then(res => {
                    if (res) {
                        this.$message.success('操作成功');
                        this.queryList();
                    }
                })
            },
            saveData(promise) {
                let flag = false;
                this.$refs['form'].validate((valid) => {
                    flag = valid
                });
                if (!flag) return;
                if (this.targetIndex === -1) {
                    this.handleAddDep(promise);
                } else {
                    this.handleEditDep(promise);
                }
            },
            handleAddDep(promise) {
                promise(this.sendAddDep(this.targetDep).then(res => {
                    if (res) {
                        this.$message.success('操作成功');
                        this.closeDialog();
                        this.queryList();
                    }
                }))
            },
            handleEditDep(promise) {
                promise(this.sendEditDep({
                    id: this.targetDep.id,
                    name: this.targetDep.name,
                    descInfo: this.targetDep.descInfo
                }).then(res => {
                    if (res) {
                        this.$message.success('操作成功');
                        this.closeDialog();
                        this.queryList();
                    }
                }))
            },
            openRelateUsers(id) {
                this.$router.push(`/organization/deps/${id}`)
            },
            handleSelectionChange(section) {
                this.section = section;
            },
            queryList() {
                this.sendGetDepList().then(res => {
                    if (res) {
                        this.pagination.total = res.total;
                    }
                })
            }
        },
        mounted() {
            this.queryList();
        }
    }
</script>

<style scoped>

</style>