export default {
    namespaced: true,
    state: {
        categoryManageList: [{name: 'web账户', id: '1', isDefault: true}, {
            name: '服务器与网络设备',
            id: '2',
            isDefault: false
        }, {
            name: '银行卡',
            id: '3',
            isDefault: true
        }],
        targetCategory: {},
        targetCategoryIndex: null
    },
    getters: {
        categoryManageListLen: state => {
            return state.categoryManageList.length;
        }
    },
    mutations: {
        setTargetCategory(state, data) {
            state.targetCategory = data.data;
            state.targetCategoryIndex = data.index;
        },
        updateCategoryRow(state) {
            state.categoryManageList.splice(state.targetCategoryIndex, 1, state.targetCategory);
        },
        updateCategoryList(state, data) {
            state.categoryManageList = data;
        },
        setDefaultCategory(state, data) {
            state.categoryManageList.forEach((item, index) => {
                item.isDefault = index === data.index;
            })
        }

    },
    actions: {
        sendQueryCategoryList({commit}, data) {
            commit('updateCategoryList');
        },
        sendUpdateCategoryName({commit}) {
            commit('updateCategoryRow')
        },
        sendDeleteCategory({commit}, data) {

        },
        sendSetDefaultCategory({commit}, data) {
            commit('setDefaultCategory', data)
        }
    }
}