<template>
    <el-form :model="form" :rules="rule" label-width="100px" ref="form">
        <el-form-item label="重命名类别" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
    </el-form>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'

    const {mapGetters, mapState, mapMutations} = createNamespacedHelpers('resource');

    export default {
        name: "updateCategory",
        computed: {
            ...mapState({
                form: 'targetCategory'
            })
        },
        created() {
            this.rule = {
                name: [
                    {required: true, message: '请输入类别名称', trigger: 'blur'}
                ]
            }
        }
    }
</script>

<style scoped>

</style>