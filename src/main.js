// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import createRouter from './router'

const router = createRouter();


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { HelloWorld },
  template: '<HelloWorld/>'
});
