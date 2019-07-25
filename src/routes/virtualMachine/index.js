const List = () => import(/* webpackChunkName: "virtualMachine" */'@/pages/virtualMachine');

export default [
    {
        path: '',
        redirect: 'list'
    },
    {
        path: 'list',
        name: 'virtualMachineList',
        component: List,
        meta: {
            requireAuth: true
        }
    }
]