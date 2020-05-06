import Vue from 'vue';
import createApp from "./app.js";

const { app, router } = createApp();

router.onReady(() => {

  // 避免重复获取数据
  app.$mount('#app')
});
