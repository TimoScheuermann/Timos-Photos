import LottieAnimation from 'lottie-vuejs';
import * as TCComponents from 'tccomponents_vue';
import 'tccomponents_vue/lib/tccomponents_vue.css';
import Vue from 'vue';
import { Route } from 'vue-router';
import App from './App.vue';
import './registerServiceWorker';
import router, { prefix } from './router';
import store from './store';
import { getUserFromJWT, verfiyUser } from './utils/auth';

Vue.use(LottieAnimation);

Vue.config.productionTip = false;

for (const component in TCComponents) {
  Vue.component(component, TCComponents[component]);
}

router.beforeEach(async (to: Route, from: Route, next) => {
  if (!store.getters.valid && (await verfiyUser())) {
    store.commit('signIn', getUserFromJWT());
  }
  try {
    if (to.name !== 'login' && !store.getters.valid) {
      next({ name: 'login' });
    } else {
      next();
    }
  } catch (_) {
    //
  }
});

router.afterEach((to: Route) => {
  document.getElementsByTagName('title')[0].innerHTML = prefix + to.meta.title;
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
