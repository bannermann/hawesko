import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

    {
        path: '',
        //path: process.env.NODE_ENV === 'production' ? __webpack_public_path__ : '/',
        name: 'widget',
        name: 'widget',
        meta: {
            auth: false
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router