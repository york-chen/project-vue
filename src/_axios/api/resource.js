import axios from '@/_axios'

export const $axGetCategory = params => {
    return axios({
        method: 'post',
        url: '/user/ps/category/search'
    }, params)
};

export const $axCreateCategory = params => {
    return axios({
        method: 'post',
        url: '/user/ps/category/create',
        headers: {
            'Content-Type': 'application/json'
        }
    }, params)
};
export const $axUpdateCategory = params => {
    return axios({
        method: 'post',
        url: '/user/ps/category/edit'
    }, params)
};
export const $axDeleteCategory = params => {
    return axios({
        method: 'post',
        url: '/user/ps/category/del'
    }, params)
};
export const $axGetCategoryAccountList = params => {
    return axios({
        method: 'post',
        url: '/user/ps/category/account/list'
    }, params)
};
export const $axCreateCategoryAccount = params => {
    return axios({
        method: 'post',
        url: '/user/ps/category/account/add',
        headers: {
            'Content-Type': 'application/json'
        }
    }, params)
};
export const $axEditCategoryAccount = params => {
    return axios({
        method: 'post',
        url: '/user/ps/category/account/edit',
        headers: {
            'Content-Type': 'application/json'
        }
    }, params)
};
export const $axDeleteCategoryAccount = params => {
    return axios({
        method: 'post',
        url: '/user/ps/category/account/del'
    }, params)
};