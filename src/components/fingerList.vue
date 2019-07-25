<template>
    <div>
        <div :key="item.id" class="finger-wrap" v-for="item in list">
            <div class="fing-name">{{item.name}}</div>
            <div class="operate">
                <el-button @click="handleDelete(item.id)" class="t-danger" size="small" type="text">删除</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "fingerList",
        props: {
            list: {
                type: Array,
                default: []
            }
        },
        methods: {
            handleDelete(id) {
                this.$emit('del-finger', id);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .finger-wrap {
        display: flex;
        line-height: 50px;
        height: 50px;
        border-bottom: 1px solid rgb(244, 244, 245);

        .fing-name {
            flex: 3;
        }

        .operate {
            flex: 1;
        }
    }

    .t-danger {
        color: #F56C6C;
    }
</style>