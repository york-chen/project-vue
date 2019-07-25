import {$axGetUserList,$axEditUser, $axGetDepList, $axAddUser, $axDeleteUser, $axChangeUserRole} from '@/_axios/api/organization'

export default {
    namespaced: true,
    state: {
        list: [],
        targetUser: new Object(null),
        targetIndex: -1,
        depList: []
    },
    mutations: {
        setTargetUser(state, data) {
            state.targetUser = data.data;
            state.targetIndex = data.index;
        }
    },
    actions: {
        sendGetUserList({commit, state}, data) {
            return $axGetUserList(data).then(res => {
                if (res) {
                    state.list = res.datas;
                    return res;
                }
            });
        },
        sendGetDepList({commit, state}, data) {
            return $axGetDepList(data).then(res => {
                if (res) {
                    state.depList = res.datas;
                    return res;
                }
            })
        },
        sendAddUser({commit}, data) {
            return $axAddUser(data);
        },
        sendEditUser({commit}, data) {
            return $axEditUser(data);
        },
        sendDeleteUser({commit}, data) {
            return $axDeleteUser(data);
        },
        sendChangeUserRole({commit}, data) {
            return $axChangeUserRole(data);
        }
    }
}