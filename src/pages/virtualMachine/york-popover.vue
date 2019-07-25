<template>
    <el-popover
            placement="top"
            ref="popover1"
            v-model="showSelect"
            width="160">
        <p>这是一段内容这是一段内容确定删除吗？</p>
        <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text">取消</el-button>
            <el-button size="mini" type="primary">确定</el-button>
        </div>
    </el-popover>
</template>

<script>
    export default {
        name: "york-popover",
        props:{

        }
    }
</script>

<style scoped>

</style>