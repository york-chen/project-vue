<template>
    <el-button :disabled="_disable" :style="_style" :type="_type" @click="handleClick">{{_label}}</el-button>
</template>

<script>
    export default {
        name: "asyncButton",
        data() {
            return {
                loading: false
            }
        },
        props: {
            label: {
                type: String,
                default: '确定'
            },
            exec_label: {
                type: String,
                default: '加载中'
            },
            _type: {
                type: String,
                default: ''
            },
            _disable: {
                type: Boolean,
                default: false
            },
            _style: {
                type: String,
                default: ''
            }
        },
        computed: {
            _label() {
                return this.loading ? this.exec_label : this.label
            }
        },
        methods: {
            handleClick() {
                this.$emit('_click', this.changeLoading)
            },
            changeLoading(fn) {
                if (!fn || !fn.then) {
                    return;
                }
                this.loading = true;
                fn.then(() => {
                    this.loading = false;
                }).catch(() => {
                    this.loading = false;
                })
            }
        }
    }
</script>

<style scoped>

</style>