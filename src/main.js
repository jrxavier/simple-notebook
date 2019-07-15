import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import moment from 'moment'

Vue.config.productionTip = false
Vue.filter("date", time => moment(time).format("DD/MM/YY, HH:mm"));

new Vue({
  render: h => h(App),
}).$mount('#app')