import express from 'express';
import chalk from 'chalk';

import config from './config';
import router from './routers';
import './mongoose';
const app = express();

//允许所有js来进行访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080");//或者 res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3333"); 就只允许 127.0.0.1:3333来访问
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With, token");
    res.header("Access-Control-Allow-Methods", "POST,GET");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200);/*让options请求快速返回*/
    else next();
});

app.get('/wxml',function(req,res){
    var fileName="./index.html";
    res.sendfile(`${__dirname}/index.wxml`)
    // fs.readFile(fileName,function(err,data){
    //     if(err)
    //         console.log("对不起，您所访问的路径出错");
    //     else{
    //         res.write(data);
    //     }
    // })
})

router(app);

// 注册异常处理中间件
app.use((err, req, res, next)=>{
    res.fail(err.toString())
});

app.listen(config.port, () => {
	console.log(
		chalk.green(`成功监听端口：${config.port}`)
	)
});