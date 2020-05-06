const devServer = require("./build/dev-server.js");
const express = require("express");
const app = express();
const vueRender = require("vue-server-renderer");
const fs = require("fs");
const url=require("url");


app.get('*',(request,response) => {
  response.status(200);
  response.setHeader("Content-Type","text/html;charset-utf-8;");

  devServer((serverBundle,clientBundle,template) => {
        let query = url.parse(decodeURI(request.url),true).query;
        // if(query.build) {
        //   template = null;
        // }

        let render = vueRender.createBundleRenderer(serverBundle,{
            template,
            clientManifest:clientBundle.data,
            //  每次创建一个独立的上下文
            renInNewContext:false
        });
        render.renderToString({
            url:request.url,
            state: 'state'
        }).then((html) => {
            if(query.build) {
              fs.writeFile('./dist/index.template.html', html,  'utf8',function(err, data) {
                if(err) {
                  res.end('写入错误');
                }
              });
            }
          response.end(html);
        }).catch(error => {
          response.end(JSON.stringify(error));
        });
    });
});

app.listen(5002,() => {
    console.log("服务已开启:5002")
});
