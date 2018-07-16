let http = require('http');
let fs = require('fs');
let path = require('path');

// mime.getType('txt');  mime 导入的第三方包 .getType 包里面的功能
let mime = require('mime');

let rootPath = path.join(__dirname,'./www');

// 开启服务
http.createServer((request,response)=>{
    let reqUrl = request.url;
    let pathFile = path.join(rootPath,reqUrl);
    console.log(reqUrl)
    // 判断文件是否存在
    if(fs.existsSync(pathFile)){
        // 存在->
        // 是否是文件夹(读取文件夹的函数)
        if(pathFile[pathFile.length-1]=='\\'){
            console.log(pathFile,'是文件夹');
        }else{
            console.log(pathFile,'是文件');
            pathFile = reqUrl === '/' ? pathFile + 'index.html' : pathFile;
            // 读取文件 返回读取的文件
            fs.readFile(pathFile,(err,data)=>{
                console.log(pathFile,'读取文件完毕 返回');
                // 自行判断 后缀名(.js .css .html .jpg .png .gif .ico)
                // mime类型
                // if else if else
                // 查找是否有人实现了 类似的功能
                response.writeHead(200,{
                    'content-type':mime.getType(pathFile)
                })

                if(err){
                    // console.log(err);
                    if (err.errno == '-2') {
                        console.log('目录www下没有index.html文件');
                    }
                }else{
                    response.end(data);
                }
            })
        }
        // 是文件夹(列表)
        // 不是文件夹(读取文件 根据类型 设置不同的 content-type 返回读取的内容)
    }else{
        // 不存在->
        // 404 提示用户 not find
        response.writeHead(404,{
            'content-type':"text/html;charset=utf-8"
        })
        response.end(`
            <h1>Not Found </h1>
            <p>哥们,你找的页面木有哦, 你再看看吧 O(∩_∩)O哈哈~</p>
        `)
    }
}).listen(7777,'127.0.0.1',()=>{
    console.log('listen to http://127.0.0.1:7777 success');
})