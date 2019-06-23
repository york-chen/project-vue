import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeLayout from '@/layout/homeView'
import AuthenedView from '@/layout/authenedView'
import BlankView from '@/layout/blankView'
import HomeRoutes from '@/routes/home'
import ResourceRoutes from '@/routes/resource'
import NotFind from '@/pages/404'

Vue.use(VueRouter);
export default new VueRouter({
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            if (!to.meta.savePos) {
                return {x: 0, y: 0}
            }
        }
    },
    routes: [
        {
            path: '/',
            component: AuthenedView,
            children: [
                {
                    path: '',
                    redirect: 'resource'
                },
                {
                    path: 'resource',
                    component: BlankView,
                    children: ResourceRoutes
                }
            ]
        },
        {
            path: '/login',
            component: HomeLayout,
            children: HomeRoutes
        },
        {
            path: '*',
            name: 'notFind',
            component: NotFind
        }
    ]
});