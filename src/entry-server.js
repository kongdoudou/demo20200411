import Vue from 'vue'
import createApp from "./app.js";

// 1. 引入 serverPlugin
import { createServerPlugin } from 'vue-ssr-prefetcher'

let serverPlugin = createServerPlugin();
Vue.use(serverPlugin);

export default async context => {
  const {app, router} = createApp();
  router.push(context.url);
  await routerReady(router);
  return app
}

function routerReady (router) {
  return new Promise(resolve => {
    router.onReady(resolve)
  })
}

