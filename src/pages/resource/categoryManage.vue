<template>
    <div class="page">
        <h3 class="route-name">管理分类</h3>
        <TableBox :pagination="pagination"
                  class="table">
            <el-table :data="categoryManageList">
                <el-table-column
                        label="分类名称">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="编辑">
                    <template slot-scope="scope">
                        <i @click="openEdit(scope)" class="el-icon-edit-outline point"></i>
                    </template>
                </el-table-column>
                <el-table-column label="删除">
                    <template slot-scope="scope">
                        <i @click="deleteCategory(scope)" class="el-icon-delete point"></i>
                    </template>
                </el-table-column>
                <el-table-column label="设为默认">
                    <template slot-scope="scope">
                        <input :checked="scope.row.isDefault" @click="updateDefault(scope)" class="_radio"
                               type="radio"/>
                    </template>
                </el-table-column>
            </el-table>
        </TableBox>
        <el-dialog :visible.sync="showDialog" title="更新分类信息">
            <UpdateCategory ref="updateCategory" v-if="showDialog"></UpdateCategory>
            <div slot="footer" v-if="showDialog">
                <el-button @click="showDialog=false">取 消</el-button>
                <AsyncButton @_click="checkNameForm" _type="primary" exec_label="保存中" label="确 定"/>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import TableBox from '@/components/tableBox'
    import UpdateCategory from '@/pages/resource/updateCategory'
    import AsyncButton from '@/components/asyncButton'
    import {createNamespacedHelpers} from 'vuex'

    const {mapGetters, mapState, mapMutations, mapActions} = createNamespacedHelpers('resource');

    export default {
        name: "list",
        components: {TableBox, UpdateCategory, AsyncButton},
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

        },
        computed: {
            ...mapState({
                categoryManageList: 'categoryManageList',
                targetCategory: 'targetCategory'
            })
        },
        methods: {
            ...mapMutations({
                setTargetCategory: 'setTargetCategory'
            }),
            ...mapActions({
                sendQueryCategoryList: 'sendQueryCategoryList',
                sendDeleteCategory: 'sendDeleteCategory',
                sendSetDefaultCategory: 'sendSetDefaultCategory',
                sendUpdateCategoryName: 'sendUpdateCategoryName'
            }),
            closeDialog() {
                this.showDialog = false
            },
            openDialog() {
                this.showDialog = true;
            },
            queryList() {
                this.sendQueryCategoryList({
                    pageIndex: this.pagination.pageIndex,
                    pageSize: this.pagination.pageSize
                }).then(res => {
                    if (res) {
                        this.pagination.total = res.total;
                    }
                });
            },
            updateDefault(scope) {
                if (scope.row.isDefault) {
                    return;
                }
                this.sendSetDefaultCategory({index: scope.$index, data: scope.row}).then(() => {
                    this.$message.success('操作成功 ');
                })
            },
            deleteCategory(scope) {
                this.$confirm('你是否真的要删除这个分类?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.sendDeleteCategory({ids: scope.row.id}).then(res => {
                        if (res) {
                            this.$message.success('操作成功');
                            this.queryList();
                        }
                    })
                });
            },
            checkNameForm(promise) {
                let flag = false;
                flag = this.$refs['updateCategory'].checkForm();
                if (flag) {
                    promise(this.sendUpdateCategoryName().then((res) => {
                        if (res) {
                            this.$message.success('操作成功 ');
                            this.closeDialog();
                        }
                    }));
                }
            },
            openEdit(scope) {
                this.openDialog();
                this.setTargetCategory({data: {...scope.row}, index: scope.$index});
            }
        },
        mounted() {
            this.queryList();
        }
    }
</script>

<style scoped>
    .table {
        margin-top: 15px;
    }

    ._radio {
        position: relative;
        top: -1px;
    }
</style>