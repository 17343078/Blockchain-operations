var http = require("http")
const webapi = require("./nodejs-sdk/packages/api/web3j").Web3jService;
const Configuration = require("./nodejs-sdk/packages/api/common/configuration").Configuration;
Configuration.setConfig("./nodejs-sdk/packages/cli/conf/config.json");
const utils = require("./nodejs-sdk/packages/api/common/web3lib/utils");
const { CRUDService, Table, Condition, Entry } = require('./nodejs-sdk/packages/api');

var querystring = require('querystring'); 

var crudService = new CRUDService()
var ret = new Condition()
ret.ne("account","0")

http.createServer(function(req,res){
    res.writeHead(200,
        {"Content-Type":'text/plain','charset':'utf-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
    console.log("req_url:" + req.url)
    var url_info = require('url').parse(req.url,true)

    var api = new webapi(); 

    if (url_info.pathname == '/insert' && req.method == "POST"){
        var str = "";//接收数据用
        req.on('data',function(data){
            str += data;
        });
	res.end()
        req.on('end', () => {
            
            crudService.desc("t_assets").then(tableInfo => {
		var obj = JSON.parse(str)
                let table = new Table(tableInfo.tableName, obj.account, tableInfo.valueFields, tableInfo.optional);
		
                let fieldNames = tableInfo.valueFields.split(',');
                let fieldValues = obj["values"].split(',');

                if (fieldNames.length !== fieldValues.length) {
                    throw new Error(`unmatch number of fields, expected ${fieldNames.length} but got ${fieldValues.length}`);
                }

                let entry = new Entry();
                for (let index in fieldNames) {
                    entry.put(fieldNames[index], fieldValues[index]);
                }

                crudService.insert(table, entry).then(value=>{
			console.log(value)
			if(value == "1"){
				console.log("insert successfuuly")
				res.end()	
			}	
		});
            });
        })
    }

    if (url_info.pathname == '/select' && req.method == "POST"){
	var ans
	res.end()
        var str = "";//接收数据用
        req.on('data',function(data){
            str += data;
        });
        req.on('end', () => {
            var obj = JSON.parse(str)
            let tableName = "t_assets";
            let key = obj["account"];
            let condition = obj["condition"];

            crudService.desc(tableName).then(tableInfo => {
		
                let table = new Table("t_assets", obj.account, tableInfo.valueFields, tableInfo.optional);
                crudService.select(table, ret).then(value=>{
			console.log(value)
		})
		
            });
        });
    }

    if (url_info.pathname == '/update' && req.method == "POST"){
        var str = "";//接收数据用
        req.on('data',function(data){
            str += data;
        });
        req.on('end', () => {
            
            crudService.desc("t_assets").then(tableInfo => {
		var obj = JSON.parse(str)
		var new_ret = new Condition()
		new_ret.eq("account", obj.account)
                let table = new Table(tableInfo.tableName, obj.account, tableInfo.valueFields, tableInfo.optional);
		
                let fieldNames = tableInfo.valueFields.split(',');
                let fieldValues = obj["values"].split(',');

                if (fieldNames.length !== fieldValues.length) {
                    throw new Error(`unmatch number of fields, expected ${fieldNames.length} but got ${fieldValues.length}`);
                }

                let entry = new Entry();
                for (let index in fieldNames) {
                    entry.put(fieldNames[index], fieldValues[index]);
                }

                crudService.update(table, entry, ret).then(value=>{
			console.log(value)
			if(value != "0"){
				console.log("update successfuuly")	
			}	
		});
            });
        })
    }

    if (url_info.pathname == '/transfer' && req.method == "POST"){
        var str = "";//接收数据用
        req.on('data',function(data){
            str += data;
        });
        req.on('end', () => {
            
            crudService.desc("t_assets").then(tableInfo => {
		var obj = JSON.parse(str)
		var new_ret_from = new Condition()
		new_ret_from.eq("account", obj.from_account)
		var new_ret_to = new Condition()
		new_ret_to.eq("account", obj.to_account)
                let table = new Table(tableInfo.tableName, obj.from_account, tableInfo.valueFields, tableInfo.optional);
		
                let fieldNames = tableInfo.valueFields.split(',');
                let fieldValues = obj["values"].split(',');

                if (fieldNames.length !== fieldValues.length) {
                    throw new Error(`unmatch number of fields, expected ${fieldNames.length} but got ${fieldValues.length}`);
                }

                let entry = new Entry();
                for (let index in fieldNames) {
                    entry.put(fieldNames[index], fieldValues[index]);
                }

                crudService.update(table, entry, ret).then(value=>{
			console.log(value)
			if(value != "0"){
				console.log("update successfuuly")	
			}	
		});
            });
        })
    }

   
}).listen(3000);

