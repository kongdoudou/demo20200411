const Vue = require("vue");
import createRouter from "./router";
import HelloWorld from "./components/HelloWorld.vue";


export default (context) => {
  const router = createRouter();
  const app = new Vue({
    router,
    components: { HelloWorld },
    template: '<HelloWorld/>'
  });
  return {
    app,
    router
  }
}
