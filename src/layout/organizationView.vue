<template>
    <div class="">
        <el-tabs @tab-click="handleClick" v-model="activeName">
            <el-tab-pane label="用户" name="users"></el-tab-pane>
            <el-tab-pane label="部门" name="deps"></el-tab-pane>
        </el-tabs>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "organizationView",
        methods: {
            handleClick(component) {
                this.$router.push(`/organization/${component.name}`);
            }
        },
        computed: {
            activeName: {
                get() {
                    let arr = this.$route.path.split('/');
                    if (arr[2] === 'user') {
                        return 'users'
                    }
                    if (arr[2] === 'deps') {
                        return 'deps'
                    }
                    return 'users';
                },
                set(val) {

                }
            }
        }
    }
</script>

<style scoped>

</style>