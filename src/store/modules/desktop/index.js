import virtualMachine from '@/store/modules/desktop/virtualMachine'
import fingerManage from '@/store/modules/desktop/fingerManage'

export default {
    namespaced: true,
    modules: {
        virtualMachine,
        fingerManage
    }
}