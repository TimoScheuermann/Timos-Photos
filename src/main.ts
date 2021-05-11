import LottieAnimation from 'lottie-vuejs';
import * as TCComponents from 'tccomponents_vue';
import 'tccomponents_vue/lib/tccomponents_vue.css';
import Vue from 'vue';
import { Route } from 'vue-router';
import App from './App.vue';
import './registerServiceWorker';
import router, { prefix } from './router';
import store from './store';

Vue.use(LottieAnimation);

Vue.config.productionTip = false;

for (const component in TCComponents) {
  Vue.component(component, TCComponents[component]);
}

router.afterEach((to: Route) => {
  document.getElementsByTagName('title')[0].innerHTML = prefix + to.meta.title;
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
