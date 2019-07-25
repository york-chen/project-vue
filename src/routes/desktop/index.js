const virtualMachine = () => import(/* webpackChunkName: "desktop" */'@/pages/desktop/virtualMachine');
const fingerManage = () => import(/* webpackChunkName: "desktop" */'@/pages/desktop/fingerManage');

export default [
    {
        path: '',
        redirect: 'virtualMachine'
    },
    {
        path: 'virtualMachine',
        name: 'desktopMachine',
        component: virtualMachine,
        meta: {
            requireAuth: true
        }
    },
    {
        path: 'fingerManage',
        name: 'desktopFinger',
        component: fingerManage,
        meta: {
            requireAuth: true
        }
    }
]