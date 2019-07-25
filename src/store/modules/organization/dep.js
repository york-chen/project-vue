import {
    $axGetUserList,
    $axGetDepList,
    $axAddDep,
    $axEditDep,
    $axDeleteDep,
    $axMoveOutDep,
    $axMoveToDep
} from '@/_axios/api/organization'

export default {
    namespaced: true,
    state: {
        list: [],
        targetDep: new Object(null),
        targetIndex: -1,
        userList: []
    },
    mutations: {
        setTargetDep(state, data) {
            state.targetDep = data.data;
            state.targetIndex = data.index;
        }
    },
    actions: {
        sendGetDepList({commit, state}, data) {
            return $axGetDepList().then(res => {
                if (res) {
                    state.list = res.datas;
                    return res;
                }
            })
        },
        sendAddDep({commit}, data) {
            return $axAddDep(data);
        },
        sendEditDep({commit}, data) {
            return $axEditDep(data);
        },
        sendDeleteDep({commit}, data) {
            return $axDeleteDep(data);
        },
        sendGetUserList({state}, data) {
            return $axGetUserList(data).then(res => {
                if (res) {
                    state.userList = res.datas;
                    return res;
                }
            });
        },
        sendMoveOutDep({commit}, data) {
            return $axMoveOutDep(data);
        },
        sendMoveToDep({commit}, data) {
            return $axMoveToDep(data);
        }
    }
}