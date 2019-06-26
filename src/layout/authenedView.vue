<template>
    <el-container class="authened-wrap">
        <el-header class="topBar">企业级密码管理系统</el-header>
        <el-container class="main">
            <el-aside width="200px">
                <el-menu
                        @close="handleClose"
                        @open="handleOpen"
                        active-text-color="#20a0ff"
                        background-color="#DCDFE6"
                        class="left-menu"
                        default-active="1"
                        router
                        text-color="#48576a">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-folder-opened"></i>
                            <span>个人资源</span>
                        </template>
                        <el-menu-item index="/resource/addCategory">新建分类</el-menu-item>
                        <el-menu-item index="/resource/categoryManage">管理分类</el-menu-item>
                        <el-menu-item v-for="item in categoryManageList" :key="item.id" :index="`/resource/list/${item.id}`">{{item.name}}</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-monitor"></i>
                        <span slot="title">虚拟机资源</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-s-custom"></i>
                        <span slot="title">用户</span>
                    </el-menu-item>
                    <el-menu-item index="manager">
                        <i class="el-icon-setting"></i>
                        <span slot="title">管理</span>
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
    import {createNamespacedHelpers} from 'vuex'

    const {mapGetters, mapState, mapMutations, mapActions} = createNamespacedHelpers('resource');

    export default {
        name: "authenriedView",
        data() {
            return {
                isCollapse: false
            }
        },
        computed:{
          ...mapState({
              categoryManageList: 'categoryManageList'
          })
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
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