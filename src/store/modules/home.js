import {$axLogin,$axLoginout} from '@/_axios/api/home'

export default {
    namespaced: true,
    state: {
        userBaseInfo: localStorage.userBaseInfo ? JSON.parse(localStorage.userBaseInfo) : {}
    },
    mutations: {
        setUserBaseInfo(state, data) {
            state.userBaseInfo = data;
        }
    },
    actions: {
        sendLogin({commit, dispatch, state}, data) {
            return $axLogin(data).then(res => {
                if (!res) return;
                commit('setUserBaseInfo', res);
                localStorage.userBaseInfo = JSON.stringify(res);
                return res;
            })
        },
        sendLogout(){
            return $axLoginout();
        }

    }
}