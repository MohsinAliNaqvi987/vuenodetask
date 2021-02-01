import Vue from 'vue'
import App from './components/App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios';
import GoogleSignInButton from 'vue-google-signin-button-directive'

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

new Vue({
  el: '#app',
  GoogleSignInButton,
  render: h => h(App)
})
