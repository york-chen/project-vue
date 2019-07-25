<template>
    <div class="page">
        <h3 class="route-name">新建分类</h3>
        <el-form :model="form" :rules="rules" label-width="100px" ref="form">
            <el-form-item label="分类名称" prop="categoryName">
                <el-input v-model="form.categoryName"></el-input>
            </el-form-item>
            <div class="dynamic-field">
                <div :key="index" class="field-wrap" v-for="(field,index) in form.prop">
                    <i @click="deleteField(index)" class="el-icon-remove remove" v-if="form.prop.length>1"></i>
                    <el-form-item label="字段名称" required>
                        <el-col :span="11">
                            <el-form-item :prop="'prop.'+ index +'.propName'" :rules="propRule.propName">
                                <el-input placeholder="最多50个字符" v-model="field.propName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">&nbsp;</el-col>
                        <el-col :span="12">
                            <el-form-item>
                                <el-radio-group v-model="field.isPwd">
                                    <el-radio :label="true" @change="setPwdField(index)">是否为密码</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item :prop="'prop.'+ index +'.propDesc'" :rules="propRule.propDesc" label="描述">
                        <el-input v-model="field.propDesc"></el-input>
                    </el-form-item>
                </div>
            </div>
            <el-button @click="addNewField" type="text">添加字段</el-button>
            <el-form-item>
                <div class="center">
                    <AsyncButton @_click="save" _type="primary" exec_label="保存中" label="保存" size="medium"/>
                    <el-button @click="clearField" size="medium" type="danger">清除</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import AsyncButton from '@/components/asyncButton'
    import {createNamespacedHelpers} from 'vuex'

    const {mapGetters, mapState, mapMutations, mapActions} = createNamespacedHelpers('resource');
    export default {
        name: "addCategory",
        components: {AsyncButton},
        data() {
            return {
                form: {
                    categoryName: '',
                    prop: [{
                        propName: '',
                        propDesc: '',
                        isPwd: false
                    }]
                }
            }
        },
        created() {
            this.rules = {
                categoryName: [
                    {required: true, message: '请输入分类名称', trigger: 'blur'}
                ]
            };
            this.propRule = {
                propName: [
                    {required: true, message: '请输入字段名称', trigger: 'blur'}
                ],
                propDesc: [
                    {required: true, message: '请输入字段描述', trigger: 'blur'}
                ]
            }
        },
        methods: {
            ...mapActions({
                sendCreateCategory: 'sendCreateCategory'
            }),
            addNewField() {
                this.form.prop.push({
                    name: '',
                    desc: '',
                    isPwd: false
                })
            },
            deleteField(index) {
                this.form.prop.splice(index, 1);
            },
            setPwdField(_index) {
                this.form.prop.forEach((item, index) => {
                    item.isPwd = _index === index
                })
            },
            save() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.form.prop.forEach((item, index) => {
                            item.showOrder = index;
                        });
                        this.sendCreateCategory(this.form).then(res => {
                            this.$message.success('添加分类成功');
                            this.$router.push('/resource/categoryManage');
                        })
                    }
                });
            },
            clearField() {
                this.$refs['form'].resetFields();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .field-wrap {
        padding: 20px;
        border: 1px solid #ccc;
        position: relative;
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }
    }


    .remove {
        color: red;
        font-size: 20px;
        position: absolute;
        top: -10px;
        left: -10px;
    }

    .r-box {
        margin-right: 35px;
    }
</style>