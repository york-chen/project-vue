<template>
    <el-container class="authened-wrap">
        <el-header class="topBar">
            <div class="left">企业级密码管理系统</div>
            <div class="right">
                <el-button @click="lockSys" class="logout" type="text">一键锁定</el-button>
                <el-button @click="logout" class="logout" type="text">登出</el-button>
            </div>
        </el-header>
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
                        <el-menu-item :index="`/resource/list/${item.id}`" :key="item.id"
                                      v-for="item in categoryMenu">{{item.name}}
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item index="/virtualMachine/list">
                        <i class="el-icon-monitor"></i>
                        <span slot="title">虚拟机资源</span>
                    </el-menu-item>
                    <el-menu-item index="/organization/users">
                        <i class="el-icon-s-custom"></i>
                        <span slot="title">用户</span>
                    </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>管理</span>
                        </template>
                        <el-menu-item index="/manage/logs">操作日志</el-menu-item>
                        <el-menu-item index="/manage/pwd">密码管理</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import {createNamespacedHelpers, mapActions} from 'vuex'

    const {mapGetters, mapState, mapMutations} = createNamespacedHelpers('resource');

    export default {
        name: "authenriedView",
        data() {
            return {
                isCollapse: false
            }
        },
        computed: {
            ...mapState({
                categoryMenu: 'categoryMenu'
            })
        },
        methods: {
            ...mapActions('home', {
                sendLogout: 'sendLogout'
            }),
            handleOpen(key, keyPath) {
            },
            handleClose(key, keyPath) {
            },
            logout() {
                this.sendLogout().then(res => {
                    if (res) {
                        this.$router.push('/login');
                    }
                })
            },
            lockSys() {
                this.sendLogout().then(res => {
                    if (res) {
                        this.$router.push('/login/finger');
                    }
                })
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
            padding: 0 30px;
            background-color: #409EFF;
            color: #fff;
            display: flex;

            .left {
                flex: 1;
            }

            .logout {
                color: #fff;
            }
        }

        .main {
            flex: 1;
        }

        .left-menu {
            height: 100%;
        }
    }
</style>