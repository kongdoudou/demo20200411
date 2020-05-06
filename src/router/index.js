const Vue = require("vue");
const Router = require('vue-router');
const HelloWorld = () => import('@/components/HelloWorld');

Vue.use(Router);

export default () => {
  return new Router({
    mode:"history",
    routes:[
      {
        path:"/",
        component:HelloWorld,
        name:"HelloWorld"
      },
      {
        path:"/hello",
        component:HelloWorld,
        name:"hello"
      }
    ]
  })
}
