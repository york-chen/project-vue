<template>
    <div class="">
        <TableBox :total="categoryManageListLen" @pageChange="handleCurrentChange"
                  @sizeChange="handleSizeChange"
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
                        <i @click="openEdit(scope.row)" class="el-icon-edit-outline"></i>
                    </template>
                </el-table-column>
                <el-table-column label="删除">
                    <template slot-scope="scope">
                        <i @click="deleteCategory" class="el-icon-delete"></i>
                    </template>
                </el-table-column>
                <el-table-column label="设为默认">
                    <template slot-scope="scope">
                        <el-radio :label="null" v-model="scope.row.isDefault"></el-radio>
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

    const {mapGetters, mapState, mapMutations} = createNamespacedHelpers('resource');

    export default {
        name: "list",
        components: {TableBox, UpdateCategory},
        data() {
            return {
                showDialog: false
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
            handleSizeChange(pageSize) {

            },
            handleCurrentChange(curPage) {

            },
            deleteCategory(id) {

            },
            checkNameForm() {

            },
            openEdit(row) {
                this.showDialog = true;
                this.setTargetCategory({...row});
            }
        }
    }
</script>

<style scoped>
    .table {
        margin-top: 15px;
    }

    .pager {
        margin-top: 15px;
        text-align: right;
    }
</style>