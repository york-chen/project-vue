const userList = () => import(/* webpackChunkName: "organization" */'@/pages/organization/userList');
const depList = () => import(/* webpackChunkName: "organization" */'@/pages/organization/depList');
const depManage = () => import(/* webpackChunkName: "organization" */'@/pages/organization/depManage');
const BlankView = () => import('@/layout/blankView');

export default [
    {
        path: '',
        redirect: 'users'
    },
    {
        path: 'users',
        name: 'organizationUsers',
        component: userList,
        meta: {
            requireAuth: true
        }
    },
    {
        path: 'deps',
        component: BlankView,
        children: [
            {
                path: '',
                name: 'organizationDepsIndex',
                component: depList,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: ':depId',
                name: 'organizationDepsManage',
                component: depManage,
                meta: {
                    requireAuth: true
                }
            }
        ]
    }
]