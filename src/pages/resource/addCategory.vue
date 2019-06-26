<template>
    <div class="page">
        <h3 class="route-name">新建分类</h3>
        <el-form :model="form" :rules="rules" label-width="100px" ref="form">
            <el-form-item label="分类名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <div class="dynamic-field">
                <div :key="index" class="field-wrap" v-for="(field,index) in form.fields">
                    <i @click="deleteField(index)" class="el-icon-remove remove" v-if="form.fields.length>1"></i>
                    <el-form-item label="字段名称" required>
                        <el-col :span="11">
                            <el-form-item :prop="'fields.'+ index +'.name'" :rules="fieldRule.name">
                                <el-input placeholder="最多50个字符" v-model="field.name"></el-input>
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
                    <el-form-item :prop="'fields.'+ index +'.desc'" :rules="fieldRule.desc" label="描述">
                        <el-input v-model="field.desc"></el-input>
                    </el-form-item>
                </div>
            </div>
            <el-button @click="addNewField" type="text">添加字段</el-button>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "addCategory",
        data() {
            return {
                form: {
                    name: '',
                    fields: [{
                        name: '',
                        desc: '',
                        isPwd: false
                    }]
                }
            }
        },
        created() {
            this.rules = {
                name: [
                    {required: true, message: '请输入分类名称', trigger: 'blur'}
                ]
            };
            this.fieldRule = {
                name: [
                    {required: true, message: '请输入字段名称', trigger: 'blur'}
                ],
                desc: [
                    {required: true, message: '请输入字段描述', trigger: 'blur'}
                ]
            }
        },
        methods: {
            addNewField() {
                this.form.fields.push({
                    name: '',
                    desc: '',
                    isPwd: false
                })
            },
            deleteField(index) {
                this.form.fields.splice(index, 1);
            },
            setPwdField(_index) {
                this.form.fields.forEach((item, index) => {
                    item.isPwd = _index === index
                })
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
</style>