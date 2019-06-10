import Vue from 'vue'
import App from './App'
import router from './router'


export default new Vue({
    router,
    el: '#app',
    render: h => h(App)
})
