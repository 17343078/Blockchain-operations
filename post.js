 var requestData1={
     account : "msb",
     condition : ""
 };

var requestData2={
    account : "msb",
    values : "200,100"
};

var requestData3={
    account : "SYSU",
    values : "200,100"
};

var http = require('http');  
  
var qs = require('querystring');  
  
var content = JSON.stringify(requestData2);  
  
var options = {  
    hostname: '127.0.0.1',  
    port: 3000,  
    path: '/select',  
    method: 'POST',  
    headers: {  
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'  
    }  
};  
  
var req = http.request(options, function (res) {  
    //console.log('STATUS: ' + res.statusCode);  
    //console.log('HEADERS: ' + JSON.stringify(res.headers));  
    res.setEncoding('utf8');  
    res.on('data', function (chunk) {  
        //console.log('BODY: ' + chunk);  
    });  
});  
  
req.on('error', function (e) {  
    //console.log('problem with request: ' + e.message);  
});  
  
// 将数据写入请求体
req.write(content);//注意这个地方  
  
req.end();
 
 
