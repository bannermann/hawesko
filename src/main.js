import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store/store.js'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'animate.css';
import VueMobileDetection from 'vue-mobile-detection';
import VueCarousel from 'vue-carousel';


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueMobileDetection);
Vue.use(VueCarousel);

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app')