import axios from '@/_axios'

export const $axGetVirtualMachineList = params => {
    return axios({
        method: 'post',
        url: '/user/vs/list'
    }, params)
};
export const $axAddVirtualMachine = params => {
    return axios({
        method: 'post',
        url: '/user/vs/add'
    }, params)
};
export const $axGetMachinePwd = params => {
    return axios({
        method: 'post',
        url: '/user/vs/showpwd'
    }, params)
};
export const $axEditVirtualMachine = params => {
    return axios({
        method: 'post',
        url: '/user/vs/edit'
    }, params)
};
export const $axDeleteVirtualMachine = params => {
    return axios({
        method: 'post',
        url: '/user/vs/del'
    }, params)
};
export const $axGetUserRelateShare = params => {
    return axios({
        method: 'post',
        url: '/user/vs/share/search'
    }, params)
};
export const $axBatchCancelShareVM = params => {
    return axios({
        method: 'post',
        url: '/user/vs/share/cancel'
    }, params)
};
export const $axChangeSharePermition = params => {
    return axios({
        method: 'post',
        url: '/user/vs/share/edit'
    }, params)
};
export const $axSetAssignOwner = params => {
    return axios({
        method: 'post',
        url: '/user/vs/assign/owner'
    }, params)
};