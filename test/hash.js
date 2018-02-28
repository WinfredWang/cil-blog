var crypto = require("crypto");

let md5 = crypto.createHash('md5');
md5.update("124");
console.log(md5.digest('hex'));