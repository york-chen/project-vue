import axios from '@/_axios'

export const $axChangePwd = params => {
    return axios({
        method: 'post',
        url: '/user/changepwd'
    }, params)
};
export const $axQueryLogs = params => {
    return axios({
        method: 'post',
        url: '/user/log/list'
    }, params)
};