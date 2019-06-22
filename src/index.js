import Vue from 'vue'
import App from './app.vue'
import  router from '@/routes'
import 'fullpage.js/vendors/scrolloverflow'
import VueFullPage from 'vue-fullpage.js'

Vue.use(VueFullPage);
new Vue({
    router,
    el: '#app',
    components: {App},
    template: '<App/>'
});