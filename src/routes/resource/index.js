import CategoryManage from '@/pages/resource/categoryManage'
import AddCategory from '@/pages/resource/addCategory'
import DataList from '@/pages/resource/categoryDataList'

export default [
    {
        path: '',
        redirect: 'categoryManage'
    },
    {
        path: 'addCategory',
        name: 'resourceNewCategory',
        component: AddCategory
    },
    {
        path: 'categoryManage',
        name: 'resourceCategoryManage',
        component: CategoryManage
    },
    {
        path: 'list/:type',
        name: 'resourceList',
        component: DataList
    }
]