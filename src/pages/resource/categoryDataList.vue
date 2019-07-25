<template>
    <div class="page">
        <div class="route-name">{{routeName}}</div>
        <el-row class="btn-wrap">
            <el-button @click="addNewAccount" icon="el-icon-plus" size="medium" type="primary">添加账户</el-button>
            <AsyncButton @_click="deleteAccount" _type="danger" exec_label="保存中" label="删除账户" size="medium"/>
        </el-row>
        <TableBox :pagination="pagination" :total="pagination.total"
                  class="table">
            <el-table :data="dynamicDataList" @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column :key="item.showOrder"
                                 :label="`${item.propName}`"
                                 :prop="`prop.${item.propName}`"
                                 v-for="item in dynamicColumns">
                    <template slot-scope="{row,$index:index}">
                        <span v-if="item.isPwd && !row.showPwd">***</span>
                        <span v-else>{{row.prop[item.propName]}}</span>
                        <i :class="i_class(row.showPwd)" @click="chanePwdStatus(index,1)" class="point"
                           v-if="item.isPwd"></i>
                    </template>
                </el-table-column>
                <el-table-column
                        label="编辑">
                    <template slot-scope="scope">
                        <i @click="openEdit(scope)" class="el-icon-edit-outline point"></i>
                    </template>
                </el-table-column>
            </el-table>
        </TableBox>
        <el-dialog :visible.sync="showDialog" title="添加账号">
            <AddAccount ref="addAccount" v-if="showDialog"></AddAccount>
            <div slot="footer" v-if="showDialog">
                <el-button @click="showDialog=false">取 消</el-button>
                <AsyncButton @_click="saveData" _type="primary" exec_label="保存中" label="确 定"/>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    import TableBox from '@/components/tableBox'
    import AddAccount from '@/pages/resource/addAccount'
    import AsyncButton from '@/components/asyncButton'

    const {mapGetters, mapState, mapMutations, mapActions} = createNamespacedHelpers('resource');

    export default {
        name: "categoryDataList",
        components: {
            TableBox, AddAccount, AsyncButton
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
        created() {
            this.selection = [];
        },
        computed: {
            ...mapState({
                categoryMenu: 'categoryMenu',
                dynamicDataList: 'dynamicDataList',
                dynamicColumns: 'dynamicColumns',
                targetDynamicData: 'targetDynamicData',
                targetDynamicDataIndex: 'targetDynamicDataIndex'
            }),
            routeName() {
                let id = this.$route.params.id;
                let target = this.categoryMenu.find(item => {
                    return item.id + '' === id;
                });
                return target.name;
            }
        },
        methods: {
            ...mapActions({
                sendQueryDynamicDataList: 'sendQueryDynamicDataList',
                sendDeleteDynamicData: 'sendDeleteDynamicData',
                sendCreateAccount: 'sendCreateAccount',
                sendEditAccount: 'sendEditAccount'
            }),
            ...mapMutations({
                setTargetDynamicData: 'setTargetDynamicData',
                changePwdStatus: 'changePwdStatus'
            }),
            i_class(flag) {
                if (flag) {
                    return 'el-icon-error'
                }
                return 'el-icon-view'
            },
            chanePwdStatus(r_index) {
                this.changePwdStatus({index: r_index});
            },
            addNewAccount() {
                let dynamicColumns = this.dynamicColumns, form = new Object({
                    categoryId: this.$route.params.id,
                    prop: {}
                });
                dynamicColumns.forEach(item => {
                    form.prop[item.propName] = '';
                });
                this.setTargetDynamicData({data: form, index: -1});
                this.openDialog();
            },
            openEdit(scope) {
                let {row, $index} = scope;
                this.setTargetDynamicData({data: {...row}, index: $index});
                this.openDialog();
            },
            openDialog() {
                this.showDialog = true;
            },
            closeDialog() {
                this.showDialog = false;
            },
            saveData(promise) {
                let flag = this.$refs['addAccount'].checkForm();
                if (!flag) return;
                let targetDynamicDataIndex = this.targetDynamicDataIndex;
                if (targetDynamicDataIndex === -1) {
                    this._addNewAccount(promise);
                } else {
                    this._editAccount(promise);
                }
            },
            _addNewAccount(promise) {
                let targetDynamicData = this.targetDynamicData;
                promise(this.sendCreateAccount(targetDynamicData).then(res => {
                    if (res) {
                        this.$message.success('添加成功');
                        this.closeDialog();
                        this.pagination.pageIndex = 1;
                        this.queryList();
                    }
                }));
            },
            _editAccount(promise) {
                let targetDynamicData = this.targetDynamicData, postData;
                postData = {
                    categoryId: this.$route.params.id,
                    accountId: targetDynamicData.id,
                    prop: targetDynamicData.prop
                };
                promise(this.sendEditAccount(postData).then(res => {
                    if (res) {
                        this.$message.success('更新成功');
                        this.closeDialog();
                    }
                }));
            },
            handleSelectionChange(section) {
                this.selection = section;
            },
            queryList() {
                this.sendQueryDynamicDataList({
                    pageIndex: this.pagination.pageIndex,
                    pageSize: this.pagination.pageSize,
                    categoryId: this.$route.params.id
                }).then(res => {
                    if (res) {
                        this.pagination.total = res.total;
                    }
                });
                this.selection = []
            },
            deleteAccount(promise) {
                if (!this.selection.length) {
                    this.$message.error('请选择要删除的账号');
                    return void 0;
                }
                promise(this.sendDeleteDynamicData({ids: this.selection.map(item => item.id).join(',')}).then(res => {
                    if (res) {
                        this.$message.success('操作成功');
                        this.queryList();
                    }
                }));
            }
        },
        mounted() {
            this.queryList();
        },
        watch: {
            '$route.params.id'() {
                this.queryList();
            }
        }
    }
</script>

<style scoped>
    .btn-wrap {
        margin-bottom: 15px;
    }
</style>