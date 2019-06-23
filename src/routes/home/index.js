import Login from '@/pages/home/login'
import FindPwd from '@/pages/home/findPwd'

export  default [
    {
        path:'',
        redirect: 'index'
    },
    {
        path:'index',
        name:'loginIndex',
        component:Login
    },
    {
        path:'findPwd',
        name:'loginFindPwd',
        component:FindPwd
    }
]