<template>
    <div class="table-box">
        <div :class="{ 'table-box-border': border }" class="table-box-container">
            <slot></slot>
        </div>
        <div class="table-box-pagination" v-if="pagination">
            <el-pagination
                    :current-page="pager.curPage"
                    :layout="layout"
                    :page-size="pager.pageSize"
                    :page-sizes="pageSizes"
                    :total="total"
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pager: {
                    curPage: 1,
                    pageSize: 10,
                }
            }
        },
        props: {
            pagination: {
                type: Boolean,
                default: true
            },
            total: {
                type: Number,
                default: 0
            },
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
        },
        methods: {
            handleCurrentChange(pageSize) {
                this.pager.pageSize = pageSize;
                this.pager.curPage = 1;
                this.$emit('pageChange', this.pager);
            },
            handleSizeChange(curPage) {
                this.pager.curPage = curPage;
                this.$emit('sizeChange', this.pager);
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
