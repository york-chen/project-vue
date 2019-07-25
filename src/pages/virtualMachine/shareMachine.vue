<template>
    <div>
        <el-alert
                :closable="false"
                show-icon
                title="您将'查看'、'修改'、或'完全访问'的访问权限，通过共享来向其他用户授予对测试及其所有账户的访问。您可以随时通过单击相应用户旁边的'撤销'按钮撤销共享，从而删除访问权限"
                type="info">
        </el-alert>
        <el-row class="searchBar">
            <el-col :span="12">
                <el-input
                        placeholder="搜索用户名或者账号"
                        size="medium"
                        v-model="name">
                    <i class="el-input__icon el-icon-search" slot="prefix"></i>
                    <el-button @click="handleQueryBtnClick" slot="append">查询</el-button>
                </el-input>
            </el-col>
            <el-col :span="2">&#12288;</el-col>
            <el-col :span="10">
                <el-button @click="batchRemoveRight" size="medium" type="primary">批量撤销</el-button>
            </el-col>
        </el-row>
        <TableBox :pagination="pagination" class="table">
            <el-table :data="userList"
                      @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column label="账号" prop="loginName">
                </el-table-column>
                <el-table-column label="用户名" prop="userName">
                </el-table-column>
                <el-table-column label="访问类型" prop="authority">
                    <template slot-scope="{row,$index}">
                        <el-popover
                                :ref="`popover${row.userId}`"
                                placement="left"
                                width="160">
                            <el-select placeholder="请选择" v-model="tempAuthority">
                                <el-option :value="60" label="查看密码"></el-option>
                                <el-option :value="20" label="root账户访问"></el-option>
                                <el-option :value="30" label="普通用户访问"></el-option>
                                <el-option :value="1" label="完全访问"></el-option>
                                <el-option :value="70" label="禁止查看"></el-option>
                            </el-select>
                            <div style="text-align: right; margin: 0">
                                <el-button @click="closePopover(row.userId)" size="mini" type="text">取消</el-button>
                                <el-button @click="confirmPopover(row)" size="mini" type="text">确定</el-button>
                            </div>
                            <el-button @click="recordAuthority(row)" slot="reference" type="text">
                                {{permissionType.get(row.permissionType)}}
                            </el-button>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="权限期限" prop="duration">
                    <template slot-scope="{row,index:$index}">
                        <el-popover
                                :ref="`popoverDate${row.userId}`"
                                placement="left">
                            <el-date-picker
                                    @change="openDatePopover(row.userId)"
                                    end-placeholder="结束日期"
                                    format="yyyy.MM.dd"
                                    start-placeholder="开始日期"
                                    type="daterange"
                                    v-model="tempDuration"
                                    value-format="yyyy.MM.dd">
                            </el-date-picker>
                            <div style="text-align: right; margin: 0">
                                <el-button @click="closeDatePopover(row.userId)" size="mini" type="text">取消</el-button>
                                <el-button @click="confirmDatePopover(row)" size="mini" type="text">确定</el-button>
                            </div>
                            <el-button @click="recordDuration(row)" slot="reference" type="text">
                                {{`${row.fromDate}-${row.endDate}`}}
                            </el-button>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
        </TableBox>
    </div>
</template>

<script>
    import TableBox from '@/components/tableBox'
    import {createNamespacedHelpers} from 'vuex'
    import constents from '@/constents'

    const {mapGetters, mapState, mapMutations, mapActions} = createNamespacedHelpers('virtualMachine');
    export default {
        name: "share",
        components: {TableBox},
        created() {
            this.section = [];
            this.permissionType = constents.permissionType;
        },
        props: ['source'],
        data() {
            return {
                tempAuthority: '',
                tempDuration: '',
                name: '',
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
                userList: 'userList'
            })
        },
        methods: {
            ...mapActions({
                sendGetUserRelateShare: 'sendGetUserRelateShare',
                sendBatchCancelShareVM: 'sendBatchCancelShareVM',
                sendChangeSharePermition: 'sendChangeSharePermition'
            }),
            recordAuthority(row) {
                this.tempAuthority = row.permissionType;
            },
            recordDuration(row) {
                this.tempDuration = `${row.fromDate}-${row.endDate}`;
            },
            closePopover(id) {
                this.$refs[`popover${id}`].doClose();
            },
            confirmPopover(row) {
                row.permissionType = this.tempAuthority;
                this.closePopover(row.userId);
                this.changeSharePermition(row);
            },
            closeDatePopover(id) {
                this.$refs[`popoverDate${id}`].doClose();
            },
            openDatePopover(id) {
                this.$refs[`popoverDate${id}`].doShow();
            },
            confirmDatePopover(row) {
                if (Array.isArray(this.tempDuration)) {
                    row.fromDate = this.tempDuration[0];
                    row.endDate = this.tempDuration[1];
                } else {
                    let arr = this.tempDuration.split('-');
                    row.fromDate = arr[0] === 'null' ? '' : arr[0];
                    row.endDate = arr[1] === 'null' ? '' : arr[1];
                }
                this.closeDatePopover(row.userId);
                this.changeSharePermition(row);
            },
            handleSelectionChange(section) {
                this.section = section;
            },
            batchRemoveRight() {
                if (!this.section.length) {
                    this.$message.info('请选择用户');
                    return false;
                }
                this.sendBatchCancelShareVM({assignId: this.section.map(item => item.assignId).join(',')}).then(res => {
                    if (res) {
                        this.$message.success('操作成功');
                        this.queryList();
                    }
                })
            },
            handleQueryBtnClick() {
                this.pagination.pageIndex = 1;
                this.queryList();
            },
            queryList() {
                this.sendGetUserRelateShare({
                    name: this.name,
                    resourceId: this.source[0].id
                }).then(res => {
                    if (res) {
                        this.pagination.total = res.total;
                    }
                })
            },
            changeSharePermition(row) {
                let temp = {...row};
                this.sendChangeSharePermition({
                    userId: temp.userId,
                    resourceId: this.source[0].id,
                    permissionType: temp.permissionType,
                    fromDate: temp.fromDate && temp.fromDate.split('.').join('-'),
                    endDate: temp.endDate && temp.endDate.split('.').join('-')
                }).then(res => {
                    if (res) {
                        this.$message.success('操作成功');
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
    .searchBar {
        margin: 15px 0 5px;
    }
</style>