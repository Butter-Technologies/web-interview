import Vue from 'vue';

// babel-polyfill
import 'babel-polyfill';
// endbabel-polyfill

// moment-timezone
import moment from 'moment-timezone';
Vue.prototype.$moment = moment;
// endmoment-timezone

// element-ui
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import enLocale from 'element-ui/lib/locale/lang/en';
const Message = ElementUI.messages;
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题

import App from './App.vue';
import filters from './filters';
import router from './router';
// 引入指令
import '@/directive/directives';
// 引入拦截器
import '@/router/interceptor.router';

// http
import api from './request/api';
import request from './request/request';
import SelectEvent from './event/selectEvent';

import './request/mock';

Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.prototype.$request = request;
Vue.prototype.$message = Message;

// 加入所有的filter
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]); //插入过滤器名和对应方法
});

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages: {
    en: enLocale
  } // set locale messages
});
Vue.use(ElementUI, {
  size: 'small',
  i18n: (key, value) => i18n.t(key, value)
});

document.body.addEventListener('click',  (el) => {
  SelectEvent.$emit('close', el);
}, false)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
