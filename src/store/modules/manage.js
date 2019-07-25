import {$axChangePwd, $axQueryLogs} from '@/_axios/api/manage'

export default {
    namespaced: true,
    state: {
        list: [],
        fingerprintList: [{name: '指纹1'}, {name: '指纹2'}, {name: '指纹3'}]
    },
    mutations: {
        setList(state, data) {
            state.list = data;
        },
        setFingerprintList(state, data) {
            state.fingerprintList = data;
        }
    },
    actions: {
        sendChangePws({commit}, data) {
            return $axChangePwd(data);
        },
        sendQueryLogs({state}, data) {
            return $axQueryLogs(data).then(res => {
                if (res) {
                    state.list = res.datas;
                    return res;
                }
            })
        }
    }
}