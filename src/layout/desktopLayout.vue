<template>
    <el-container class="authened-wrap">
        <el-header class="topBar">企业级密码管理系统</el-header>
        <el-container class="main">
            <el-aside width="200px">
                <el-menu
                        active-text-color="#20a0ff"
                        background-color="#DCDFE6"
                        class="left-menu"
                        default-active="1"
                        router
                        text-color="#48576a">
                    <el-menu-item index="/desktop/virtualMachine">
                        <i class="el-icon-monitor"></i>
                        <span slot="title">虚拟机资源</span>
                    </el-menu-item>
                    <el-menu-item index="/desktop/fingerManage">
                        <i class="el-icon-s-custom"></i>
                        <span slot="title">指纹管理</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>

</script>

<style lang="scss" scoped>
    .authened-wrap {
        height: 100%;
        display: flex;
        flex-direction: column;

        .topBar {
            line-height: 60px;
            padding-left: 30px;
            background-color: #409EFF;
            color: #fff;
        }

        .main {
            flex: 1;
        }

        .left-menu {
            height: 100%;
        }
    }
</style>