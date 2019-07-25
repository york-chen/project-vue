const Login = () => import(/* webpackChunkName: "home" */'@/pages/home/login');
const FindPwd = () => import(/* webpackChunkName: "home" */'@/pages/home/findPwd');
const Finger = () => import(/* webpackChunkName: "home" */'@/pages/home/finger');

export default [
    {
        path: '',
        redirect: 'index'
    },
    {
        path: 'index',
        name: 'loginIndex',
        component: Login
    },
    {
        path: 'findPwd',
        name: 'loginFindPwd',
        component: FindPwd
    },
    {
        path: 'finger',
        name: 'loginFinger',
        component: Finger
    }
]