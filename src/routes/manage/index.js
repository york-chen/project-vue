const LogList = () => import(/* webpackChunkName: "manage" */'@/pages/manage/logs');
const PwdList = () => import(/* webpackChunkName: "manage" */'@/pages/manage/pwd');

export default [
    {
        path: '',
        redirect: 'logs'
    },
    {
        path: 'logs',
        name: 'manageLogs',
        component: LogList,
        meta: {
            requireAuth: true
        }
    },
    {
        path: 'pwd',
        name: 'managePwd',
        component: PwdList,
        meta: {
            requireAuth: true
        }
    }
]