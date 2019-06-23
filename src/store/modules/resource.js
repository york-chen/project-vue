export default {
    namespaced: true,
    state: {
        categoryManageList: [{name: 'web账户', type: 'web'}, {name: '服务器与网络设备', type: 'netWork'}, {
            name: '银行卡',
            type: 'cashCard'
        }],
        targetCategory:{}
    },
    getters: {
        categoryManageListLen: state => {
            return state.categoryManageList.length;
        }
    },
    mutations: {
        setTargetCategory(state,data){
            state.targetCategory = data;
        }
    },
    actions: {}
}