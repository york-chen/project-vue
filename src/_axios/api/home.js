import axios from '@/_axios'

export const $axLogin = params => {
    return axios({
        method: 'post',
        url: '/login'
    }, params)
};
export const $axLoginout = params => {
    return axios({
        method: 'post',
        url: '/logout'
    }, params)
};