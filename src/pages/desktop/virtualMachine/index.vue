<template>
    <div class="page">
        <div class="route-name">虚拟机资源</div>
        <TableBox :total="list.length" @pageChange="handleCurrentChange"
                  @sizeChange="handleSizeChange"
                  class="table">
            <el-table :data="list">
                <el-table-column label="资源名称" prop="name">
                </el-table-column>
                <el-table-column label="描述" prop="desc">
                </el-table-column>
                <el-table-column label="部门" prop="dep">
                </el-table-column>
                <el-table-column label="登录账号" prop="account">
                </el-table-column>
                <el-table-column label="密码">
                    <template slot-scope="{row}">
                        <div>***</div>
                    </template>
                </el-table-column>
                <el-table-column label="远程管理">
                    <template slot-scope="scope">
                        <i @click="handleRemoteCompute" class="el-icon-s-platform point"></i>
                    </template>
                </el-table-column>
            </el-table>
        </TableBox>
    </div>
</template>

<script>
    import TableBox from '@/components/tableBox'
    import {createNamespacedHelpers} from 'vuex'

    const {mapGetters, mapState, mapMutations, mapActions} = createNamespacedHelpers('desktop/virtualMachine');
    export default {
        name: "index",
        components: {TableBox},
        computed: {
            ...mapState({
                list: 'list'
            })
        },
        methods: {
            handleRemoteCompute() {

            },
            handleCurrentChange() {

            },
            handleSizeChange() {

            }
        }
    }
</script>

<style scoped>

</style>