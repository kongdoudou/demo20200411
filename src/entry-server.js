import createApp from "./app.js";


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

