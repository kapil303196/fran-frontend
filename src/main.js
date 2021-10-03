import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.scss'

Vue.config.productionTip = false
Vue.use(require('vue-moment'));
Vue.prototype.moment = moment

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
