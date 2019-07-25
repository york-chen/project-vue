<template>
    <div class="page">
        <div class="route-name">指纹管理</div>
        <el-row class="btn-wrap">
            <el-button @click="openDialog" icon="el-icon-folder-opened" size="medium" type="primary">指纹管理</el-button>
        </el-row>
        <el-dialog :visible.sync="showDialog" :width="'60%'" title="指纹管理">
            <FingerList :list="fingerprintList" @del-finger="deleteFinger"/>
        </el-dialog>
    </div>
</template>

<script>
    import FingerList from '@/components/fingerList'
    import {createNamespacedHelpers} from 'vuex'

    const {mapGetters, mapState, mapMutations, mapActions} = createNamespacedHelpers('desktop/fingerManage');
    export default {
        name: "index",
        components: {FingerList},
        data() {
            return {
                showDialog: false
            }
        },
        computed: {
            ...mapState({
                fingerprintList: 'fingerprintList'
            })
        },
        methods: {
            openDialog() {
                this.showDialog = true;
            },
            deleteFinger() {

            }
        }
    }
</script>

<style scoped>

</style>