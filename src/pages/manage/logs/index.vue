<template>
    <div class="">
        <h3 class="route-name">操作日志</h3>
        <TableBox :pagination="pagination"
                  class="table">
            <el-table :data="list">
                <el-table-column label="操作者" prop="userName">
                </el-table-column>
                <el-table-column label="用户名" prop="loginName">
                </el-table-column>
                <el-table-column label="时间戳" prop="createTime">
                </el-table-column>
                <el-table-column label="操作类型" prop="operatorType">
                </el-table-column>
            </el-table>
        </TableBox>
    </div>
</template>

<script>
    import TableBox from '@/components/tableBox'
    import {createNamespacedHelpers} from 'vuex'

    const {mapGetters, mapState, mapMutations, mapActions} = createNamespacedHelpers('manage');
    export default {
        name: "index",
        components: {TableBox},
        data() {
            return {
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
                list: 'list'
            })
        },
        methods: {
            ...mapActions({
                sendQueryLogs: 'sendQueryLogs'
            }),
            queryList() {
                this.sendQueryLogs({
                    pageIndex: this.pagination.pageIndex,
                    pageSize: this.pagination.pageSize
                }).then(res => {
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