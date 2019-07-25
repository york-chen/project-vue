import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import HomeRoutes from '@/routes/home';
import ResourceRoutes from '@/routes/resource';
import VirtualMachineRoutes from '@/routes/virtualMachine';
import organizationRoutes from '@/routes/organization';
import manageRoutes from '@/routes/manage';
import desktopRoutes from '@/routes/desktop';

const HomeLayout = () => import(/* webpackChunkName: "homeLayout" */'@/layout/homeView');
const AuthenedView = () => import(/* webpackChunkName: "authenedView" */'@/layout/authenedView');
const BlankView = () => import(/* webpackChunkName: "blankView" */'@/layout/blankView');
const organizationView = () => import(/* webpackChunkName: "organizationView" */'@/layout/organizationView');
const DesktopLayout = () => import(/* webpackChunkName: "desktop" */'@/layout/desktopLayout');
const NotFind = () => import(/* webpackChunkName: "notFind" */'@/pages/404');

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
            beforeEnter: (to, from, next) => {
                if (store.state.resource.categoryMenu.length) {
                    next();
                } else {
                    store.dispatch('resource/sendQueryCategoryList', {
                        pageIndex: 1,
                        pageSize: 10000
                    }).then(() => {
                        next();
                    })
                }
            },
            children: [
                {
                    path: '',
                    redirect: 'resource'
                },
                {
                    path: 'resource',
                    component: BlankView,
                    children: ResourceRoutes
                },
                {
                    path: 'virtualMachine',
                    component: BlankView,
                    children: VirtualMachineRoutes
                },
                {
                    path: 'organization',
                    component: organizationView,
                    children: organizationRoutes
                },
                {
                    path: 'manage',
                    component: BlankView,
                    children: manageRoutes
                }
            ]
        },
        {
            path: '/desktop',
            component: DesktopLayout,
            children: desktopRoutes
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