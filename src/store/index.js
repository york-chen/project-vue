import Vue from 'vue'
import Vuex from 'vuex'
import home from '@/store/modules/home'
import resource from '@/store/modules/resource'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        home,
        resource
    }
})