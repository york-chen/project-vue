<template>
    <div>
        <el-row class="select">
            <el-col :span="3">
                <div class="label">指定所有人</div>
            </el-col>
            <el-col :span="10">
                <el-select filterable placeholder="请选择" v-model="assignId">
                    <el-option
                            :key="item.id"
                            :label="item.userName"
                            :value="item.id"
                            v-for="item in assignUserList">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-alert
                :closable="false"
                show-icon
                title="小提示：指定所有人后只有所有人才有权限配置此虚拟机的所有操作"
                type="info">
        </el-alert>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'

    const {mapGetters, mapState, mapMutations, mapActions} = createNamespacedHelpers('virtualMachine');
    export default {
        name: "assign",
        computed: {
            ...mapState({
                assignUserList: 'assignUserList',
            }),
            assignId: {
                get() {
                    return this.$store.state.virtualMachine.assignId;
                },
                set(value) {
                    this.setAssignId(value);
                }
            }
        },
        methods: {
            ...mapMutations({
                setAssignId: 'setAssignId'
            })
        }
    }
</script>

<style scoped>
    .label {
        line-height: 40px;
    }

    .select {
        margin-bottom: 15px;
    }
</style>