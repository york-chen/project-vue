import axios from '@/_axios'

export const $axGetUserList = params => {
    return axios({
        method: 'post',
        url: '/user/list'
    }, params)
};
export const $axAddUser = params => {
    return axios({
        method: 'post',
        url: '/user/add'
    }, params)
};

export const $axEditUser = params => {
    return axios({
        method: 'post',
        url: '/user/edit'
    }, params)
};
export const $axDeleteUser = params => {
    return axios({
        method: 'post',
        url: '/user/del'
    }, params)
};
export const $axChangeUserRole = params => {
    return axios({
        method: 'post',
        url: '/user/change/role'
    }, params)
};
export const $axGetDepList = params => {
    return axios({
        method: 'post',
        url: '/dept/search'
    }, params)
};
export const $axAddDep = params => {
    return axios({
        method: 'post',
        url: '/dept/add'
    }, params)
};
export const $axEditDep = params => {
    return axios({
        method: 'post',
        url: '/dept/edit'
    }, params)
};
export const $axDeleteDep = params => {
    return axios({
        method: 'post',
        url: '/dept/del'
    }, params)
};
export const $axMoveOutDep = params => {
    return axios({
        method: 'post',
        url: '/user/rmdept'
    }, params)
};
export const $axMoveToDep = params => {
    return axios({
        method: 'post',
        url: '/user/add2dept'
    }, params)
};