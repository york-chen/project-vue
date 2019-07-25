import store from '@/store'

const CategoryManage = () => import(/* webpackChunkName: "resource" */'@/pages/resource/categoryManage');
const AddCategory = () => import(/* webpackChunkName: "resource" */'@/pages/resource/addCategory');
const DataList = () => import(/* webpackChunkName: "resource" */'@/pages/resource/categoryDataList');


export default [
    {
        path: '',
        beforeEnter: (to, from, next) => {
            let categoryMenu = store.state.resource.categoryMenu, path = 'categoryManage';
            if (categoryMenu.length) {
                let obj = categoryMenu.find(item => {
                    return item.isDefault
                });
                if (obj) {
                    path = `list/${obj.id}`;
                }
            }
            next(`/resource/${path}`);
        },
    },
    {
        path: 'addCategory',
        name: 'resourceNewCategory',
        component: AddCategory,
        meta: {
            requireAuth: true
        }
    },
    {
        path: 'categoryManage',
        name: 'resourceCategoryManage',
        component: CategoryManage,
        meta: {
            requireAuth: true
        }
    },
    {
        path: 'list/:id',
        name: 'resourceList',
        component: DataList,
        meta: {
            requireAuth: true
        }
    }
]