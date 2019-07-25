<template>
    <el-button :disabled="_disable" :plain="plain" :size="size" :style="_style" :type="_type" @click="handleClick">
        {{_label}}
    </el-button>
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
            size: String,
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
            },
            arguments: {
                default: null
            },
            plain: {
                default: false
            }
        },
        computed: {
            _label() {
                return this.loading ? this.exec_label : this.label
            }
        },
        methods: {
            handleClick() {
                if (this.loading) return;
                this.$emit('_click', this.changeLoading, this.arguments)
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