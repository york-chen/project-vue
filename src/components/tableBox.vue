<template>
    <div class="table-box">
        <div :class="{ 'table-box-border': border }" class="table-box-container">
            <slot></slot>
        </div>
        <div class="table-box-pagination" v-if="pagination">
            <el-pagination
                    :layout="layout"
                    :current-page="pagination.pageIndex || 1"
                    :page-size="pagination.pageSize || 10"
                    :page-sizes="pageSizes"
                    :total="pagination.total || 0"
                    @current-change="pagination.handleCurrentChange"
                    @size-change="pagination.handleSizeChange"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                pager: {
                    pageIndex: 1,
                    pageSize: 10,
                }
            }
        },
        props: {
            pagination: [Boolean, Object],
            layout: {
                type: String,
                default: 'total, sizes, prev, pager, next, jumper'
            },
            pageSizes: {
                type: Array,
                default: () => [10, 20, 30, 40]
            },
            border: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .table-box {
        .table-box-pagination {
            text-align: right;
            margin-top: 20px;
        }

        .table-box-border {
            border: 1px solid #eee;
            border-bottom: 0;
        }
    }
</style>
