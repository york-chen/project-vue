<template>
    <div class="page">
        <div class="route-name">{{routeName}}</div>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'

    const {mapGetters, mapState, mapMutations, mapActions} = createNamespacedHelpers('resource');

    export default {
        name: "categoryDataList",
        computed: {
            ...mapState({
                categoryManageList: 'categoryManageList'
            }),
            routeName() {
                let id = this.$route.params.id;
                let target = this.categoryManageList.find(item => {
                    return item.id === id;
                });
                return target.name;
            }
        }
    }
</script>

<style scoped>

</style>