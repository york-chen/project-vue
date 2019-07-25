<template>
    <div class="page">
        <el-row class="searchBar">
            <el-col :span="12">
                <el-input
                        placeholder="搜索用户名或者账号"
                        size="medium"
                        v-model="name">
                    <i class="el-input__icon el-icon-search" slot="prefix"></i>
                    <el-button @click="handleQueryBtnClick" icon="el-icon-search" slot="append"></el-button>
                </el-input>
            </el-col>
            <el-col :span="2">&#12288;</el-col>
            <el-col :span="10">
                <AsyncButton @_click="batchMoveToDep" _type="primary" exec_label="加载中" label="添加到组" size="medium"/>
                <AsyncButton @_click="batchMoveOut" _type="primary" exec_label="保存中" label="移除" size="medium"/>
            </el-col>
        </el-row>
        <TableBox :pagination="pagination"
                  class="table">
            <el-table :data="userList"
                      @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column label="用户名" prop="userName">
                </el-table-column>
                <el-table-column label="成员关系" prop="desc">
                    <template slot-scope="{row}">
                        <span v-if="row.deptId == $route.params.depId">成员</span>
                        <span v-else>非成员</span>
                    </template>
                </el-table-column>
                <el-table-column label="动作">
                    <template slot-scope="{row}">
                        <AsyncButton :arguments="row.id" @_click="moveToDep" _type="success" exec_label="加载中"
                                     label="添加到组" plain size="small" v-if="row.deptId != $route.params.depId"/>
                        <AsyncButton :arguments="row.id" @_click="moveOut" _type="danger" exec_label="加载中"
                                     label="移除" plain size="small"
                                     v-else/>
                    </template>
                </el-table-column>
            </el-table>
        </TableBox>
        <el-dialog :visible.sync="showDialog" title="添加到组">
            <template v-if="showDialog">
                <el-select placeholder="请选择" v-model="desDepid">
                    <el-option :key="index" :label="item.name" :value="item.id"
                               v-for="(item,index) in list"></el-option>
                </el-select>
            </template>
            <div slot="footer">
                <el-button @click="showDialog=false">取 消</el-button>
                <AsyncButton @_click="handleBatchMoveToDep" _type="primary" exec_label="保存中" label="确 定"/>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import TableBox from '@/components/tableBox'
    import AsyncButton from '@/components/asyncButton'
    import {createNamespacedHelpers} from 'vuex'

    const {mapGetters, mapState, mapMutations, mapActions} = createNamespacedHelpers('organization/dep');
    export default {
        name: "depList",
        components: {TableBox, AsyncButton},
        data() {
            return {
                loading: false,
                name: '',
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
                },
                desDepid: ''
            }
        },
        created() {
            this.section = [];
        },
        computed: {
            ...mapState({
                userList: 'userList',
                list: 'list'
            })
        },
        methods: {
            ...mapActions({
                sendGetUserList: 'sendGetUserList',
                sendMoveOutDep: 'sendMoveOutDep',
                sendMoveToDep: 'sendMoveToDep',
                sendGetDepList: 'sendGetDepList'
            }),
            batchMoveToDep(promise) {
                if (!this.section.length) {
                    this.$message('请选择用户');
                    return false
                }
                promise(this.sendGetDepList({userIds: this.section.map(item => item.id).join(',')}).then(res => {
                    if (res) {
                        this.showDialog = true;
                    }
                }));
            },
            moveToDep(promise, id) {
                promise(this.sendMoveToDep({userIds: id, deptId: this.$route.params.depId}).then(res => {
                    if (res) {
                        this.$message.success('操作成功');
                        this.queryList();
                    }
                }));
            },
            handleBatchMoveToDep(promise) {
                promise(this.sendMoveToDep({
                    userIds: this.section.map(item => item.id).join(','),
                    deptId: this.$route.params.depId
                }).then(res => {
                    if (res) {
                        this.$message.success('操作成功');
                        this.showDialog = false;
                        this.queryList();
                    }
                }));
            },
            moveOut(promise, id) {
                promise(this.sendMoveOutDep({userIds: id}).then(res => {
                    if (res) {
                        this.$message.success('操作成功');
                        this.queryList();
                    }
                }));
            },
            batchMoveOut(promise) {
                if (!this.section.length) {
                    this.$message.info('请选择用户');
                    return false;
                }
                promise(this.sendMoveOutDep({userIds: this.section.map(item => item.id).join(',')}).then(res => {
                    if (res) {
                        this.queryList();
                    }
                }));
            },
            handleSelectionChange(section) {
                this.section = section;
            },
            handleQueryBtnClick() {
                this.pagination.pageIndex = 1;
                this.queryList();
            },
            queryList() {
                this.loading = true;
                this.sendGetUserList({name: this.name}).then(res => {
                    if (res) {
                        this.pagination.total = res.total;
                    }
                    this.loading = false;
                });
            }
        },
        mounted() {
            this.queryList();
        }
    }
</script>

<style scoped>

</style>