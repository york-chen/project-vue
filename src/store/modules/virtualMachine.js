import {
    $axGetVirtualMachineList,
    $axAddVirtualMachine,
    $axGetMachinePwd,
    $axEditVirtualMachine,
    $axDeleteVirtualMachine,
    $axGetUserRelateShare,
    $axBatchCancelShareVM,
    $axChangeSharePermition,
    $axSetAssignOwner
} from '@/_axios/api/virtualMachine'

import {$axGetDepList, $axGetUserList} from '@/_axios/api/organization'

export default {
    namespaced: true,
    state: {
        list: [],
        targetMachine: new Object(null),
        userList: [],
        depList: [],
        assignId: '',
        assignUserList: []
    },
    getters: {
        targetIndex(state) {
            let id = state.targetMachine.id, targetIndex = -1;
            if (!id) {
                return targetIndex;
            }
            for (let i in state.list) {
                let machine = state.list[i];
                if (machine.id === id) {
                    targetIndex = i;
                    break;
                }
            }
            return targetIndex;
        }
    },
    mutations: {
        setList(state, data) {
            state.list = data;
        },
        setTargetMachine(state, data) {
            state.targetMachine = data;
        },
        changePwdStatus(state, data) {
            if (data.type === 1) {
                state.list[data.index]['showAccountRoot'] = !state.list[data.index]['showAccountRoot'];
            }
            if (data.type === 2) {
                state.list[data.index]['showAccount1'] = !state.list[data.index]['showAccount1'];
            }
            if (data.type === 3) {
                state.list[data.index]['showAccount2'] = !state.list[data.index]['showAccount2'];
            }
            if (data.type === 4) {
                state.list[data.index]['showAccount3'] = !state.list[data.index]['showAccount3'];
            }
        },
        setAssignId(state, data) {
            state.assignId = data;
        },
    },
    actions: {
        sendQueryList({commit, state}, data) {
            return $axGetVirtualMachineList(data).then(res => {
                if (res) {
                    res.datas.forEach(item => {
                        item.rootPwd = item.rootPwd || '';
                        item.normalPwd1 = item.normalPwd1 || '';
                        item.normalPwd2 = item.normalPwd2 || '';
                        item.normalPwd3 = item.normalPwd3 || '';
                        item.showAccountRoot = false;
                        item.showAccount1 = false;
                        item.showAccount2 = false;
                        item.showAccount3 = false;
                    });
                    state.list = res.datas;
                    return res;
                }
            });
        },
        sendAddVirtualMachine({commit}, data) {
            return $axAddVirtualMachine(data);
        },
        sendQueryDepList({commit, state}, data) {
            return $axGetDepList(data).then(res => {
                if (res) {
                    state.depList = res.datas;
                    return res;
                }
            });
        },
        sendGetMachinePwd({commit, state}, data) {
            return $axGetMachinePwd(data).then(res => {
                if (res) {
                    let pwd = typeof res === 'object' ? ' ' : res;
                    if (data.type === 1) {
                        state.list[data.index].rootPwd = pwd;
                    }
                    if (data.type === 2) {
                        state.list[data.index].normalPwd1 = pwd;
                    }
                    if (data.type === 3) {
                        state.list[data.index].normalPwd2 = pwd;
                    }
                    if (data.type === 4) {
                        state.list[data.index].normalPwd3 = pwd;
                    }
                    commit('changePwdStatus', data);
                    return pwd;
                }
            });
        },
        sendEditVirtualMachine({commit, state}, data) {
            return $axEditVirtualMachine(data);
        },
        sendDeleteVirtualMachine({commit, state}, data) {
            return $axDeleteVirtualMachine(data);
        },
        sendGetUserRelateShare({commit, state}, data) {
            return $axGetUserRelateShare(data).then(res => {
                if (res) {
                    state.userList = res.datas.map(item => {
                        item.fromDate = item.fromDate ? item.fromDate.split('-').join('.') : '';
                        item.endDate = item.endDate ? item.endDate.split('-').join('.') : '';
                        return item;
                    });
                    return res;
                }
            })
        },
        sendBatchCancelShareVM({commit}, data) {
            return $axBatchCancelShareVM(data)
        },
        sendChangeSharePermition({commit}, data) {
            return $axChangeSharePermition(data);
        },
        sendGetAssignUserList({commit, state}, data) {
            return $axGetUserList(data).then(res => {
                if (res) {
                    state.assignUserList = res.datas;
                    return res;
                }
            });
        },
        sendSetAssignOwner({commit}, data) {
            return $axSetAssignOwner(data);
        }
    }
}