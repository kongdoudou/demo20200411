const Vue = require("vue");
import createRouter from "./router";
import createStore from './store';
import { sync } from 'vuex-router-sync'
import HelloWorld from "./components/HelloWorld.vue";


export default (context) => {
  const router = createRouter();
  const store = createStore();
  sync(store, router);
  const app = new Vue({
    router,
    store,
    components: { HelloWorld },
    template: '<HelloWorld/>'
  });
  return {
    app,
    router,
    store
  }
}
