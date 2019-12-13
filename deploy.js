const webapi = require("./nodejs-sdk/packages/api/web3j").Web3jService;
const Configuration = require("./nodejs-sdk/packages/api/common/configuration").Configuration;

Configuration.setConfig("./nodejs-sdk/packages/cli/conf/config.json");
const utils = require("./nodejs-sdk/packages/api/common/web3lib/utils");
const { CRUDService, Table, Condition, Entry } = require('./nodejs-sdk/packages/api');


let table = new Table("t_assets", "account", "money,credit", "")

var crud = new CRUDService()

crud.createTable(table).then(status => {
    if (status === 0) {
        return { status: "success", code: status };
    } else {
        return { status: "fail", code: status };
    }
});
