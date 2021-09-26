import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'


import 'buefy/dist/buefy.css'
import router from './router'

Vue.use(Buefy)
Vue.config.productionTip = false

// axios.create({
//   baseURL: process.env.API_URL,
//   timeout: 1000
// });

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
