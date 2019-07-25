import Vue from 'vue'
import Vuex from 'vuex'
import home from '@/store/modules/home'
import resource from '@/store/modules/resource'
import virtualMachine from '@/store/modules/virtualMachine'
import organization from '@/store/modules/organization/index'
import desktop from '@/store/modules/desktop/index'
import manage from '@/store/modules/manage'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        home,
        resource,
        virtualMachine,
        organization,
        manage,
        desktop
    }
})