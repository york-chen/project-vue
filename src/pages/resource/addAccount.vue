<template>
    <div>
        <el-form :model="targetDynamicData" label-width="100px" ref="form">
            <el-form-item :key="item.propName" :label="item.propName" :prop="'prop.'+ [item.propName]"
                          :rules="[{ required: true, message: '不能为空'}]" v-for="(item) in dynamicColumns">
                <el-input v-model="targetDynamicData.prop[item.propName]"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'

    const {mapGetters, mapState, mapMutations, mapActions} = createNamespacedHelpers('resource');
    export default {
        name: "addAccount",
        computed: {
            ...mapState({
                dynamicColumns: 'dynamicColumns',
                targetDynamicData: 'targetDynamicData'
            }),
        },
        methods: {
            checkForm() {
                let flag = false;
                this.$refs['form'].validate(valid => {
                    flag = valid;
                });
                return flag;
            }
        }
    }
</script>

<style scoped>

</style>