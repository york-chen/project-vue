import {
    $axGetCategory,
    $axGetCategoryAccountList,
    $axCreateCategory,
    $axUpdateCategory,
    $axDeleteCategory,
    $axCreateCategoryAccount,
    $axEditCategoryAccount,
    $axDeleteCategoryAccount
} from '@/_axios/api/resource'

export default {
    namespaced: true,
    state: {
        categoryManageList: [],
        categoryMenu: [],
        targetCategory: {},
        targetCategoryIndex: null,
        dynamicDataList: [],
        dynamicColumns: [],
        targetDynamicData: new Object(null),
        targetDynamicDataIndex: null
    },
    mutations: {
        setTargetCategory(state, data) {
            state.targetCategory = data.data;
            state.targetCategoryIndex = data.index;
        },
        updateCategoryRow(state) {
            state.categoryManageList.splice(state.targetCategoryIndex, 1, state.targetCategory);
        },
        setDefaultCategory(state, data) {
            state.categoryManageList.forEach((item, index) => {
                item.isDefault = index === data.index;
            })
        },
        updateDynamicDataList(state, data) {
            data.listData.forEach(item => {
                item.showPwd = false;
            });
            state.dynamicDataList = data.listData;
            //需要判断columns 是否发生了变化，再看是否需要赋值操作
            state.dynamicColumns = data.title;
        },
        setTargetDynamicData(state, data) {
            state.targetDynamicData = data.data;
            state.targetDynamicDataIndex = data.index;
        },
        updateDynamicDataRow(state) {
            state.dynamicDataList.splice(state.targetDynamicDataIndex, 1, state.targetDynamicData);
        },
        changePwdStatus(state, data) {
            state.dynamicDataList[data.index].showPwd = !state.dynamicDataList[data.index].showPwd;
        }
    },
    actions: {
        sendQueryCategoryList({commit, state}, data) {
            return $axGetCategory(data).then(res => {
                if (!res) return;
                if (data.pageSize > 1000) {
                    state.categoryMenu = res.datas;
                } else {
                    state.categoryManageList = res.datas;
                }
                return res;
            });
        },
        sendUpdateCategoryName({commit, dispatch, state}) {
            let postData = {
                newName: state.targetCategory.name,
                categoryId: state.targetCategory.id,
                isDefault: state.targetCategory.isDefault
            };
            return $axUpdateCategory(postData).then(res => {
                if (!res) return;
                commit('updateCategoryRow');
                dispatch('sendQueryCategoryList', {pageIndex: 1, pageSize: 10000});
                return res
            });
        },
        sendDeleteCategory({dispatch}, data) {
            return $axDeleteCategory(data).then(res => {
                if (res) {
                    dispatch('sendQueryCategoryList', {pageIndex: 1, pageSize: 10000});
                    return res
                }
            })
        },
        sendSetDefaultCategory({commit, dispatch}, data) {
            let postData = {
                newName: data.data.name,
                categoryId: data.data.id,
                isDefault: true
            };
            return $axUpdateCategory(postData).then(res => {
                if (!res) return;
                commit('setDefaultCategory', data);
            });
        },
        /**
         * 查询 动态列表数据
         * @param commit
         * @param data
         */
        sendQueryDynamicDataList({commit}, data) {
            return $axGetCategoryAccountList(data).then(res => {
                if (res) {
                    commit('updateDynamicDataList', res);
                    return res;
                }
            });
        },
        //删除动态数据项
        sendDeleteDynamicData({commit}, data) {
            return $axDeleteCategoryAccount(data)
        },
        sendCreateCategory({commit, dispatch}, data) {
            return $axCreateCategory(data).then(res => {
                if (res) {
                    dispatch('sendQueryCategoryList', {pageIndex: 1, pageSize: 10000});
                    return res;
                }
            })
        },
        sendCreateAccount({commit}, data) {
            return $axCreateCategoryAccount(data)
        },
        sendEditAccount({commit}, data) {
            return $axEditCategoryAccount(data)
        }
    }
}