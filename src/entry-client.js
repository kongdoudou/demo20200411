import Vue from 'vue';
import createApp from "./app.js";

// 1. 引入插件
import { clientPlugin } from 'vue-ssr-prefetcher'
// 2. 安装插件
Vue.use(clientPlugin);

const { app, router, store } = createApp();



router.onReady(() => {
  if(window.__INITIAL_STATE__) {
    // 3. 从 window.__INITIAL_STATE__ 中解构出 $$selfStore
    const { $$selfStore } = window.__INITIAL_STATE__
    // 4. 将数据添加到跟组件实例
    if ($$selfStore) app.$$selfStore = $$selfStore
  }
  clientPlugin.$$resolved = true;
  // 避免重复获取数据
  app.$mount('#app');
});
