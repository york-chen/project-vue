<template>
    <div class="page">
        <h3 class="route-name">管理分类</h3>
        <el-row class="btn-wrap">
            <el-button icon="el-icon-plus" type="primary">添加账户</el-button>
            <el-button icon="el-icon-delete" type="danger">删除账户</el-button>
        </el-row>
        <TableBox :total="categoryManageListLen" @pageChange="handleCurrentChange"
                  @sizeChange="handleSizeChange"
                  class="table">
            <el-table :data="categoryManageList" @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
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
                <el-button @click="checkNameForm" type="primary">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import TableBox from '@/components/tableBox'
    import UpdateCategory from '@/pages/resource/updateCategory'
    import {createNamespacedHelpers} from 'vuex'

    const {mapGetters, mapState, mapMutations, mapActions} = createNamespacedHelpers('resource');

    export default {
        name: "list",
        components: {TableBox, UpdateCategory},
        data() {
            return {
                showDialog: false,
                pager: {
                    pageSize: 10,
                    curPage: 1
                },
                selection: []
            }
        },
        computed: {
            ...mapState({
                categoryManageList: 'categoryManageList'
            }),
            ...mapGetters({
                categoryManageListLen: 'categoryManageListLen'
            })
        },
        methods: {
            ...mapMutations({
                setTargetCategory: 'setTargetCategory'
            }),
            ...mapActions({
                sendQueryCategoryList: 'sendQueryCategoryList',
                sendUpdateCategoryName: 'sendUpdateCategoryName',
                sendDeleteCategory: 'sendDeleteCategory',
                sendSetDefaultCategory: 'sendSetDefaultCategory'
            }),
            setPager(pager) {
                this.pager.pageSize = pager.pageSize;
                this.pager.curPage = pager.curPage;
            },
            closeDialog() {
                this.showDialog = false
            },
            openDialog() {
                this.showDialog = true;
            },
            handleSizeChange(pager) {
                this.setPager(pager);
                this.queryList();
            },
            handleCurrentChange(pager) {
                this.setPager(pager);
                this.queryList();
            },
            queryList() {
                this.sendQueryCategoryList(this.pager);
                this.selection = []
            },
            updateDefault(scope) {
                if (scope.row.isDefault) {
                    return;
                }
                this.sendSetDefaultCategory({index: scope.$index, data: scope.row})
            },
            deleteCategory(scope) {
                this.$confirm('你是否真的要删除这个分类?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.sendDeleteCategory(scope.row.id);
                });
            },
            checkNameForm() {
                let flag = false;
                flag = this.$refs['updateCategory'].checkForm();
                if (flag) {
                    this.sendUpdateCategoryName();
                    this.closeDialog();
                }
            },
            openEdit(scope) {
                this.openDialog();
                this.setTargetCategory({data: {...scope.row}, index: scope.$index});
            },
            handleSelectionChange(selection) {
                this.selection = selection;
            }
        }
    }
</script>

<style scoped>
    .btn-wrap {
        margin: 15px 0 10px 0;
    }

    .table {
        margin-top: 15px;
    }

    .point {
        cursor: pointer;
    }

    ._radio {
        position: relative;
        top: -1px;
    }
</style>