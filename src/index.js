import Vue from 'vue'
import App from './components/App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios';
import Router  from 'vue-router';
import Dashboard from './components/Dashboard';
import Signup from "./components/Signup";
import ResetPassword from "./components/ResetPassword";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(Router);

const router = new Router({
  routes: [
    { path: '/', component: Signup},
    { path: '/dashboard/', name:'dashboard', component: Dashboard},
    { path: '/resetpassword/', component: ResetPassword},
  ],
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
